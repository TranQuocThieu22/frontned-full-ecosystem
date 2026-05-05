'use client'
import baseAxios from "@/api/baseAxios"
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { U0MyValidateEmpty } from "@/utils/validateForm"
import { useForm } from "@mantine/form"

interface Role {
    id?: number;
    code?: string | undefined;
    name?: string | undefined;
    concurrencyStamp?: string | undefined;
    isEnabled?: boolean;
    notes?: string | undefined;
}
export default function F11_1CreateRoleActivityCategory() {

    const form = useForm<Role>({
        initialValues: {
            code: "",
            name: "",
        },
        validate: {
            code: U0MyValidateEmpty(),
            name: U0MyValidateEmpty(),
        }
    })
    return (
        <MyButtonCreate
            objectName="Danh mục vai trò hoạt động"
            form={form}
            onSubmit={() => {
                return baseAxios.post("/role/create", form.values)
            }}
        >
            <MyTextInput label="Mã vai trò" {...form.getInputProps("code")} />
            <MyTextInput label="Tên vai trò" {...form.getInputProps("name")} />
        </MyButtonCreate>
    )
}
