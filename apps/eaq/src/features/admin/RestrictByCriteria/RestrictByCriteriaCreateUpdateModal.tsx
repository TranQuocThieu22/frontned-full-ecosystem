import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import { limitationTypeEnum } from "@/shared/constants/enum/LimitationTypeEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo } from "react";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
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

export default function RestrictByCriteriaCreateUpdateModal({ values }: ModalProps) {
    const isUpdate = !!values

    const filterStore = useS_Shared_Filter();
    const modalDisc = useDisclosure();

    const criteriaQuery = useCustomReactQuery(
        {
            axiosFn: () => service_EAQAnalysis.getCriteriaFilter(
                { eaqPhaseId: filterStore.state.Phase?.id }
            ).then(res => {
                if (!isUpdate) {
                    createUpdateForm.setValues({
                        eaqCriteriaId: criteriaQuery.data?.[0]?.id,
                    });
                }
                ;
                return res;
            }),
            queryKey: ["CriteriaOptions", filterStore.state.Phase?.id],
            options: {
                enabled: !!filterStore.state.Phase?.id && modalDisc[0]
            }
        }
    )

    const generateCodeQuery = useCustomReactQuery({
        axiosFn: () => codeFormulaService.GenerateCodeByCodeFormula({ operationType: ENUM_BUSINESS_TYPE["Danh sách hạn chế"] }),
        queryKey: ["GenerateLimitationCode", modalDisc[0]],
        options: {
            enabled: modalDisc[0] && !isUpdate,
        }
    });

    const createUpdateForm = useForm<formValuesType<ILimitation>>({
        initialValues: values || {
            eaqCriteriaId: undefined,
            code: "",
            name: "",
            eaqPhaseId: filterStore.state.Phase?.id
        },
        validate: {
            eaqCriteriaId: (value) => !value ? "Mã tiêu chí không được để trống" : null,
            code: (value) => value?.trim() === "" ? "Mã hạn chế không được để trống" : null,
            name: (value) => value?.trim() === "" ? "Nội dung hạn chế không được để trống" : null,
        }
    });

    useEffect(() => {
        if (isUpdate) {
            createUpdateForm.setValues(values);
        }

        if (!modalDisc[0]) {
            createUpdateForm.reset();
        }
    }, [values, modalDisc[0]]);

    useEffect(() => {
        if (!isUpdate && generateCodeQuery.data) {
            createUpdateForm.setFieldValue("code", generateCodeQuery.data);
        }
    }, [generateCodeQuery.data, isUpdate]);

    const criteriaOptions = useMemo<OptionProps[]>(
        () => {
            return criteriaQuery.data?.filter((item) => item.id)
                .map((item) => ({
                    value: item.id?.toString() || "",
                    label: `${item.code || "N/A"} - ${item.name || "N/A"}`,
                    eaqCriteriaId: item.id
                })) || [];
        },
        [criteriaQuery.data]
    );

    function handleSubmit() {
        const validationResult = createUpdateForm.validate();

        if (validationResult.hasErrors) {
            return false;
        }

        if (isUpdate) {
            return service_EAQLimitation.update(createUpdateForm.values);
        }

        const payload: ILimitation = {
            eaqCriteriaId: createUpdateForm.values.eaqCriteriaId,
            code: createUpdateForm.values.code,
            name: createUpdateForm.values.name,
            eaqPhaseId: filterStore.state.Phase?.id,
            // ...createUpdateForm.values,
            limitationType: limitationTypeEnum.SelfAssessment
        };

        return service_EAQLimitation.create(payload);
    }

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            form={createUpdateForm}
            disclosure={modalDisc}
            onSubmit={handleSubmit}
            modalProps={{
                size: "90%",
            }}
        >
            <CustomSelect
                label="Mã - Tên tiêu chí"
                withAsterisk
                readOnly={isUpdate}
                isLoading={criteriaQuery.isFetching}
                data={criteriaOptions}
                defaultValue={createUpdateForm.getValues().eaqCriteriaId?.toString() ?? criteriaQuery.data?.[0]?.id?.toString()}
                onChange={(value, options: OptionProps) => {
                    createUpdateForm.setFieldValue("eaqCriteriaId", options.eaqCriteriaId ? Number(options.eaqCriteriaId) : undefined);
                    createUpdateForm.setFieldValue("eaqTaskDetailId", options.value ? Number(options.value) : undefined);
                }}
                error={createUpdateForm.errors.eaqCriteriaId}
            />
            <CustomTextInput
                label="Mã hạn chế"
                readOnly={isUpdate}
                withAsterisk
                maxLength={3000}
                {...createUpdateForm.getInputProps("code")}
            />
            <CustomTextArea
                label="Hạn chế"
                withAsterisk
                maxLength={4000}
                {...createUpdateForm.getInputProps("name")}
            />
        </CustomButtonCreateUpdate>
    );
}

