import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import { limitationTypeEnum } from "@/shared/constants/enum/LimitationTypeEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useRef } from "react";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { ENUM_BUSINESS_TYPE } from "@/shared/constants/enum/businessTypeEnum";

interface ModalProps {
    values?: ILimitation;
    isUpdate?: boolean;
}

interface OptionProps {
    value: string;
    label: string;
    eaqCriteriaId?: string | number;
}

export default function ReviewCriteriaRecommendationsCreateUpdate({
    values,
}: ModalProps) {
    const isUpdate = !!values;

    const filterStore = useS_Shared_Filter();
    const disc = useDisclosure();

    const taskDetailQuery = useCustomReactQuery({
        axiosFn: () =>
            service_EAQAnalysis.getCriteriaFilter({
                eaqPhaseId: filterStore.state.Phase?.id,
            }),
        queryKey: [
            "CriteriaOptions",
            filterStore.state.Phase?.id,
            limitationTypeEnum.ExternalAssessment,
        ],
        options: {
            enabled: !!filterStore.state.Phase?.id && disc[0],
        },
    });

    const generateCodeQuery = useCustomReactQuery({
        axiosFn: () => codeFormulaService.GenerateCodeByCodeFormula({ operationType: ENUM_BUSINESS_TYPE["Danh sách hạn chế"] }),
        queryKey: ["GenerateReviewLimitationCode", disc[0]],
        options: {
            enabled: disc[0] && !isUpdate,
        }
    });

    const form = useForm<formValuesType<ILimitation>>({
        initialValues: values || {
            eaqCriteriaId: undefined,
            code: "",
            name: "",
            eaqPhaseId: filterStore.state.Phase?.id,
        },
        validate: {
            eaqCriteriaId: (value) =>
                !value ? "Mã tiêu chí không được để trống" : null,
            code: (value) =>
                value?.trim() === "" ? "Mã hạn chế không được để trống" : null,
            name: (value) =>
                value?.trim() === "" ? "Nội dung hạn chế không được để trống" : null,
        },
    });

    const isModalOpen = disc[0];
    const hasSetDefaultValues = useRef(false);

    useEffect(() => {
        if (isUpdate && values) {
            form.setValues(values);
        }

        if (!isModalOpen) {
            form.reset();
            hasSetDefaultValues.current = false;
        }
    }, [values, isModalOpen, isUpdate]);

    useEffect(() => {
        if (
            !isUpdate &&
            taskDetailQuery.data &&
            taskDetailQuery.data.length > 0 &&
            isModalOpen &&
            !hasSetDefaultValues.current
        ) {
            const firstItem = taskDetailQuery.data[0];
            const currentValues = form.getValues();
            if (firstItem?.id && !currentValues.eaqTaskDetailId) {
                form.setValues({
                    eaqCriteriaId: firstItem.id,
                    eaqTaskDetailId: firstItem.id,
                });
                hasSetDefaultValues.current = true;
            }
        }
    }, [taskDetailQuery.data, isModalOpen, isUpdate]);

    useEffect(() => {
        if (!isUpdate && generateCodeQuery.data) {
            form.setFieldValue("code", generateCodeQuery.data);
        }
    }, [generateCodeQuery.data, isUpdate]);

    const criteriaOptions = useMemo<OptionProps[]>(() => {
        return (
            taskDetailQuery.data
                ?.filter((item) => item.id)
                .map((item) => ({
                    value: item.id!.toString(),
                    label: `${item.code || "N/A"} - ${item.name || "N/A"
                        }`,
                    eaqCriteriaId: item.id,
                })) || []
        );
    }, [taskDetailQuery.data]);

    function handleSubmit() {
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            return false;
        }

        if (isUpdate) {
            return service_EAQLimitation.update(form.values);
        }

        const payload: ILimitation = {
            // ...form.values,
            eaqCriteriaId: form.values.eaqCriteriaId,
            code: form.values.code,
            name: form.values.name,
            eaqPhaseId: Number(filterStore.state.Phase?.id),
            limitationType: limitationTypeEnum.ExternalAssessment,
        };
        return service_EAQLimitation.create(payload);
    }

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            form={form}
            disclosure={disc}
            onSubmit={handleSubmit}
            buttonProps={{
                loading: taskDetailQuery.isFetching,
            }}
            actionIconProps={{
                loading: taskDetailQuery.isFetching,
            }}
            modalProps={{
                size: "90%",
            }}
        >
            <CustomSelect
                label="Mã - Tên tiêu chí"
                withAsterisk
                readOnly={isUpdate}
                isLoading={taskDetailQuery.isFetching}
                data={criteriaOptions}
                value={form.getValues().eaqCriteriaId?.toString()}
                onChange={(value, options: OptionProps) => {
                    form.setFieldValue(
                        "eaqCriteriaId",
                        options.eaqCriteriaId !== undefined
                            ? Number(options.eaqCriteriaId)
                            : undefined
                    );
                }}
                error={form.errors.eaqCriteriaId}
            />
            <CustomTextInput
                label="Mã hạn chế"
                readOnly={isUpdate}
                withAsterisk
                maxLength={3000}
                {...form.getInputProps("code")}
            />
            <CustomTextArea
                label="Hạn chế"
                withAsterisk
                maxLength={4000}
                {...form.getInputProps("name")}
            />
        </CustomButtonCreateUpdate>
    );
}
