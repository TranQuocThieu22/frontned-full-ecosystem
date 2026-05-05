'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate"
import { Checkbox, Flex, Group, Text, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"


export default function F_jdtonxkhjl_Create(
) {
    const form = useForm<any>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            code: "",
        },

    })
    return (
        <MyButtonCreate title="Duyệt nghỉ dạy" form={form} onSubmit={() => { }}>
            
        </MyButtonCreate>
    )
}


