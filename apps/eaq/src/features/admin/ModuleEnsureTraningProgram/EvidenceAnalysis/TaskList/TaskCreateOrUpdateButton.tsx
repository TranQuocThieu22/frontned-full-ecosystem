import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { ENUM_BUSINESS_TYPE } from "@/shared/constants/enum/businessTypeEnum";

interface ITaskForm {
  id?: number;
  code?: string;
  name?: string;
  criterionId?: number;
  requirementId?: number;
  analysisId?: number;
}

interface ITaskDetailCreate {
  code: string;
  name: string;
  eaqAnalysisId: number;
}

export default function TaskCreateOrUpdateButton({
  data,
  isLoading,
}: {
  data?: ITaskDetailAnalysis;
  isLoading?: boolean;
}) {
  const isUpdate = !!data;
  const disc = useDisclosure(false, {
    onClose: () => {
      form.reset();
    },
  });
  const filterStore = useS_Shared_Filter();

  const form = useForm<ITaskForm>({
    initialValues: {
      id: data?.id || 0,
      code: data?.code || "",
      name: data?.name || "",
      criterionId: data?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.id ?? undefined,
      requirementId: data?.eaqAnalysis?.eaqRequirement?.id ?? undefined,
      analysisId: data?.eaqAnalysisId ?? undefined,
    },
    validate: {
      criterionId: (value) => (value != null ? null : "Vui lòng chọn tiêu chí"),
      requirementId: (value) => (value != null ? null : "Vui lòng chọn yêu cầu"),
      analysisId: (value) => (value != null ? null : "Vui lòng chọn phân tích"),
      code: (value) => (value ? null : "Vui lòng nhập mã công việc"),
      name: (value) => (value ? null : "Vui lòng nhập tên công việc"),
    },
  });

  const criteriaQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    queryKey: ["EAQCriteria", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id && disc[0],
    },
  });

  const requirementsQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
        eaqCriteriaId: form.values.criterionId ?? undefined,
      }),
    queryKey: ["EAQRequirements", filterStore.state.Phase?.id, form.values.criterionId],
    options: {
      enabled: !!filterStore.state.Phase?.id && form.values.criterionId != null && disc[0],
    },
  });

  const analysesQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
        eaqCriteriaId: form.values.criterionId ?? undefined,
        eaqRequirementId: form.values.requirementId ?? undefined,
      }),
    queryKey: [
      "EAQAnalyses",
      filterStore.state.Phase?.id,
      form.values.criterionId,
      form.values.requirementId,
    ],
    options: {
      enabled:
        !!filterStore.state.Phase?.id &&
        form.values.criterionId != null &&
        form.values.requirementId != null &&
        disc[0],
    },
  });

  const generateCodeQuery = useCustomReactQuery({
    axiosFn: () => codeFormulaService.GenerateCodeByCodeFormula({ operationType: ENUM_BUSINESS_TYPE["Danh sách công việc cần thực hiện"] }),
    queryKey: ["GenerateTaskCode", disc[0]],
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

  useEffect(() => {
    if (!isUpdate && generateCodeQuery.data) {
      form.setFieldValue("code", generateCodeQuery.data);
    }
  }, [generateCodeQuery.data, isUpdate]);

  // Đảm bảo set lại form values sau khi criteriaQuery load xong trong update mode
  useEffect(() => {
    if (isUpdate && data) {
      form.setValues({
        id: data?.id || 0,
        code: data?.code || "",
        name: data?.name || "",
        criterionId: data?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.id ?? undefined,
        requirementId: data?.eaqAnalysis?.eaqRequirement?.id ?? undefined,
        analysisId: data?.eaqAnalysisId ?? undefined,
      });
    }
  }, [isUpdate, data, criteriaQuery.data, disc[0]]);

  // Đảm bảo set lại requirementId trong update mode sau khi requirementsQuery load xong
  useEffect(() => {
    if (isUpdate && data && requirementsQuery.data && form.values.requirementId == null) {
      const requirementId = data.eaqAnalysis?.eaqRequirement?.id ?? undefined;
      form.setFieldValue("requirementId", requirementId);
    }
  }, [isUpdate, data, requirementsQuery.data, form.values.requirementId]);

  // Đảm bảo set lại analysisId trong update mode sau khi analysesQuery load xong
  useEffect(() => {
    if (isUpdate && data && analysesQuery.data && form.values.analysisId == null) {
      const analysisId = data.eaqAnalysisId ?? undefined;
      form.setFieldValue("analysisId", analysisId);
    }
  }, [isUpdate, data, analysesQuery.data, form.values.analysisId]);

  const handleSubmit = async () => {
    const payload: ITaskDetailCreate = {
      code: form.values.code!,
      name: form.values.name!,
      eaqAnalysisId: form.values.analysisId ?? 0,
    };

    if (isUpdate) {
      return service_EAQAnalysis.updateTaskDetailAnalysis({
        ...payload,
        id: data?.id || 0,
        concurrencyStamp: data?.concurrencyStamp,
      });
    } else {
      return service_EAQAnalysis.createTaskDetailAnalysis(payload);
    }
  };

  return (
    <CustomButtonCreateUpdate
      form={form}
      modalProps={{
        size: "85%",
        title: !isUpdate ? "Thêm công việc cần thực hiện" : "Chi tiết công việc cần thực hiện",
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
          }}
          placeholder="Mã phân tích - Nội dung phân tích"
          error={form.errors.analysisId}
          disabled={form.values.requirementId == null || analysesQuery.isLoading || isUpdate}
        />

        <CustomTextInput
          withAsterisk
          label="Mã công việc"
          {...form.getInputProps("code")}
          disabled={isUpdate}
          maxLength={1000}
        />

        <CustomTextArea withAsterisk label="Tên công việc" {...form.getInputProps("name")} />
      </CustomFlexColumn>}
    </CustomButtonCreateUpdate>
  );
}
