'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Checkbox, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyNumberInput } from "aq-fe-framework/components";
import { TopicDetail } from "./StudentGuideDocsRead";

export default function StudentGuideDocsUpdate({ values }: { values: TopicDetail }) {
    const form = useForm<TopicDetail>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Cập nhật loại đề tài hướng dẫn sinh viên" form={form} onSubmit={() => {

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
        </MyActionIconUpdate>
    )
}
