'use client'
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyTextInput } from "aq-fe-framework/components";
import { RoleMakePost } from "./RoleMakePostLayout";

export default function RoleMakePostUpdate({ values }: { values: RoleMakePost }) {
    const form = useForm<RoleMakePost>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Cập nhật vai trò thực hiện bài đăng" form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã vai trò" {...form.getInputProps("code")} />
            <MyTextInput label="Tên vai trò" {...form.getInputProps("name")} />
            <Textarea label="Ghi chú" {...form.getInputProps("notes")} />
            <Checkbox label="Ngừng sử dụng" />
        </MyActionIconUpdate>
    )
}
