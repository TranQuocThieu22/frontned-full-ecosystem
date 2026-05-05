'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { I11_5DomainCategory } from "./F11_5ReadDomainCategory";

export default function F11_5UpdateDomainCategory({ values }: { values: I11_5DomainCategory }) {
    const form = useForm<I11_5DomainCategory>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate
            form={form} onSubmit={() => baseAxios.post("/SystemCatalogDomainCategory/CreateOrUpdate", {
                "id": values.id,
                "code": form.values.code,
                "name": form.values.name,
                "notes": form.values.notes,
                "IsEnabled": true
            })}
        >
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Tên" {...form.getInputProps("name")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyActionIconUpdate>
    )
}
