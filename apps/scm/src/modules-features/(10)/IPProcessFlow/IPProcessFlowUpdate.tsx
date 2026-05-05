'use client'
import { MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { I_IPProcessFlow } from "./IPProcessFlowLayout";

export default function IPProcessFlowUpdate({ values }: { values: I_IPProcessFlow }) {
    const form = useForm<I_IPProcessFlow>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate
            title="Cập nhật quy trình"
            form={form}
            onSubmit={() => { }}
            modalSize="50%"
        >
            <MyTextInput label="Mã quy trình" {...form.getInputProps("code")} />
            <MyTextInput label="Tên quy trình" {...form.getInputProps("name")} />
            <MultiSelect
                label="Loại SHTT"
                defaultValue={values.type.split(',').map((s) => s.trim())}
                data={[
                    "Bằng sáng chế",
                    "Giải pháp hữu ích",
                    "Kiểu dáng công nghiệp",
                    "Nhãn hiệu",
                    "Bản quyền tác giả",
                    "Quyền liên quan đến quyền tác giả",
                    "Chỉ dẫn địa lý",
                    "Tên thương mại",
                    "Bí mật kinh doanh"
                ]}
            />
            <MyTextInput label="Phiên bản" {...form.getInputProps("version")} />
            <MyDateInput label="Ngày tạo" {...form.getInputProps("createdAt")} />
            <MyTextArea label="Mô tả" {...form.getInputProps("description")} />
        </MyActionIconUpdate>
    )
}
