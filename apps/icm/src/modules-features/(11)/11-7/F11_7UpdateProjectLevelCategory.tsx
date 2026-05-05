'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { I11_7ProjectLevelCategory } from "./F11_7ReadProjectLevelCategory";

export default function F11_7UpdateProjectLevelCategory({ values }: { values: I11_7ProjectLevelCategory }) {
    const form = useForm<I11_7ProjectLevelCategory>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={() => {
            // return baseAxios.post("/SystemCatalogProjectLevelCategory/CreateOrUpdate", {
            //     "id": values.id,
            //     "code": form.values.code,
            //     "name": form.values.name,
            //     "notes": form.values.notes,
            //     "IsEnabled": true
            // })

        }}
            title="Cập nhật cấp đề tài"
        >
            <MyTextInput label="Mã cấp đề tài" {...form.getInputProps("code")} />
            <MyTextInput label="Tên cấp đề tài" {...form.getInputProps("name")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
            <Checkbox label='Ngừng sử dụng'></Checkbox>
        </MyActionIconUpdate>
    )
}
