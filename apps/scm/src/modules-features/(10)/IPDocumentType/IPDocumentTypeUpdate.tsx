'use client'
import { MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IPDocumentType } from "./IPDocumentTypeLayout";


export default function IPDocumentTypeUpdate({ values }: { values: IPDocumentType }) {
    const form = useForm<IPDocumentType>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Cập nhật tài liệu" form={form} onSubmit={() => { }}>
            <MultiSelect
                label="Loại SHTT"
                defaultValue={values.type.split('/').map((s) => s.trim())}
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
            <MySelect
                label="Giai đoạn"
                data={[
                    { value: "Đăng ký / Nộp đơn", label: "Đăng ký / Nộp đơn" },
                    { value: "Pháp lý / Xử lý", label: "Pháp lý / Xử lý" },
                    { value: "Duy trì / Khai thác", label: "Duy trì / Khai thác" },
                ]}
                {...form.getInputProps("purpose")}
            />
            <MyTextInput label="Tên tài liệu" {...form.getInputProps("name")} />
            <MyTextArea label="Mô tả" {...form.getInputProps("description")} />
            <MyTextInput label="Định dạng" {...form.getInputProps("formats")} />
        </MyActionIconUpdate>
    )
}
