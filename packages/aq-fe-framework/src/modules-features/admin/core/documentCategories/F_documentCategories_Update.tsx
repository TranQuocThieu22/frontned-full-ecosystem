'use client'
import { documentAttributeService } from "@/APIs/documentAttributeService"
import { MyActionIconUpdate } from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import { useForm } from "@mantine/form"
import { MyTextInput } from "../../../../core"
interface I {
    id?: number, name?: string, code?: string
}
export function F_documentCategories_Update(
    { values }: { values: I }
) {
    const form = useForm({
        initialValues: values,
        validate: {
            code: (value) => value ? null : "Không được để trống",
            name: (value) => value ? null : 'Không được để trống'
        }
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => documentAttributeService.update(values)}>
            <MyTextInput readOnly label="Mã loại văn bản" {...form.getInputProps("code")} />
            <MyTextInput label="Tên loại văn bản" {...form.getInputProps("name")} />
        </MyActionIconUpdate>
    )
}
