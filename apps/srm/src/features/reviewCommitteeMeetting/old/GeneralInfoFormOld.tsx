"use client";

import { reviewCommitteeService } from "@/shared/APIs/reviewCommitteeService";
import { SRMReviewProposal } from "@/shared/interfaces/SRMReviewProposal";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useEffect, useImperativeHandle } from "react";

interface Props {
    values?: SRMReviewProposal,
}

export interface GenralInfoFormHandle {
    getValues: () => SRMReviewProposal;
    validate: () => ReturnType<ReturnType<typeof useForm<SRMReviewProposal>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const GeneralInfoFormOld = forwardRef<GenralInfoFormHandle, Props>(({ values }, ref) => {

    const form = useForm<SRMReviewProposal>({
        mode: "uncontrolled",
        validate: {
            code: (value) => (value ?? "").trim() === "" ? "Số hội đồng không được để trống" : null,
            name: (value) => !value || value.trim() === "" ? "Tên hội đồng không được để trống" : null,
        },
    });

    const conclusionQuery = useCustomReactQuery({
        queryKey: ['conclusion_list', values?.srmReviewCommitteeId],
        axiosFn: () => reviewCommitteeService.getConclusionByReivewCommittee({ SRMReviewCommitteeId: values?.srmReviewCommitteeId }),
        options: {
            enabled: !!values?.srmReviewCommitteeId
        }
    })

    useEffect(() => {
        if (!values) return;
        form.setValues({
            ...values,
            srmProposalMembers: undefined,
            srmConclusion: undefined,
            srmReviewCommittee: undefined,
            srmTaskProposal: undefined
        });
        form.resetDirty();
    }, [values])

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
                        label="Mã đề xuất"
                        {...form.getInputProps("code")}
                        readOnly
                    />
                    <CustomTextInput
                        label="Tên đề tài"
                        {...form.getInputProps("name")}
                        readOnly
                    />
                    <CustomDateInput
                        label="Ngày họp"
                        clearable={false}
                        key={`${values?.id}${values?.meetingDate}-meetingDate`}
                        defaultValue={values?.meetingDate}
                        onChange={(value) => {
                            form.setFieldValue("meetingDate", value ? value : undefined);
                        }}
                    />
                </Stack>
                <Stack>
                    <CustomSelect
                        label="Kết luận của hội đồng"
                        isLoading={conclusionQuery.isFetching}
                        isError={conclusionQuery.isError}
                        key={`${values?.id}${values?.srmConclusionId}-conclusion`}
                        defaultValue={String(values?.srmConclusionId || undefined)}
                        data={conclusionQuery.data?.map((item) => ({
                            value: String(item.id),
                            label: `${item.name}`
                        }))}
                        onChange={(value) => {
                            const id = value !== null ? Number(value) : undefined;
                            form.setFieldValue("srmConclusionId", id);
                        }}
                        error={form.errors.status}
                    />
                    <CustomFileInput
                        label="File phiếu nhận xét"
                        accept="*"
                        key={`${values?.id}${values?.attachmentPath}-file`}
                        defaultValue={new File([], values?.attachmentPath?.split("/").at(-1) || "")}
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
                label="Kiến nghị"
                {...form.getInputProps("recommendation")}
            />
        </>
    );
});

GeneralInfoFormOld.displayName = "GeneralInfoFormOld";
export default GeneralInfoFormOld;