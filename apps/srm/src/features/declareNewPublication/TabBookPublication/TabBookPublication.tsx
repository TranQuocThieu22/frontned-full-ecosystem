import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useImperativeHandle } from "react";

interface TabBookPublicationProps {
    values?: SRMPublicationDeclaration;
}

export interface TabBookPublicationFormHandle {
    getValues: () => SRMPublicationDeclaration;
    validate: () => ReturnType<ReturnType<typeof useForm<SRMPublicationDeclaration>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const TabBookPublication = forwardRef<TabBookPublicationFormHandle, TabBookPublicationProps>(
    ({ values }, ref) => {
        const isUpdate = !!values?.id;

        const form = useForm<SRMPublicationDeclaration>({
            mode: "uncontrolled",
            initialValues: values,
            validate: {},
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
        return (
            <Stack>
                <CustomNumberInput
                    label="Tổng số trang"
                    max={10000}
                    min={0}
                    {...form.getInputProps("totalPage")}
                    error={form.errors.totalPage}
                />
                <CustomNumberInput
                    label="Tổng số chương"
                    max={100}
                    min={0}
                    {...form.getInputProps("totalChapter")}
                    error={form.errors.totalChapter}
                />
                <CustomTextInput
                    label="Phiên bản/ Lần xuất bản"
                    {...form.getInputProps("version")}
                    error={form.errors.version}
                />
            </Stack>
        );
    });

TabBookPublication.displayName = 'TabBookPublication'
export default TabBookPublication;