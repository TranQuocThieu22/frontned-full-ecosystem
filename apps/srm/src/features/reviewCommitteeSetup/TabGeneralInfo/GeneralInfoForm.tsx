"use client";

import { evaluationCriteriaSetService } from "@/shared/APIs/evaluationCriteriaSetService";
import { EnumCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { ReviewCommitteeStatusEnum, ReviewCommitteeStatusLabel } from "@/shared/consts/enum/EnumReviewCommitteeStatus";
import { SRMReviewCommittee } from "@/shared/interfaces/SRMReviewCommittee";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useImperativeHandle } from "react";

interface Props {
    values?: SRMReviewCommittee,
}

export interface GenralInfoFormHandle {
    getValues: () => SRMReviewCommittee;
    validate: () => ReturnType<ReturnType<typeof useForm<SRMReviewCommittee>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const GeneralInfoForm = forwardRef<GenralInfoFormHandle, Props>(({ values }, ref) => {

    const form = useForm<SRMReviewCommittee>({
        mode: "uncontrolled",
        initialValues: values
            ? {
                ...values,
                academicYear: undefined,
                srmReviewProposals: undefined,
                srmReviewMembers: undefined
            }
            : {
                status: 1
            },
        validate: {
            code: (value) => (value ?? "").trim() === "" ? "Số hội đồng không được để trống" : null,
            name: (value) => !value || value.trim() === "" ? "Tên hội đồng không được để trống" : null,
        },
    });

    const evaluationCriteriaSetQuery = useCustomReactQuery({
        queryKey: ['evaluation_criteria_set'],
        axiosFn: () => evaluationCriteriaSetService.getAllByCouncilType({ CouncilType: EnumCouncilType.AdvisoryCouncil })
    });

    // expose hàm cho component cha
    useImperativeHandle(ref, () => ({
        getValues: () => form.getValues(),
        validate: () => form.validate(),
        resetForm: () => form.reset(),
        isDirty: () => form.isDirty(),
        setErrors: (errors) => form.setErrors(errors),
    }));

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24}>
                <Stack>
                    <CustomTextInput
                        label="Mã hội đồng"
                        {...form.getInputProps("code")}
                        readOnly={!!values}
                        withAsterisk
                    />
                    <CustomTextInput
                        label="Tên hội đồng"
                        {...form.getInputProps("name")}
                        withAsterisk
                    />
                    <CustomSelect
                        label="Trạng thái hội đồng"
                        defaultValue={String(form.getValues().status || '1')}
                        data={converterUtils.mapEnumToSelectData(ReviewCommitteeStatusEnum, ReviewCommitteeStatusLabel)}
                        onChange={(value) => {
                            const id = value !== null ? Number(value) : undefined;
                            form.setFieldValue("status", id);
                        }}
                        error={form.errors.status}
                    />
                    <CustomDateInput
                        label="Ngày họp dự kiến"
                        {...form.getInputProps("meetingDate")}
                    />
                </Stack>
                <Stack>
                    <CustomTextInput
                        label="Thời gian họp"
                        {...form.getInputProps("meetingTime")}
                    />
                    <CustomTextInput
                        label="Địa điểm họp"
                        {...form.getInputProps("meetingLocation")}
                    />
                    <CustomSelect
                        isLoading={evaluationCriteriaSetQuery.isLoading}
                        isError={evaluationCriteriaSetQuery.isError}
                        label="Bộ tiêu chí đánh giá"
                        data={
                            evaluationCriteriaSetQuery.data?.map((item) => ({
                                value: String(item.id),
                                label: `${item.code} - ${item.name}`,
                            })) || []
                        }
                        placeholder={evaluationCriteriaSetQuery.data?.length === 0 ? "Không có bộ tiêu chí nào" : "Chọn bộ tiêu chí đánh giá"}
                        value={form.values.srmEvaluationCriteriaSetId !== undefined ? String(form.values.srmEvaluationCriteriaSetId) : null}
                        onChange={(value) => {
                            const id = value !== null ? Number(value) : undefined;
                            form.setFieldValue("srmEvaluationCriteriaSetId", id);
                        }}
                        error={form.errors.srmEvaluationCriteriaSetId}
                    />
                    <CustomFileInput
                        label="File quyết định thành lập hội đồng tư vấn"
                        accept=".pdf"
                        defaultValue={new File([], form.values.attachmentDetail?.fileName || "")}
                        onChange={async (file) => {
                            if (!file) return;
                            form.setFieldValue(
                                "attachmentDetail",
                                await fileUtils.fileToAQDocumentType(file)
                            );
                        }}
                        error={form.errors.fileDetail}
                    />
                </Stack>
            </SimpleGrid>
            <CustomTextArea
                mt="sm"
                label="Ghi chú"
                {...form.getInputProps("note")}
            />
        </>
    );
});

GeneralInfoForm.displayName = "GeneralInfoForm";
export default GeneralInfoForm;
