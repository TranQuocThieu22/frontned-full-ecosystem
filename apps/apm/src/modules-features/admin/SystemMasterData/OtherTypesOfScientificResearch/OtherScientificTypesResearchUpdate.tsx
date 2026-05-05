'use client'
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyNumberInput, MyTextInput } from "aq-fe-framework/components";
import { OtherScientificTypesResearch } from "./OtherScientificTypesResearchLayout";

export default function OtherScientificTypesResearchUpdate({ values }: { values: OtherScientificTypesResearch }) {
    const form = useForm<OtherScientificTypesResearch>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Cập nhật loại nhiệm vụ NCKH khác" form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã loại nhiệm vụ" {...form.getInputProps("code")} />
            <MyTextInput label="Tên loại nhiệm vụ" {...form.getInputProps("name")} />
            <MyNumberInput label="Số giờ/ trang" {...form.getInputProps("hours")} />
            <MyNumberInput label="Số điểm" {...form.getInputProps("score")} />
            <Checkbox label="Tự kê khai" />
            <Textarea label="Ghi chú" {...form.getInputProps("notes")} />
            <Checkbox label="Ngừng sử dụng" />
        </MyActionIconUpdate>
    )
}
