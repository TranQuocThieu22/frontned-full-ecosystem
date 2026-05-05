"use client";

import { SRMConclusionSet } from "@/shared/interfaces/SRMConclusionSet";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Checkbox, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useImperativeHandle } from "react";

interface Props {
    conclusionSet?: SRMConclusionSet,
}

export interface ConclusionSetGenralFormHandle {
    getValues: () => SRMConclusionSet;
    validate: () => ReturnType<ReturnType<typeof useForm<SRMConclusionSet>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const GenralInfoForm = forwardRef<ConclusionSetGenralFormHandle, Props>(({ conclusionSet }, ref) => {

    const form = useForm<SRMConclusionSet>({
        mode: "uncontrolled",
        initialValues: conclusionSet,
        validate: {
            code: (value) => (value ?? "").trim() === "" ? "Mã bộ kết luận không được để trống" : null,
            name: (value) => (value ?? "").trim() === "" ? "Tên bộ kết luận không được để trống" : null,
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
            <Stack>
                <CustomTextInput
                    label="Mã bộ kết luận"
                    {...form.getInputProps("code")}
                    disabled={!!conclusionSet}
                    withAsterisk
                />
                <CustomTextInput
                    label="Tên bộ kết luận"
                    {...form.getInputProps("name")}
                    withAsterisk
                />
                <Checkbox
                    label="Không sử dụng"
                    defaultChecked={form.getValues().isDeactivate}
                    {...form.getInputProps("isDeactivate")}
                />
                <CustomTextArea
                    label="Ghi chú"
                    {...form.getInputProps("note")}
                />
            </Stack>
        </>
    );
});

GenralInfoForm.displayName = "GenralInfoForm";
export default GenralInfoForm;
