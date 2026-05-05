import { service_EAQLimitation } from "@/shared/APIs/service_EAQLimitation";
import { limitationTypeEnum } from "@/shared/constants/enum/LimitationTypeEnum";
import ILimitation from "@/shared/interfaces/limitation/ILimitation";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo } from "react";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { codeFormulaService } from "@aq-fe/core-ui/shared/APIs/codeFormulaService";
import { ENUM_BUSINESS_TYPE } from "@/shared/constants/enum/businessTypeEnum";

interface Props {
    data?: ILimitation
}

export function CouncilRecommendationsCreateOrUpdate({ data }: Props) {
    const disc = useDisclosure();
    const filterStore = useS_Shared_Filter();

    const form = useForm<formValuesType<ILimitation>>({
        initialValues: data ? data
            : {
                eaqCriteriaId: undefined,
                eaqTaskDetailId: undefined,
                code: "",
                name: "",
                limitationType: limitationTypeEnum.AssessmentCouncil,
                eaqPhaseId: filterStore.state.Phase?.id
            },
        validate: {
            eaqCriteriaId: (value) => (value ? null : "Không được để trống"),
            code: (value) => (value?.trim() ? null : "Không được để trống"),
            name: (value) => (value?.trim() ? null : "Không được để trống"),
        }
    });

    const criteriaQuery = useCustomReactQuery({
        queryKey: ["CouncilRecommendationsCreateOrUpdate", filterStore.state.Phase?.id],
        axiosFn: () => service_EAQAnalysis.getCriteriaFilter({
            eaqPhaseId: filterStore.state.Phase?.id,
        }).then(res => {
            if (!data) {
                const dataFirst = res.data?.data?.[0];
                form.setFieldValue("eaqCriteriaId", Number(dataFirst?.id));
            }
            return res;
        }),
        options: {
            enabled: disc[0]
        }
    });

    const generateCodeQuery = useCustomReactQuery({
        axiosFn: () => codeFormulaService.GenerateCodeByCodeFormula({ operationType: ENUM_BUSINESS_TYPE["Danh sách hạn chế"] }),
        queryKey: ["GenerateCouncilLimitationCode", disc[0]],
        options: {
            enabled: disc[0] && !data,
        }
    });

    const criteriaOption = useMemo(() => {
        return criteriaQuery.data?.map((item) => ({
            label: String(item.code) + " - " + String(item.name),
            value: `${item.id}`,
            eaqCriteriaId: item.id,
        })) || []
    }, [criteriaQuery.data])

    const handleSubmit = () => {
        const payload: ILimitation = {
            id: data?.id,
            eaqCriteriaId: form.values.eaqCriteriaId,
            code: form.values.code,
            name: form.values.name,
            eaqPhaseId: filterStore.state.Phase?.id,
            // ...createUpdateForm.values,
            limitationType: limitationTypeEnum.AssessmentCouncil
        };

        if (data) {
            return service_EAQLimitation.update(payload);
        }
        return service_EAQLimitation.create(payload);
    }

    useEffect(() => {
        if (!data || !disc[0]) return;
        form.setFieldValue("name", data.name)
    }, [data, disc[0]])
    useEffect(() => {
        if (data) {
            form.setValues(data);
        }
        if (!disc[0]) {
            form.reset();
        }
    }, [data, disc[0]]);

    useEffect(() => {
        if (!data && generateCodeQuery.data) {
            form.setFieldValue("code", generateCodeQuery.data);
        }
    }, [generateCodeQuery.data, data]);
    return (
        <CustomButtonCreateUpdate
            disclosure={disc}
            isUpdate={!!data}
            modalProps={{
                size: "85%",
            }}
            form={form}
            onSubmit={() => handleSubmit()}
        >
            <CustomSelect
                withAsterisk
                isLoading={criteriaQuery.isFetching}
                isError={criteriaQuery.isError}
                readOnly={!!data}
                label="Tiêu chí"
                data={criteriaOption}
                value={data ? String(data.eaqCriteriaId) : criteriaQuery?.data?.[0]?.id?.toString()}
                onChange={(value, options) => {
                    const option = options as any;
                    form.setFieldValue("eaqCriteriaId", Number(option?.eaqCriteriaId));
                }}
                error={form.errors.eaqCriteriaId}
            />
            <CustomTextInput
                readOnly={!!data}
                maxLength={1000}
                label="Mã hạn chế"
                {...form.getInputProps("code")}
                withAsterisk
            />
            <CustomTextArea
                withAsterisk
                label="Hạn chế"
                {...form.getInputProps("name")}
            />

        </CustomButtonCreateUpdate>
    );
}
