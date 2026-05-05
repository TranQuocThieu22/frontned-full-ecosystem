"use client";

import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { ENUM_BUSINESS_TYPE } from "@/shared/constants/enum/businessTypeEnum";

interface Props {
  values?: ITaskDetailEvidence;
}

interface IEvidenceForm {
  id: number;
  code: string;
  name: string;
  eaqTaskDetailId: number;
  criterionId: number | null;
  limitationId: number | null;
  analysisId: number | null;
  taskId: number | null;
}

export function EstimatedEvidenceFormModal({ values }: Props) {
  const isUpdate = !!values;
  const disc = useDisclosure(false, {
    onClose: () => {
      form.reset();

    },
  });
  const filterStore = useS_Shared_Filter();

  const form = useForm<IEvidenceForm>({
    initialValues: {
      id: values?.id || 0,
      code: values?.code || "",
      name: values?.name || "",
      eaqTaskDetailId: values?.eaqTaskDetailId || 0,
      criterionId: values?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.id ?? null,
      limitationId: values?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.id ?? null,
      analysisId: values?.eaqTaskDetail?.eaqAnalysis?.id ?? null,
      taskId: values?.eaqTaskDetailId ?? null,
    },
    validate: {
      code: (value) => (value ? null : "Vui lòng nhập mã minh chứng dự kiến"),
      name: (value) => (value ? null : "Vui lòng nhập tên minh chứng dự kiến"),
      criterionId: (value) => (value != null ? null : "Vui lòng chọn tiêu chí"),
      limitationId: (value) => (value != null ? null : "Vui lòng chọn hạn chế"),
      analysisId: (value) => (value != null ? null : "Vui lòng chọn phân tích"),
      taskId: (value) => (value != null ? null : "Vui lòng chọn công việc"),
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

  const limitationsQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
        eaqCriteriaId: Number(form.values.criterionId) || undefined,
      }),
    queryKey: ["EAQLimitations", filterStore.state.Phase?.id, form.values.criterionId],
    options: {
      enabled: !!filterStore.state.Phase?.id && !!form.values.criterionId && disc[0],
    },
  });

  const analysesQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
        eaqCriteriaId: form.values.criterionId ?? undefined,
        eaqLimitationId: form.values.limitationId ?? undefined,
      }),
    queryKey: [
      "EAQAnalyses",
      filterStore.state.Phase?.id,
      form.values.criterionId,
      form.values.limitationId,
    ],
    options: {
      enabled:
        !!filterStore.state.Phase?.id && form.values.criterionId != null && form.values.limitationId != null && disc[0],
    },
  });

  const taskDetailsQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
        eaqCriteriaId: form.values.criterionId ?? undefined,
        eaqLimitationId: form.values.limitationId ?? undefined,
        eaqAnalysisId: form.values.analysisId ?? undefined,
      }),
    queryKey: [
      "EAQTaskDetails",
      filterStore.state.Phase?.id,
      form.values.criterionId,
      form.values.limitationId,
      form.values.analysisId,
    ],
    options: {
      enabled:
        !!filterStore.state.Phase?.id &&
        form.values.criterionId != null &&
        form.values.limitationId != null &&
        form.values.analysisId != null,
    },
  });

  const generateCodeQuery = useCustomReactQuery({
    axiosFn: () => codeFormulaService.GenerateCodeByCodeFormula({ operationType: ENUM_BUSINESS_TYPE["Danh sách minh chứng dự kiến"] }),
    queryKey: ["GenerateLimitationEvidenceCode", disc[0]],
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

  const limitationOptions = useMemo(() => {
    if (!limitationsQuery.data || limitationsQuery.data.length === 0) return [];

    const selectedCriteria = limitationsQuery.data.find(
      (criteria: ICriteria) => criteria.id === form.values.criterionId
    );

    if (!selectedCriteria?.eaqLimitations) return [];

    return selectedCriteria.eaqLimitations.map((limitation: ILimitation) => ({
      value: String(limitation.id),
      label: `${limitation.code} - ${limitation.name}`,
    }));
  }, [limitationsQuery.data, form.values.criterionId]);

  const analysisOptions = useMemo(() => {
    if (!analysesQuery.data || analysesQuery.data.length === 0) return [];

    const selectedCriteria = analysesQuery.data.find(
      (criteria: ICriteria) => criteria.id === form.values.criterionId
    );

    if (!selectedCriteria?.eaqLimitations) return [];

    const selectedLimitation = selectedCriteria.eaqLimitations.find(
      (limitation: ILimitation) => limitation.id === form.values.limitationId
    );

    if (!selectedLimitation?.eaqAnalysises) return [];

    return selectedLimitation.eaqAnalysises.map((analysis: IAnalysis) => ({
      value: String(analysis.id),
      label: `${analysis.code} - ${analysis.name}`,
    }));
  }, [analysesQuery.data, form.values.criterionId, form.values.limitationId]);

  const taskOptions = useMemo(() => {
    if (!taskDetailsQuery.data || taskDetailsQuery.data.length === 0) return [];

    const selectedCriteria = taskDetailsQuery.data.find(
      (criteria: ICriteria) => criteria.id === form.values.criterionId
    );

    if (!selectedCriteria?.eaqLimitations) return [];

    const selectedLimitation = selectedCriteria.eaqLimitations.find(
      (limitation: ILimitation) => limitation.id === form.values.limitationId
    );

    if (!selectedLimitation?.eaqAnalysises) return [];

    const selectedAnalysis = selectedLimitation.eaqAnalysises.find(
      (analysis: IAnalysis) => analysis.id === form.values.analysisId
    );

    if (!selectedAnalysis?.eaqTaskDetails) return [];

    return selectedAnalysis.eaqTaskDetails.map((taskDetail: any) => ({
      value: String(taskDetail.id),
      label: `${taskDetail.code} - ${taskDetail.name}`,
    }));
  }, [
    taskDetailsQuery.data,
    form.values.criterionId,
    form.values.limitationId,
    form.values.analysisId,
  ]);

  useEffect(() => {
    if (values && isUpdate) {
      form.setValues({
        id: values?.id || 0,
        code: values?.code || "",
        name: values?.name || "",
        eaqTaskDetailId: values?.eaqTaskDetailId || 0,
        criterionId: values?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.id ?? null,
        limitationId: values?.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.id ?? null,
        analysisId: values?.eaqTaskDetail?.eaqAnalysis?.id ?? null,
        taskId: values?.eaqTaskDetailId ?? null,
      });
    }
  }, [values]);

  useEffect(() => {
    if (!isUpdate && generateCodeQuery.data) {
      form.setFieldValue("code", generateCodeQuery.data);
    }
  }, [generateCodeQuery.data, isUpdate]);

  const handleSubmit = async () => {
    const payload = {
      code: form.values.code || "",
      name: form.values.name || "",
      eaqTaskDetailId: form.values.taskId || 0,
    };

    if (isUpdate) {
      return service_EAQAnalysis.updateTaskDetailEvidenceAnalysis({
        ...payload,
        id: values?.id || 0,
      });
    } else {
      return service_EAQAnalysis.createTaskDetailEvidenceAnalysis(payload);
    }
  };

  return (
    <CustomButtonCreateUpdate
      form={form}
      modalProps={{
        size: "60%",
        title: !isUpdate ? "Thêm minh chứng dự kiến" : "Chi tiết minh chứng dự kiến",
      }}
      onSubmit={handleSubmit}
      isUpdate={isUpdate}
      disclosure={disc}
    >
      {disc[0] && <Grid>
        <Grid.Col span={12}>
          <CustomSelect
            withAsterisk
            searchable
            label="Tiêu chí"
            placeholder="Mã tiêu chí - Tên tiêu chí"
            data={criterionOptions}
            value={form.values.criterionId !== null ? String(form.values.criterionId) : null}
            onChange={(val) => {
              const numericValue = val ? Number(val) : null;
              form.setFieldValue("criterionId", numericValue);
              form.setFieldValue("limitationId", null);
              form.setFieldValue("analysisId", null);
              form.setFieldValue("taskId", null);
            }}
            error={form.errors.criterionId}
            disabled={criteriaQuery.isLoading || isUpdate}
          />
          <CustomSelect
            withAsterisk
            searchable
            pt={10}
            label="Hạn chế"
            placeholder="Mã hạn chế - Tên hạn chế"
            data={limitationOptions}
            value={form.values.limitationId !== null ? String(form.values.limitationId) : null}
            onChange={(val) => {
              const numericValue = val ? Number(val) : null;
              form.setFieldValue("limitationId", numericValue);
              form.setFieldValue("analysisId", null);
              form.setFieldValue("taskId", null);
            }}
            error={form.errors.limitationId}
            disabled={form.values.criterionId == null || limitationsQuery.isLoading || isUpdate}
          />
          <CustomSelect
            withAsterisk
            searchable
            pt={10}
            label="Phân tích"
            placeholder="Mã phân tích - Nội dung phân tích"
            data={analysisOptions}
            value={form.values.analysisId !== null ? String(form.values.analysisId) : null}
            onChange={(val) => {
              const numericValue = val ? Number(val) : null;
              form.setFieldValue("analysisId", numericValue);
              form.setFieldValue("taskId", null);
            }}
            error={form.errors.analysisId}
            disabled={form.values.limitationId == null || analysesQuery.isLoading || isUpdate}
          />
          <CustomSelect
            withAsterisk
            searchable
            pt={10}
            label="Công việc"
            placeholder="Mã công việc - Tên công việc"
            data={taskOptions}
            value={form.values.taskId !== null ? String(form.values.taskId) : null}
            onChange={(val) => {
              const numericValue = val ? Number(val) : null;
              form.setFieldValue("taskId", numericValue);
            }}
            error={form.errors.taskId}
            disabled={form.values.analysisId == null || taskDetailsQuery.isLoading || isUpdate}
          />
          <CustomTextInput
            withAsterisk
            pt={10}
            label="Mã minh chứng dự kiến"
            {...form.getInputProps("code")}
            disabled={isUpdate}
          />
          <CustomTextArea
            withAsterisk
            pt={10}
            label="Tên minh chứng dự kiến"
            {...form.getInputProps("name")}
          />
        </Grid.Col>
      </Grid>}
    </CustomButtonCreateUpdate>
  );
}
