'use client'
import baseAxios from "@/api/baseAxios";
import { Checkbox, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyNumberInput, MyTextInput } from "aq-fe-framework/components";
import { TopicDetail } from "./StudentGuideDocsRead";

export default function StudentGuideDocsCreate() {
    const form = useForm<TopicDetail>({

    })
    return (
        <MyButtonCreate title="Tạo loại đề tài hướng dẫn sinh viên" form={form} onSubmit={() => {
            return baseAxios.post("/SystemCatalogProjectTypeCategory/CreateOrUpdate", form.values)
        }}>
            <MyTextInput label="Mã loại đề tài" {...form.getInputProps("topicTypeCode")} />
            <MyTextInput label="Tên loại đề tài" {...form.getInputProps("topicTypeName")} />
            <Select
                label="Cấp đề tài"
                data={[
                    { value: '1', label: 'KH - Cấp Khoa' },
                    { value: '2', label: 'TR - Cấp Trường' },
                ]}
                defaultValue={'1'}
            ></Select>
            <MyNumberInput
                label="Số giờ"
                {...form.getInputProps("hours")}
            />
            <MyNumberInput
                label="Số điểm"
                {...form.getInputProps("score")}
            />
            <Textarea label="Ghi chú" {...form.getInputProps("notes")} />
            <Checkbox label="Ngưng sử dụng"></Checkbox>
        </MyButtonCreate>
    )
}
