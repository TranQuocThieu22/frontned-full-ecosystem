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
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
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
  values?: ITaskDetailAnalysis;
}

interface ITaskForm {
  id: number;
  code: string;
  name: string;
  eaqAnalysisId: number;
  duration: string;
  expectedResult: string;
  criterionId: number | null;
  limitationId: number | null;
  analysisId: number | null;
}

export function TaskFormModal({ values }: Props) {
  const isUpdate = !!values;
  const disc = useDisclosure(false, {
    onClose: () => {
      form.reset();
    },
  });
  const filterStore = useS_Shared_Filter();

  const form = useForm<ITaskForm>({
    initialValues: {
      id: values?.id || 0,
      code: values?.code || "",
      name: values?.name || "",
      eaqAnalysisId: values?.eaqAnalysisId || 0,
      duration: values?.duration || "",
      expectedResult: values?.expectedResult || "",
      criterionId: values?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.id ?? null,
      limitationId: values?.eaqAnalysis?.eaqLimitation?.id ?? null,
      analysisId: values?.eaqAnalysisId ?? null,
      // criterionId: null,
      // limitationId: null,
      // analysisId: null,
    },
    validate: {
      criterionId: (value) => (value != null ? null : "Vui lòng chọn tiêu chí"),
      limitationId: (value) => (value != null ? null : "Vui lòng chọn hạn chế"),
      analysisId: (value) => (value != null ? null : "Vui lòng chọn phân tích"),
      code: (value) => (value ? null : "Vui lòng nhập mã công việc"),
      name: (value) => (value ? null : "Vui lòng nhập tên công việc"),
    },
  });

  const criteriaQuery = useCustomReactQuery({
    queryKey: ["EAQCriteria", filterStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    options: {
      enabled: filterStore.state.Phase?.id != undefined && disc[0] == true,
    },
  });

  const limitationsQuery = useCustomReactQuery({
    queryKey: ["EAQLimitations", filterStore.state.Phase?.id, form.values.criterionId],
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
      form.values.limitationId,
    ],
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
        eaqCriteriaId: form.values.criterionId ?? undefined,
        eaqLimitationId: form.values.limitationId ?? undefined,
      }),
    options: {
      enabled:
        !!filterStore.state.Phase?.id &&
        form.values.criterionId != null &&
        form.values.limitationId != null &&
        disc[0],
    },
  });

  const generateCodeQuery = useCustomReactQuery({
    queryKey: ["GenerateLimitationTaskCode", disc[0]],
    axiosFn: () => codeFormulaService.GenerateCodeByCodeFormula({ operationType: ENUM_BUSINESS_TYPE["Danh sách công việc cần thực hiện"] }),
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

  useEffect(() => {
    if (values && isUpdate) {
      form.setValues({
        id: values?.id || 0,
        code: values?.code || "",
        name: values?.name || "",
        eaqAnalysisId: values?.eaqAnalysisId || 0,
        duration: values?.duration || "",
        expectedResult: values?.expectedResult || "",
        criterionId: values?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.id ?? null,
        limitationId: values?.eaqAnalysis?.eaqLimitation?.id ?? null,
        analysisId: values?.eaqAnalysisId ?? null,
      });
    }
  }, [values]);

  useEffect(() => {
    if (!isUpdate && generateCodeQuery.data) {
      form.setFieldValue("code", generateCodeQuery.data);
    }
  }, [generateCodeQuery.data, isUpdate]);

  const handleSubmit = async () => {
    const payload: ITaskDetailAnalysis = {
      id: isUpdate ? values?.id || 0 : 0,
      code: form.values.code || "",
      name: form.values.name || "",
      eaqAnalysisId: form.values.analysisId || 0,
      duration: form.values.duration || "",
      expectedResult: form.values.expectedResult || "",
    };

    if (isUpdate) {
      return service_EAQAnalysis.updateTaskDetailAnalysis(payload);
    } else {
      return service_EAQAnalysis.createTaskDetailAnalysis(payload);
    }
  };

  return (
    <CustomButtonCreateUpdate
      form={form}
      modalProps={{
        size: "60%",
        title: !isUpdate ? "Thêm công việc cần thực hiện" : "Chi tiết công việc cần thực hiện",
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
            data={criterionOptions}
            value={form.values.criterionId !== null ? String(form.values.criterionId) : null}
            onChange={(val) => {
              const numericValue = val ? Number(val) : null;
              form.setFieldValue("criterionId", numericValue);
              form.setFieldValue("limitationId", null);
              form.setFieldValue("analysisId", null);
            }}
            placeholder="Mã tiêu chí - Tên tiêu chí"
            error={form.errors.criterionId}
            disabled={criteriaQuery.isLoading || isUpdate}
          />

          <CustomSelect
            withAsterisk
            searchable
            pt={10}
            label="Hạn chế"
            data={limitationOptions}
            value={form.values.limitationId !== null ? String(form.values.limitationId) : null}
            onChange={(val) => {
              const numericValue = val ? Number(val) : null;
              form.setFieldValue("limitationId", numericValue);
              form.setFieldValue("analysisId", null);
            }}
            placeholder="Mã hạn chế - Tên hạn chế"
            error={form.errors.limitationId}
            disabled={form.values.criterionId == null || limitationsQuery.isLoading || isUpdate}
          />

          <CustomSelect
            withAsterisk
            searchable
            pt={10}
            label="Phân tích"
            data={analysisOptions}
            value={form.values.analysisId !== null ? String(form.values.analysisId) : null}
            onChange={(val) => {
              const numericValue = val ? Number(val) : null;
              form.setFieldValue("analysisId", numericValue);
            }}
            placeholder="Mã phân tích - Nội dung phân tích"
            error={form.errors.analysisId}
            disabled={form.values.limitationId == null || analysesQuery.isLoading || isUpdate}
          />

          <CustomTextInput
            withAsterisk
            pt={10}
            label="Mã công việc"
            {...form.getInputProps("code")}
            disabled={isUpdate}
          />

          <CustomTextArea withAsterisk pt={10} label="Tên công việc" {...form.getInputProps("name")} />

          <CustomTextInput
            pt={10}
            label="Thời gian thực hiện"
            {...form.getInputProps("duration")}
            placeholder="Ví dụ: 3 tháng, 6 tháng"
          />

          <CustomTextArea pt={10} label="Kết quả dự kiến" {...form.getInputProps("expectedResult")} />
        </Grid.Col>
      </Grid>}
    </CustomButtonCreateUpdate>
  );
}
