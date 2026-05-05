'use client'
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { MyButtonCreate } from "aq-fe-framework/components";
import { I11_7ProjectLevelCategory } from "./F11_7ReadProjectLevelCategory";

export default function F11_7CreateProjectLevelCategory() {
    const form = useForm<I11_7ProjectLevelCategory>({
        initialValues: {
            code: "",
            name: "",
            notes: ""
        }
    })
    return (
        <MyButtonCreate title="Tạo cấp đề tài" form={form} onSubmit={() => {
            // return baseAxios.post("/SystemCatalogProjectLevelCategory/CreateOrUpdate", form.values)
        }}>
            <MyTextInput label="Mã cấp đề tài" {...form.getInputProps("code")} />
            <MyTextInput label="Tên cấp đề tài" {...form.getInputProps("name")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyButtonCreate>
    )
}
