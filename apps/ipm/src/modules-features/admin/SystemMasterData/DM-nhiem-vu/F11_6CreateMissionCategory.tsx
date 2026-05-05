'use client'
import baseAxios from "@/api/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { I11_6MissionCategory } from "./F11_6ReadMissionCategory";

export default function F11_6CreateMissionCategory() {
    const form = useForm<I11_6MissionCategory>({
        initialValues: {
            code: "",
            name: "",
            notes: "",
            type: "",
            hours: 0,
        }
    })
    return (
        <MyButtonCreate objectName="danh mục nhiệm vụ" form={form} onSubmit={() => {
            return baseAxios.post("/SystemCatalogTaskCategory/CreateOrUpdate", form.values)
        }}>
            <MyTextInput label="Mã" {...form.getInputProps("code")} />
            <MyTextInput label="Tên" {...form.getInputProps("name")} />
            <MyTextInput label="Loại nhiệm vụ" {...form.getInputProps("type")} />
            <MyTextInput label="Số giờ" {...form.getInputProps("hours")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyButtonCreate>
    )
}

