'use client'
import baseAxios from "@/api/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I {
    code?: string,
    name?: string,
    AQModuleId: number,
}

export default function F_7ud2a06y19_Create() {
    const form = useForm<I>({
        initialValues: {
            code: "",
            name: "",
            AQModuleId: parseInt(process.env.NEXT_PUBLIC_AQ_MODULE_ID!)
        },
        validate: (values) => ({
            code: !values.code ? "Không được để trống" : undefined,
            name: !values.name ? "Không được để trống" : undefined,
        })
    })
    return (
        <MyButtonCreate form={form} onSubmit={async () => await baseAxios.post('/Role/Create', form.values)}>
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Tên quyền" {...form.getInputProps("name")} />
        </MyButtonCreate>
    )
}
