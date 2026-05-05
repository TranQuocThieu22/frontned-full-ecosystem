'use client'
import baseAxios from "@/api/config/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I {
    id?: number,
    code?: string,
    name?: string,
    aqModuleId?: number,
}

export default function F_7ud2a06y19_Update({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: {
            code: values.code,
            name: values.name,
            aqModuleId: values.aqModuleId,
            id: values.id
        }
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={async () => await baseAxios.post('/Role/Update', form.values)}>
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Tên" {...form.getInputProps("name")} />
        </MyActionIconUpdate>
    )
}
