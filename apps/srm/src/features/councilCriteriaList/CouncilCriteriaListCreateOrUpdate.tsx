'use client'
import { conclusionService } from "@/shared/APIs/conclusionService";
import { evaluationCriteriaSetService } from "@/shared/APIs/evaluationCriteriaSetService";
import { EnumCouncilType, EnumLabelCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { SRMCriteria } from "@/shared/interfaces/SRMCriteria";
import { SRMEvaluationCriteriaSet } from "@/shared/interfaces/SRMEvaluationCriteriaSet";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import CriteriasTable from "./Criterias/CriteriasTable";

export default function CouncilCriteriaListCreateOrUpdate({ initValues }: { initValues?: SRMEvaluationCriteriaSet }) {
    const form = useForm<SRMEvaluationCriteriaSet>({
        mode: "uncontrolled",
        validate: {
            code: (value) => !value ? "Mã bộ tiêu chí là bắt buộc" : null,
            name: (value) => !value ? "Tên bộ tiêu chí là bắt buộc" : null,
        }
    });
    const [criterias, setCriterias] = useState<SRMCriteria[]>([]);

    const handleCriteriasChange = (newCriterias: SRMCriteria[]) => {
        setCriterias(newCriterias);
    };

    async function handleSubmit(formValues: SRMEvaluationCriteriaSet) {
        let res;
        if (initValues) {
            res = await evaluationCriteriaSetService.update({
                ...formValues,
                srmConclusionSet: undefined,
                srmCriterias: criterias
            });
            setCriterias([])
            return res;
        }
        res = await evaluationCriteriaSetService.create({
            ...formValues,
            srmCriterias: criterias
        });
        setCriterias([])
        return res
    }


    useEffect(() => {
        if (!initValues) return;
        form.setInitialValues({
            ...initValues,
        })
        form.setValues({
            ...initValues,
        })
        setCriterias(initValues?.srmCriterias ?? [])
    }, [initValues])

    const conclusionQuery = useCustomReactQuery({
        queryKey: ['conclusionQuery'],
        axiosFn: () => conclusionService.getAll()
    })


    return (
        <CustomButtonCreateUpdate
            scrollAreaAutosizeProps={{
                h: "auto"
            }}
            modalProps={{
                size: "70%",
                title: initValues
                    ? "Cập nhật bộ tiêu chí đánh giá" : "Chi tiết bộ tiêu chí đánh giá",
            }}
            onSubmit={handleSubmit}
            form={form}
            isUpdate={!!initValues}
        >
            <CustomTabs
                tabs={[
                    {
                        label: "Thông tin chung",
                        children: (
                            <Grid columns={12}>
                                <Grid.Col span={6}>
                                    <CustomTextInput
                                        label="Mã bộ tiêu chí"
                                        withAsterisk
                                        readOnly={!!initValues}
                                        {...form.getInputProps("code")}
                                    />
                                    <CustomTextInput
                                        label="Tên bộ tiêu chí"
                                        withAsterisk
                                        {...form.getInputProps("name")}
                                    />
                                    <CustomSelect
                                        label="Loại hội đồng"
                                        data={converterUtils.mapEnumToSelectData(EnumCouncilType, EnumLabelCouncilType)}
                                        {...form.getInputProps("councilType")}
                                        value={form.values?.councilType?.toString() || null}
                                        onChange={(value: any) => form.setFieldValue("councilType", parseInt(value))}
                                    />
                                    <CustomSelect
                                        label="Bộ kết luận"
                                        data={conclusionQuery.data?.map((item) => ({
                                            value: item?.id?.toString() || "",
                                            label: item?.name || ""
                                        })) || []}
                                        value={form.values.srmConclusionSetId?.toString() || null}
                                        {...form.getInputProps("srmConclusionSetId")}
                                        onChange={(value) => form.setFieldValue("srmConclusionSetId", Number(value) || 1)}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <CustomTextArea
                                        label="Ghi chú"
                                        {...form.getInputProps("note")}
                                    />
                                </Grid.Col>
                            </Grid>
                        )
                    },
                    {
                        label: "Danh sách tiêu chí",
                        children: (
                            <CriteriasTable
                                criterias={criterias}
                                setCriterias={setCriterias}
                                onCriteriasChange={handleCriteriasChange}
                            />
                        )
                    }
                ]}
            />
        </CustomButtonCreateUpdate>
    );
}