'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { ReactNode, useEffect } from "react";

interface I {
    code?: string,
    name?: string,
    notes?: string
}

export default function FormTemplate({ values }: { values?: I }) {
    const form = useForm<I>({
        mode: "uncontrolled"
    })
    useEffect(() => {
        if (!values) return
        form.setInitialValues(values)
        form.setValues(values)
    }, [values])

    function Boundary({ children }: { children?: ReactNode }) {
        if (values) return (
            <MyActionIconUpdate form={form} onSubmit={() => { }}>
                {children}
            </MyActionIconUpdate>
        )
        return (
            <MyButtonCreate form={form} onSubmit={() => { }}>
                {children}
            </MyButtonCreate>
        )
    }
    return (
        <Boundary>
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Tên" {...form.getInputProps("name")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </Boundary>
    )
}
