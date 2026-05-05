import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { ENUM_BUSINESS_TYPE } from "@/shared/constants/enum/businessTypeEnum";

interface IEvidenceForm {
  id?: number;
  code?: string;
  name?: string;
  criterionId?: number;
  requirementId?: number;
  analysisId?: number;
  taskId?: number;
}

interface IEvidenceCreate {
  code: string;
  name: string;
  eaqTaskDetailId: number;
}

export default function EvidenceCreateOrUpdateButton({
  data,
  isLoading,
}: {
  data?: ITaskDetailEvidence;
  isLoading?: boolean;
}) {
  const isUpdate = !!data;

  const disc = useDisclosure(false, {
    onClose: () => {
      form.reset();
    },
  });
  const filterStore = useS_Shared_Filter();

  const form = useForm<IEvidenceForm>({
    initialValues: {
      id: data?.id || 0,
      code: data?.code || "",
      name: data?.name || "",
      criterionId: data?.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.id ?? undefined,
      requirementId: data?.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.id ?? undefined,
      analysisId: data?.eaqTaskDetail?.eaqAnalysis?.id ?? undefined,
      taskId: data?.eaqTaskDetail?.id ?? undefined,
    },
    validate: {
      criterionId: (value) => (value != null ? null : "Vui lòng chọn tiêu chí"),
      requirementId: (value) => (value != null ? null : "Vui lòng chọn yêu cầu"),
      analysisId: (value) => (value != null ? null : "Vui lòng chọn phân tích"),
      taskId: (value) => (value != null ? null : "Vui lòng chọn công việc"),
      code: (value) => (value ? null : "Vui lòng nhập mã minh chứng"),
      name: (value) => (value ? null : "Vui lòng nhập tên minh chứng"),
    },
  });

  const criteriaQuery = useCustomReactQuery({
    queryKey: ["EAQCriteria", filterStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    options: {
      enabled: !!filterStore.state.Phase?.id && disc[0],
    },
  });

  const requirementsQuery = useCustomReactQuery({
    queryKey: ["EAQRequirements", filterStore.state.Phase?.id, form.values.criterionId],
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
        eaqCriteriaId: form.values.criterionId ?? undefined,
      }),
    options: {
      enabled: !!filterStore.state.Phase?.id && form.values.criterionId != null && disc[0],
    },
  });

  const analysesQuery = useCustomReactQuery({
    queryKey: [
      "EAQAnalyses",
      filterStore.state.Phase?.id,
      form.values.criterionId,
      form.values.requirementId,
    ],
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
        eaqCriteriaId: form.values.criterionId ?? undefined,
        eaqRequirementId: form.values.requirementId ?? undefined,
      }),
    options: {
      enabled:
        !!filterStore.state.Phase?.id &&
        form.values.criterionId != null &&
        form.values.requirementId != null &&
        disc[0],
    },
  });

  const tasksQuery = useCustomReactQuery({
    queryKey: ["EAQTasks", filterStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id!,
        analysisType: 1,
      }),
    options: {
      enabled: !!filterStore.state.Phase?.id && disc[0],
    },
  });

  const generateCodeQuery = useCustomReactQuery({
    queryKey: ["GenerateEvidenceCode", disc[0]],
    axiosFn: () => codeFormulaService.GenerateCodeByCodeFormula({ operationType: ENUM_BUSINESS_TYPE["Danh sách minh chứng dự kiến"] }),
    options: {
      enabled: disc[0] && !isUpdate,
    }
  });

  const criterionOptions = useMemo(() => {
    if (!criteriaQuery.data || criteriaQuery.data.length === 0) return [];

    return criteriaQuery.data.map((criteria: ICriteria) => ({
      value: String(criteria.id),
      label: `${criteria.code} - ${criteria.name}`,
    }));
  }, [criteriaQuery.data]);

  const requirementOptions = useMemo(() => {
    if (!requirementsQuery.data || requirementsQuery.data.length === 0) return [];

    const selectedCriteria = requirementsQuery.data.find(
      (criteria: ICriteria) => criteria.id === form.values.criterionId
    );

    if (!selectedCriteria?.eaqRequirements) return [];

    return selectedCriteria.eaqRequirements.map((requirement: IRequirement) => ({
      value: String(requirement.id),
      label: `${requirement.code} - ${requirement.name}`,
    }));
  }, [requirementsQuery.data, form.values.criterionId]);

  const analysisOptions = useMemo(() => {
    if (!analysesQuery.data || analysesQuery.data.length === 0) return [];

    const selectedCriteria = analysesQuery.data.find(
      (criteria: ICriteria) => criteria.id === form.values.criterionId
    );

    if (!selectedCriteria?.eaqRequirements) return [];

    const selectedRequirement = selectedCriteria.eaqRequirements.find(
      (requirement: IRequirement) => requirement.id === form.values.requirementId
    );

    if (!selectedRequirement?.eaqAnalysises) return [];

    return selectedRequirement.eaqAnalysises.map((analysis: IAnalysis) => ({
      value: String(analysis.id),
      label: `${analysis.code} - ${analysis.name}`,
    }));
  }, [analysesQuery.data, form.values.criterionId, form.values.requirementId]);

  const taskOptions = useMemo(() => {
    if (!tasksQuery.data || tasksQuery.data.length === 0) return [];

    const filteredTasks = form.values.analysisId
      ? tasksQuery.data.filter((task: any) => task.eaqAnalysisId === form.values.analysisId)
      : [];

    return filteredTasks.map((task: any) => ({
      value: String(task.id),
      label: `${task.code} - ${task.name}`,
    }));
  }, [tasksQuery.data, form.values.analysisId]);

  useEffect(() => {
    if (data && isUpdate) {
      form.setValues({
        id: data.id || 0,
        code: data.code || "",
        name: data.name || "",
        criterionId: data.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.id,
        requirementId: data.eaqTaskDetail?.eaqAnalysis?.eaqRequirement?.id,
        analysisId: data.eaqTaskDetail?.eaqAnalysis?.id,
        taskId: data.eaqTaskDetail?.id,
      });
    }
  }, [data]); // Only triggers when the 'data' object reference changes

  useEffect(() => {
    if (!isUpdate && generateCodeQuery.data) {
      form.setFieldValue("code", generateCodeQuery.data);
    }
  }, [generateCodeQuery.data, isUpdate]);

  const handleSubmit = async () => {
    const payload: IEvidenceCreate = {
      code: form.values.code!,
      name: form.values.name!,
      eaqTaskDetailId: form.values.taskId ?? 0,
    };

    if (isUpdate) {
      return service_EAQAnalysis.updateTaskDetailEvidenceAnalysis({
        ...payload,
        id: data?.id || 0,
        concurrencyStamp: data?.concurrencyStamp,
      });
    } else {
      return service_EAQAnalysis.createTaskDetailEvidenceAnalysis(payload);
    }
  };

  return (
    <CustomButtonCreateUpdate
      form={form}
      modalProps={{
        size: "85%",
        title: !isUpdate ? "Thêm minh chứng dự kiến" : "Chi tiết minh chứng dự kiến",
      }}
      onSubmit={handleSubmit}
      isUpdate={isUpdate}
      disclosure={disc}
      buttonProps={{
        loading: isLoading,
      }}
      actionIconProps={{
        loading: isLoading,
      }}
    >
      {disc[0] && <CustomFlexColumn>
        <CustomSelect
          withAsterisk
          searchable
          label="Tiêu chí"
          data={criterionOptions}
          value={form.values.criterionId ? String(form.values.criterionId) : null}
          onChange={(val) => {
            const numericValue = val ? Number(val) : undefined;
            form.setFieldValue("criterionId", numericValue);
            form.setFieldValue("requirementId", undefined);
            form.setFieldValue("analysisId", undefined);
            form.setFieldValue("taskId", undefined);
          }}
          placeholder="Mã tiêu chí - Tên tiêu chí"
          error={form.errors.criterionId}
          disabled={criteriaQuery.isLoading || isUpdate}
        />

        <CustomSelect
          withAsterisk
          searchable
          label="Yêu cầu"
          data={requirementOptions}
          value={form.values.requirementId ? String(form.values.requirementId) : null}
          onChange={(val) => {
            const numericValue = val ? Number(val) : undefined;
            form.setFieldValue("requirementId", numericValue);
            form.setFieldValue("analysisId", undefined);
            form.setFieldValue("taskId", undefined);
          }}
          placeholder="Mã yêu cầu - Tên yêu cầu"
          error={form.errors.requirementId}
          disabled={form.values.criterionId == null || requirementsQuery.isLoading || isUpdate}
        />

        <CustomSelect
          withAsterisk
          searchable
          label="Phân tích"
          data={analysisOptions}
          value={form.values.analysisId ? String(form.values.analysisId) : null}
          onChange={(val) => {
            const numericValue = val ? Number(val) : undefined;
            form.setFieldValue("analysisId", numericValue);
            form.setFieldValue("taskId", undefined);
          }}
          placeholder="Mã phân tích - Nội dung phân tích"
          error={form.errors.analysisId}
          disabled={form.values.requirementId == null || analysesQuery.isLoading || isUpdate}
        />

        <CustomSelect
          withAsterisk
          searchable
          label="Công việc"
          data={taskOptions}
          value={form.values.taskId ? String(form.values.taskId) : null}
          onChange={(val) => {
            const numericValue = val ? Number(val) : undefined;
            form.setFieldValue("taskId", numericValue);
          }}
          placeholder="Mã công việc - Tên công việc"
          error={form.errors.taskId}
          disabled={form.values.analysisId == null || tasksQuery.isLoading || isUpdate}
        />

        <CustomTextInput
          withAsterisk
          label="Mã minh chứng dự kiến"
          {...form.getInputProps("code")}
          disabled={isUpdate}
          maxLength={1000}
        />
        <CustomTextArea withAsterisk label="Tên minh chứng dự kiến" {...form.getInputProps("name")} />
      </CustomFlexColumn>}
    </CustomButtonCreateUpdate>
  );
}
