'use client'

import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";

interface IDocumentRepositoryCreate {
    documentName?: string;
    documentType?: string;
    description?: string;
}

export default function DocumentRepositoryCreate() {
    const form = useForm<IDocumentRepositoryCreate>({
        initialValues: {
            documentName: "",
            documentType: "",
            description: "",
        },
    })
    return (
        <MyButtonCreate modalSize={"xl"} objectName="tài liệu" form={form} onSubmit={() => {

        }}>
            <MyTextInput label="Tên tài liệu" {...form.getInputProps("documentName")} />
            <Group flex={1}>
                <MySelect
                    flex={1}
                    label="Loại tài liệu"
                    data={[
                        { value: 'Bản toàn văn', label: 'Bản toàn văn' },
                        { value: 'Minh chứng bằng cấp', label: 'Minh chứng bằng cấp' },
                        { value: 'Liên kết từ NCKH', label: 'Liên kết từ NCKH' },
                        { value: 'Minh chứng xuất bản', label: 'Minh chứng xuất bản' },
                        { value: 'Tài liệu hội nghị', label: 'Tài liệu hội nghị' },
                        { value: 'Hướng dẫn', label: 'Hướng dẫn' },
                        { value: 'Quy định', label: 'Quy định' },
                        { value: 'Quy trình', label: 'Quy trình' },
                        { value: 'Biểu mẫu', label: 'Biểu mẫu' },
                    ]}
                    {...form.getInputProps("documentType")}
                ></MySelect>
                <MyFileInput flex={1} label="Tải bản thay thế" />
            </Group>
            <MyTextArea label="Mô tả" {...form.getInputProps("description")} />
        </MyButtonCreate>
    )
}
