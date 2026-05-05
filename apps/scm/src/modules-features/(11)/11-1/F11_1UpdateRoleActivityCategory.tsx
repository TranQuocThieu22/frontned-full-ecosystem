'use client'
import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm } from "@mantine/form"
interface Role {
    id?: number;
    code?: string | undefined;
    name?: string | undefined;
    concurrencyStamp?: string | undefined;
    isEnabled?: boolean;
    notes?: string | undefined;
}
export default function F11_1UpdateRoleActivityCategory(
    { values }: { values: Role }
) {
    const form = useForm<Role>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={() => {
                return baseAxios.post("/role/update", {
                    "id": values.id,
                    "code": form.values.code,
                    "name": form.values.name
                })
            }}
        >
            <MyFlexColumn>
                <MyTextInput label="Mã vai trò" {...form.getInputProps("code")} />
                <MyTextInput label="Tên vai trò" {...form.getInputProps("name")} />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}
