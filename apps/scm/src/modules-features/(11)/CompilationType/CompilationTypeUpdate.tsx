'use client'
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyNumberInput, MyTextInput } from "aq-fe-framework/components";
import { CompilationType } from "./CompilationTypeRead";

export default function CompilationTypeUpdate({ values }: { values: CompilationType }) {
    const form = useForm<CompilationType>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Cập nhật loại biên soạn sách, giáo trình" form={form} onSubmit={() => {

        }}>
            <MyTextInput label="Mã loại biên loại" {...form.getInputProps("code")} />
            <MyTextInput label="Tên loại biên" {...form.getInputProps("name")} />
            <MyNumberInput
                label="Số giờ/trang"
                {...form.getInputProps("hours")}
            />
            <MyNumberInput
                label="Số điểm"
                {...form.getInputProps("score")}
            />
            <Textarea label="Ghi chú" {...form.getInputProps("notes")} />
            <Checkbox label="Ngưng sử dụng"></Checkbox>
        </MyActionIconUpdate>
    )
}
