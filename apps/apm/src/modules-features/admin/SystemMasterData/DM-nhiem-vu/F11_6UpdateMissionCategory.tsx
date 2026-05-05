'use client'
import baseAxios from "@/api/baseAxios";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { I11_6MissionCategory } from "./F11_6ReadMissionCategory";

export default function F11_6UpdateMissionCategory({ values }: { values: I11_6MissionCategory }) {
    const form = useForm<I11_6MissionCategory>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Oke" form={form} onSubmit={() => {
            return baseAxios.post("/SystemCatalogTaskCategory/CreateOrUpdate", {
                "id": values.id,
                "code": form.values.code,
                "name": form.values.name,
                "notes": form.values.notes,
                "Type": form.values.type,
                "Hours": form.values.hours,
                "IsEnabled": true
            })
        }}>
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Tên" {...form.getInputProps("name")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
            <MyTextInput label="Loại nhiệm vụ" {...form.getInputProps("type")} />
            <MyTextInput label="Số giờ" {...form.getInputProps("hours")} />
        </MyActionIconUpdate>
    )
}
