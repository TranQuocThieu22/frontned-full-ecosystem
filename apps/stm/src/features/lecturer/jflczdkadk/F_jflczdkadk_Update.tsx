'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useForm } from "@mantine/form"
interface I {
    id?: number, name?: string, code?: string
}
export default function F_jflczdkadk_Update(
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
