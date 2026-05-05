"use client"
import { MyButtonCreateUpdate } from "@/core";
import { useForm } from "@mantine/form";

export default function Page() {
    const form = useForm()
    return (
        <MyButtonCreateUpdate
            form={form}
            isUpdate
            onSubmit={() => { }}
        />
    )
}
