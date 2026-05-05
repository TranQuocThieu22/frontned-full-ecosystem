'use client'
import baseAxios from "@/api/baseAxios"
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"
interface I {
    id?: number, name?: string, code?: string
}
export default function F12_1Update(
    { values }: { values: I }
) {
    const form = useForm({
        initialValues: values
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={async (values) => await baseAxios.post("/DocumentAttribute/Update", values)}>
            <MyTextInput label="Mã loại văn bản" {...form.getInputProps("code")} />
            <MyTextInput label="Tên loại văn bản" {...form.getInputProps("name")} />
        </MyActionIconUpdate>
    )
}
