'use client'
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyTextInput } from "aq-fe-framework/components";
import { RoleImplementTopic } from "./RoleImplementTopicLayout";

export default function RoleImplementTopicUpdate({ values }: { values: RoleImplementTopic }) {
    const form = useForm<RoleImplementTopic>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Cập nhật vai trò thực hiện đề tài" form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã vai trò" {...form.getInputProps("code")} />
            <MyTextInput label="Tên vai trò" {...form.getInputProps("name")} />
            <Textarea label="Ghi chú" {...form.getInputProps("notes")} />
            <Checkbox label="Ngừng sử dụng" />
        </MyActionIconUpdate>
    )
}
