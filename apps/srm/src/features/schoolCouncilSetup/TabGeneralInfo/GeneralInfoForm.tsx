import { evaluationCriteriaSetService } from "@/shared/APIs/evaluationCriteriaSetService";
import { getAcceptanceCouncilStatusOptions } from "@/shared/consts/enum/EnumAcceptanceCouncilStatus";
import { EnumCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { SRMAcceptanceCouncil } from "@/shared/interfaces/SRMAcceptanceCouncil";
import { SRMEvaluationCriteriaSet } from "@/shared/interfaces/SRMEvaluationCriteriaSet";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Grid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { forwardRef, MutableRefObject, useEffect, useImperativeHandle, useMemo } from "react";

interface Props {
    values?: SRMAcceptanceCouncil;
    hasChange: MutableRefObject<boolean>,
    disc: UseDisclosureReturnValue
}

export interface TabGeneralInfoFormHandle {
    getValues: () => SRMAcceptanceCouncil;
    validate: () => ReturnType<ReturnType<typeof useForm<formValuesType<SRMAcceptanceCouncil>>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const GeneralInfoForm = forwardRef<TabGeneralInfoFormHandle, Props>(
    ({ values, disc }, ref) => {
        const isUpdate = !!values?.id;

        const form = useForm<formValuesType<SRMAcceptanceCouncil>>({
            mode: "uncontrolled",
            initialValues: values ?? {},
            validate: {
                code: (value) => (value ?? "").trim() === "" ? "Mã không được để trống" : null,
                name: (value) => (value ?? "").trim() === "" ? "Tên không được để trống" : null,
            },
        });

        useImperativeHandle(ref, () => {
            return {
                getValues: () => form.getValues(),
                validate: () => form.validate(),
                resetForm: () => form.reset(),
                isDirty: () => form.isDirty(),
                setErrors: (errors) => form.setErrors(errors),
            }
        });

        const evaluationQuery = useCustomReactQuery({
            queryKey: ['EvaluationCriteriaSelectData'],
            axiosFn() {
                return evaluationCriteriaSetService.getAllByCouncilType({ CouncilType: EnumCouncilType.AcceptanceCouncil });
            },
            options: {
                enabled: disc[0],
            },
        })

        const evaluationData = useMemo(() => {
            return (
                evaluationQuery.data?.map((item: SRMEvaluationCriteriaSet) => ({
                    value: item.id?.toString() ?? "",
                    label: `${item.code} - ${item.name}`,
                })) ?? []
            );
        }, [evaluationQuery.data]);

        useEffect(() => {
            if (!isUpdate) {
                form.setValues({
                    status: Number(getAcceptanceCouncilStatusOptions[0]?.value),
                    srmEvaluationCriteriaSetId: Number(evaluationData[0]?.value)
                });
                form.resetDirty();
            }
        }, [evaluationData]);

        return (
            <Stack pt={20}>
                <Grid columns={12}>
                    <Grid.Col span={6}>
                        <CustomTextInput
                            withAsterisk
                            label="Mã Hội đồng"
                            {...form.getInputProps('code')}
                            error={form.errors.code}
                            maxLength={1000}
                            disabled={isUpdate}
                            styles={{
                                input: {
                                    fontWeight: isUpdate ? "bold" : "normal",
                                    color: isUpdate ? "black" : "inherit",
                                },
                            }}
                        />
                        <CustomTextInput
                            withAsterisk
                            pt={10}
                            label="Tên Hội đồng"
                            {...form.getInputProps('name')}
                            maxLength={1000}
                        />
                        <CustomSelect
                            label="Trạng thái hội đồng"
                            pt={10}
                            defaultValue={
                                isUpdate
                                    ? values?.status?.toString()
                                    : getAcceptanceCouncilStatusOptions[0]?.value
                            }
                            clearable={false}
                            value={form.getValues()?.status?.toString()}
                            onChange={(value) => {
                                form.setFieldValue("status", Number(value))
                            }}
                            data={getAcceptanceCouncilStatusOptions}
                        />
                        <CustomTextArea
                            label="Ghi chú"
                            description="Nhập ghi chú"
                            pt={10}
                            {...form.getInputProps('note')}
                            minRows={5}
                            maxRows={5}
                            maxLength={3000}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <CustomDateInput
                            label="Ngày họp dự kiến"
                            clearable={false}
                            {...form.getInputProps('meetingDate')} />
                        <CustomTextInput
                            pt={10}
                            label="Thời gian họp"
                            maxLength={1000}
                            {...form.getInputProps('meetingTime')} />
                        <CustomTextInput
                            pt={10}
                            label="Địa điểm họp"
                            maxLength={1000}
                            {...form.getInputProps('meetingLocation')} />
                        <CustomFileInput
                            label="File quyết định thành lập hội đồng"
                            pt={10}
                            description="Chọn file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            defaultValue={new File([], form.getValues().attachmentDetail?.fileName?.split("/").pop() ?? "")}
                            onChange={async (file) => {
                                if (!file) return;

                                const fileData = await fileUtils.fileToAQDocumentType(file);
                                form.setFieldValue(
                                    "attachmentDetail", fileData
                                );
                            }}
                            error={form.errors.attachmentDetail}
                        />
                        <CustomSelect
                            label="Bộ tiêu chí đánh giá"
                            pt={7}
                            description="Chọn bộ tiêu chí đánh giá"
                            isLoading={evaluationQuery.isFetching}
                            isError={evaluationQuery.isError}
                            defaultValue={
                                isUpdate
                                    ? values?.srmEvaluationCriteriaSetId?.toString()
                                    : evaluationData[0]?.value}
                            value={form.getValues()?.srmEvaluationCriteriaSetId?.toString()}
                            data={evaluationData}
                            onChange={(value) => {
                                form.setFieldValue("srmEvaluationCriteriaSetId", Number(value));
                            }}
                        />
                    </Grid.Col>
                </Grid>
            </Stack>
        )
    }
)

GeneralInfoForm.displayName = "GenralInfoForm";
export default GeneralInfoForm;