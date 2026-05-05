'use client'
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I {
    code?: string,
    name?: string,
    notes?: string
}

export default function UpdateTemplate({ values }: { values: I }) {
    const form = useForm<I>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Tên" {...form.getInputProps("name")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyActionIconUpdate>
    )
}
