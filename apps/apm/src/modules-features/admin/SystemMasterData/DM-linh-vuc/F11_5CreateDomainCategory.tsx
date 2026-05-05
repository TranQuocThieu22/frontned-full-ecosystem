'use client'
import baseAxios from "@/api/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { I11_5DomainCategory } from "./F11_5ReadDomainCategory";

export default function F11_5CreateDomainCategory() {
    const form = useForm<I11_5DomainCategory>({
        initialValues: {
            code: "",
            name: "",
            notes: ""
        }
    })
    return (
        <MyButtonCreate objectName="danh mục lĩnh vực" form={form} onSubmit={() => {
            return baseAxios.post("/SystemCatalogDomainCategory/CreateOrUpdate", form.values)
        }}>
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Tên" {...form.getInputProps("name")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("notes")} />
        </MyButtonCreate>
    )
}
