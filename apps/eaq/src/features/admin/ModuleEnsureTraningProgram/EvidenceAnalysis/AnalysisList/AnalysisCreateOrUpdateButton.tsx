import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { ENUM_BUSINESS_TYPE } from "@/shared/constants/enum/businessTypeEnum";

interface IAnalysisForm {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  question?: string;
  criterionId?: number;
  requirementId?: number;
}

interface IEAQAnalysisCreate {
  code: string;
  name: string;
  description?: string;
  question?: string;
  eaqRequirementId: number;
  analysisType?: number;
  eaqPhaseId?: number;
}
export default function AnalysisCreateOrUpdateButton({
  data,
  isLoading,
}: {
  data?: IAnalysis;
  isLoading?: boolean;
}) {
  const isUpdate = !!data;
  const disc = useDisclosure(false, {
    onClose: () => {
      form.reset();
    },
  });
  const filterStore = useS_Shared_Filter();

  const form = useForm<IAnalysisForm>({
    initialValues: {
      id: data?.id || 0,
      code: data?.code || "",
      name: data?.name || "",
      description: data?.description || "",
      question: data?.question || "",
      criterionId: data?.eaqRequirement?.eaqCriteria?.id ?? undefined,
      requirementId: data?.eaqRequirementId ?? undefined,
    },
    validate: {
      criterionId: (value) => (value != null ? null : "Vui lòng chọn tiêu chí"),
      requirementId: (value) => (value != null ? null : "Vui lòng chọn yêu cầu"),
      code: (value) => (value ? null : "Vui lòng nhập mã phân tích"),
      description: (value) => (value ? null : "Vui lòng nhập nội dung phân tích"),
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

  const generateCodeQuery = useCustomReactQuery({
    axiosFn: () => codeFormulaService.GenerateCodeByCodeFormula({ operationType: ENUM_BUSINESS_TYPE["Danh sách phân tích yêu cầu "] }),
    queryKey: ["GenerateAnalysisCode", disc[0]],
    options: {
      enabled: disc[0],
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

    return selectedCriteria.eaqRequirements.map((requirement: any) => ({
      value: String(requirement.id),
      label: `${requirement.code} - ${requirement.name}`,
    }));
  }, [requirementsQuery.data, form.values.criterionId]);

  useEffect(() => {
    if (data && isUpdate) {
      form.setValues({
        id: data.id || 0,
        code: data.code || "",
        name: data.name || "",
        criterionId: data.eaqRequirement?.eaqCriteria?.id,
        requirementId: data.eaqRequirement?.id,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!isUpdate && generateCodeQuery.data) {
      form.setFieldValue("code", generateCodeQuery.data);
    }
  }, [generateCodeQuery.data, isUpdate]);

  const handleSubmit = async () => {
    const payload: IEAQAnalysisCreate = {
      code: form.values.code!,
      name: form.values.description!,
      description: form.values.description,
      question: form.values.question,
      eaqRequirementId: form.values.requirementId ?? 0,
      analysisType: 1,
      eaqPhaseId: filterStore.state.Phase?.id,
    };

    if (isUpdate) {
      return service_EAQAnalysis.update({
        ...payload,
        id: data?.id || 0,
        concurrencyStamp: data?.concurrencyStamp,
      });
    } else {
      return service_EAQAnalysis.create(payload);
    }
  };

  return (
    <CustomButtonCreateUpdate
      form={form}
      modalProps={{
        size: "85%",
        title: !isUpdate ? "Thêm nội dung phân tích" : "Chi tiết nội dung phân tích",
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
          }}
          placeholder="Mã yêu cầu - Tên yêu cầu"
          error={form.errors.requirementId}
          disabled={form.values.criterionId == null || requirementsQuery.isLoading || isUpdate}
        />

        <CustomTextInput
          withAsterisk
          label="Mã phân tích"
          {...form.getInputProps("code")}
          disabled={isUpdate}
          maxLength={1000}
        />

        <CustomTextArea
          withAsterisk
          label="Nội dung phân tích"
          {...form.getInputProps("description")}
        />

        <CustomTextArea label="Câu hỏi phân tích" {...form.getInputProps("question")} />
      </CustomFlexColumn>}
    </CustomButtonCreateUpdate>
  );
}
