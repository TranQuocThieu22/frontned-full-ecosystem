"use client";

import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMProposalApproval } from "@/shared/interfaces/SRMProposalApproval";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useImperativeHandle } from "react";

interface Props {
    values?: SRMProposalApproval,
    readOnly?: boolean
}

export interface GenralInfoFormHandle {
    getValues: () => SRMProposalApproval;
    validate: () => ReturnType<ReturnType<typeof useForm<SRMProposalApproval>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const GeneralInfoForm = forwardRef<GenralInfoFormHandle, Props>(({ values, readOnly }, ref) => {
    const academicYearStore = useAcademicYearStore();

    const form = useForm<SRMProposalApproval>({
        mode: "uncontrolled",
        initialValues: values
            ? {
                ...values,
                srmApprovedProposals: undefined
            }
            : {
                academicYearId: academicYearStore.state.academicYear?.id
            },
        validate: {
            decisionCode: (value) => (value ?? "").trim() === "" ? "Số quyết định là bắt buộc" : null,
            decisionName: (value) => !value || value.trim() === "" ? "Tên quyết định là bắt buộc" : null,
        },
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
                <CustomTextInput
                    label="Số quyết định"
                    {...form.getInputProps("decisionCode")}
                    readOnly={!!values}
                    withAsterisk
                />
                <CustomTextInput
                    label="Tên quyết định"
                    {...form.getInputProps("decisionName")}
                    withAsterisk
                    readOnly={readOnly}
                />
                <CustomDateInput
                    label="Ngày quyết định"
                    {...form.getInputProps("decisionDate")}
                    readOnly={readOnly}
                />
                <CustomTextInput
                    label="Người ký"
                    {...form.getInputProps("signer")}
                    readOnly={readOnly}
                />
                <CustomFileInput
                    label="File quyết định"
                    accept="*"
                    readOnly={readOnly}
                    defaultValue={form.values.attachmentPath ? new File([], form.values.attachmentPath?.split("/").at(-1) || "") : undefined}
                    onChange={async (file) => {
                        if (!file) {
                            form.setFieldValue("attachmentPath", '');
                            return;
                        };
                        form.setFieldValue(
                            "attachmentDetail",
                            await fileUtils.fileToAQDocumentType(file)
                        );
                    }}
                    error={form.errors.fileDetail}
                />
            </SimpleGrid>
            <CustomTextArea
                mt="sm"
                label="Ghi chú"
                readOnly={readOnly}
                {...form.getInputProps("note")}
            />
        </>
    );
});

GeneralInfoForm.displayName = "GeneralInfoForm";
export default GeneralInfoForm;
