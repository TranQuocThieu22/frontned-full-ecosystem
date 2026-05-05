"use client";

import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { ENUM_BUSINESS_TYPE } from "@/shared/constants/enum/businessTypeEnum";

interface Props {
  values?: IAnalysis;
}

interface IEAQAnalysisCreate {
  code: string;
  name: string;
  description?: string;
  question?: string;
  eaqLimitationId: number;
  analysisType: number;
  eaqPhaseId?: number;
}

interface IAnalysisForm {
  id: number;
  code: string;
  name: string;
  description: string;
  question: string;
  eaqLimitationId: number;
  criterionId: number | null;
  limitationId: number | null;
}

export function AnalysisFormModal({ values }: Props) {
  const isUpdate = !!values;
  const disc = useDisclosure(false, {
    onClose: () => {
      form.reset();
    },
  });
  const filterStore = useS_Shared_Filter();

  const form = useForm<IAnalysisForm>({
    initialValues: {
      id: values?.id || 0,
      code: values?.code || "",
      name: values?.name || "",
      description: values?.description || "",
      question: values?.question || "",
      eaqLimitationId: values?.eaqLimitationId || 0,
      criterionId: values?.eaqLimitation?.eaqCriteria?.id ?? null,
      limitationId: values?.eaqLimitationId ?? null,
    },
    validate: {
      criterionId: (value) => (value != null ? null : "Vui lòng chọn tiêu chí"),
      limitationId: (value) => (value != null ? null : "Vui lòng chọn hạn chế"),
      code: (value) => (value ? null : "Vui lòng nhập mã phân tích"),
      description: (value) => (value ? null : "Vui lòng nhập nội dung phân tích"),
    },
  });
  const selectedCriterionId = form.values.criterionId;

  const criteriaQuery = useCustomReactQuery({
    queryKey: ["EAQCriteria", filterStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
      }),
    options: {
      enabled: filterStore.state.Phase?.id != undefined && !!disc[0],
    },
  });

  const limitationsQuery = useCustomReactQuery({
    queryKey: ["EAQLimitations", filterStore.state.Phase?.id, selectedCriterionId],
    axiosFn: () =>
      service_EAQAnalysis.getCriteriaFilter({
        eaqPhaseId: filterStore.state.Phase?.id,
        eaqCriteriaId: selectedCriterionId ?? undefined,
      }),
    options: {
      enabled: !!filterStore.state.Phase?.id && selectedCriterionId != null && !!disc[0],
    },
  });

  const generateCodeQuery = useCustomReactQuery({
    queryKey: ["GenerateLimitationAnalysisCode", disc[0]],
    axiosFn: () => codeFormulaService.GenerateCodeByCodeFormula({ operationType: ENUM_BUSINESS_TYPE["Danh sách phân tích yêu cầu "] }),
    options: {
      enabled: !!disc[0] && !isUpdate,

    },
  });

  const criterionOptions = useMemo(() => {
    if (!criteriaQuery.data || criteriaQuery.data.length === 0) return [];

    return criteriaQuery.data.map((criteria: ICriteria) => ({
      value: String(criteria.id),
      label: `${criteria.code} - ${criteria.name}`,
    }));
  }, [criteriaQuery.data]);

  const limitationOptions = useMemo(() => {
    if (!limitationsQuery.data?.[0]?.eaqLimitations) return [];

    const selectedCriteria = limitationsQuery.data.find(
      (criteria: ICriteria) => criteria.id === selectedCriterionId
    );

    return (
      selectedCriteria?.eaqLimitations?.map((limitation: ILimitation) => ({
        value: String(limitation.id),
        label: `${limitation.code} - ${limitation.name}`,
      })) ?? []
    );
  }, [limitationsQuery.data, form.values.criterionId]);

  useEffect(() => {
    if (isUpdate || !generateCodeQuery.data) return
    form.setFieldValue("code", generateCodeQuery.data);
  }, [generateCodeQuery.data, isUpdate]);


  useEffect(() => {
    if (values && isUpdate) {
      form.setValues({
        id: values?.id || 0,
        code: values?.code || "",
        name: values?.name || "",
        description: values?.description || "",
        question: values?.question || "",
        eaqLimitationId: values?.eaqLimitationId || 0,
        criterionId: values?.eaqLimitation?.eaqCriteria?.id ?? null,
        limitationId: values?.eaqLimitationId ?? null,
      });
    }
  }, [values]);


  const handleSubmit = async () => {
    const payload: IEAQAnalysisCreate = {
      code: form.values.code!,
      name: form.values.description,
      description: form.values.description,
      question: form.values.question,
      eaqLimitationId: form.values.limitationId ?? 0,
      analysisType: analysisTypeEnum.Limitation, // Hạn chế
      eaqPhaseId: filterStore.state.Phase?.id,
    };

    if (isUpdate) {
      return service_EAQAnalysis.update({
        ...payload,
        concurrencyStamp: values?.concurrencyStamp,
        id: values?.id || 0,
      });
    } else {
      return service_EAQAnalysis.create(payload);
    }
  };

  return (
    <CustomButtonCreateUpdate
      form={form}
      modalProps={{
        size: "60%",
        title: !isUpdate ? "Thêm nội dung phân tích" : "Chi tiết nội dung phân tích",
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
            value={form.values.criterionId ? String(form.values.criterionId) : null}
            onChange={(val) => {
              const numericValue = val ? Number(val) : null;
              form.setFieldValue("criterionId", numericValue);
              form.setFieldValue("limitationId", null);
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
            value={form.values.limitationId ? String(form.values.limitationId) : null}
            onChange={(val) => {
              const numericValue = val ? Number(val) : null;
              form.setFieldValue("limitationId", numericValue);
              form.setFieldValue("eaqLimitationId", numericValue ?? 0);
            }}
            placeholder="Mã hạn chế - Tên hạn chế"
            error={form.errors.limitationId}
            disabled={!form.values.criterionId || limitationsQuery.isLoading || isUpdate}
          />

          <CustomTextInput
            withAsterisk
            pt={10}
            label="Mã phân tích"
            {...form.getInputProps("code")}
            disabled={isUpdate}
          />

          <CustomTextArea
            withAsterisk
            pt={10}
            label="Nội dung phân tích"
            {...form.getInputProps("description")}
          />

          <CustomTextArea pt={10} label="Câu hỏi phân tích" {...form.getInputProps("question")} />
        </Grid.Col>
      </Grid>}
    </CustomButtonCreateUpdate>
  );
}
