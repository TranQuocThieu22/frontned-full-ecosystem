import { roleService } from "@aq-fe/aq-legacy-framework/shared/APIs/roleService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate";
import { appConfig } from "@aq-fe/aq-core-framework/shared/configs/appConfig";
import { Role } from "@aq-fe/aq-legacy-framework/shared/interfaces/Role";
import { useAuthenticateStore } from "@aq-fe/aq-legacy-framework/shared/stores/useAuthenticateStore";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function RolesCreateUpdate({ values, disabled }: { values?: Role, disabled?: boolean }) {
    const authenticateStore = useAuthenticateStore()
    const isUpdate = !!values;
    const form = useForm<Role>({
        mode: "uncontrolled",
        validate: {
            code: (values) => values ? null : "Không được để trống",
            name: (values) => values ? null : "Không được để trống",
        },
    });
    useEffect(() => {
        if (!values) return
        form.setValues(values)
        form.setInitialValues(values)
    }, [values])
    return (
        <CustomButtonCreateUpdate
            actionIconProps={{
                disabled: disabled
            }}
            form={form}
            isUpdate={isUpdate}
            onSubmit={(formValues) => {
                if (isUpdate) return roleService.update(formValues.id!, formValues)
                return roleService.create({
                    ...formValues,
                    isGlobal: false,
                    tenantId: authenticateStore.state.tenantId,
                    category: appConfig.CATEGORY
                })
            }}
            modalProps={{
                size: "lg",
                title: "Chi tiết vai trò",
            }}
        >
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <CustomTextInput
                    label="Mã vai trò"
                    {...form.getInputProps("code")}
                    readOnly={isUpdate}
                    withAsterisk={!isUpdate}
                />
                <CustomTextInput
                    label="Tên vai trò"
                    {...form.getInputProps("name")}
                    withAsterisk
                />
            </SimpleGrid>
            <CustomTextArea
                label="Mô tả"
                {...form.getInputProps("description")}
            />
        </CustomButtonCreateUpdate>
    )
}
