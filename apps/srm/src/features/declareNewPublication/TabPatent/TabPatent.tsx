import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useImperativeHandle } from "react";

interface TabPatentVenueProps {
    values?: SRMPublicationDeclaration;
}
export interface TabPatentVenueFormHandle {
    getValues: () => SRMPublicationDeclaration;
    validate: () => ReturnType<ReturnType<typeof useForm<SRMPublicationDeclaration>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}


const TabPatent = forwardRef<TabPatentVenueFormHandle, TabPatentVenueProps>(
    ({ values }, ref) => {
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
                <CustomTextInput
                    label="Số bằng độc quyền"
                    {...form.getInputProps("patentNumber")}
                    error={form.errors.patentNumber}
                />
                <CustomDateInput
                    label="Ngày cấp bằng"
                    {...form.getInputProps("grantDate")}
                    error={form.errors.grantDate}
                />
                <CustomTextInput
                    label="Đơn vị cấp bằng"
                    {...form.getInputProps("issuingAuthority")}
                    error={form.errors.issuingAuthority}
                />
                <CustomTextInput
                    label="Phạm vi bảo hộ"
                    {...form.getInputProps("protectionScope")}
                    error={form.errors.protectionScope}
                />
            </Stack>
        );
    }
)

TabPatent.displayName = "TabPatent";
export default TabPatent;