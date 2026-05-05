'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Checkbox, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyNumberInput } from "aq-fe-framework/components";
import { PostType } from "./PostTypeRead";

export default function PostTypeUpdate({ values }: { values: PostType }) {
    const form = useForm<PostType>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate  title="Cập nhật loại bài đăng" form={form} onSubmit={() => {

        }}>
            <MyTextInput label="Mã loại bài đăng" {...form.getInputProps("code")} />
            <MyTextInput label="Tên loại bài đăng" {...form.getInputProps("name")} />
            <Select
                label="Phân loại bài đăng"
                data={[
                    { value: '1', label: 'TC - tạp chí' },
                    { value: '2', label: 'KY - Kỷ yếu' },
                    { value: '3', label: 'TL - Tham luận' },
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
