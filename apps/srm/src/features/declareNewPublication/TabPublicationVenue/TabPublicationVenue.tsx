import { SRMJournal } from "@/shared/interfaces/SRMJournal";
import { SRMPublicationDeclaration } from "@/shared/interfaces/SRMPublicationDeclaration";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Flex, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useImperativeHandle } from "react";
import TabPublicationVenueCreateModal from "./TabPublicationVenueCreateModal";


interface TabPublicationVenueProps {
    values?: SRMPublicationDeclaration;
}
export interface TabPublicationVenueFormHandle {
    getValues: () => SRMPublicationDeclaration;
    validate: () => ReturnType<ReturnType<typeof useForm<SRMPublicationDeclaration>>['validate']>;
    resetForm: () => void;
    isDirty: () => boolean;
    setErrors: (errors: Record<string, string>) => void;
}

const TabPublicationVenue = forwardRef<TabPublicationVenueFormHandle, TabPublicationVenueProps>(
    ({ values }, ref) => {
        const form = useForm<SRMPublicationDeclaration>({
            mode: 'uncontrolled',
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

        const handleAdd = (values: SRMJournal) => {
            form.setFieldValue("journal", values.name);
        }

        return (
            <Stack>
                <Flex direction={'row'} align={'end'} gap={'4'}>
                    <CustomTextInput
                        w={'100%'}
                        label="Tạp chí/ Nhà xuất bản"
                        {...form.getInputProps("journal")}
                        error={form.errors.journal}
                    />
                    <TabPublicationVenueCreateModal handleAdd={handleAdd} />
                </Flex>
                <CustomTextInput
                    label="ISN/ISBN"
                    {...form.getInputProps("issn")}
                    error={form.errors.issn}
                />
                <CustomTextInput
                    label="Cơ sở dữ liệu chỉ mục"
                    {...form.getInputProps("databaseIndex")}
                    error={form.errors.databaseIndex}
                />
                <CustomTextInput
                    label="Chỉ số tác động (Impact Factor)"
                    {...form.getInputProps("impactFactor")}
                    error={form.errors.impactFactor}
                />
            </Stack>
        );
    }
)

TabPublicationVenue.displayName = "TabPublicationVenue";
export default TabPublicationVenue;