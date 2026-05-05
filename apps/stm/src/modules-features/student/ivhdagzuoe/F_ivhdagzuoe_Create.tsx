'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"
interface I {
    name?: string,
    code?: string,
    documentType?: number
}

export default function F_ivhdagzuoe_Create(
) {
    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            code: "",
        },
        validate: {
            name: (value) => value ? null : 'Không được để trống'
        }
    })
    return (
        <MyButtonCreate objectName="Loại văn bản" form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã loại văn bản" {...form.getInputProps("code")} />
            <MyTextInput label="Tên loại văn bản" {...form.getInputProps("name")} />
        </MyButtonCreate>
    )
}


