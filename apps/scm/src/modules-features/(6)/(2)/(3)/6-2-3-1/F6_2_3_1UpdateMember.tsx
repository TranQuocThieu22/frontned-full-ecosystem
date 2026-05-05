
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I6_2_3_1Member } from "./F6_2_3_1Create"

export default function F6_2_3_1UpdateMember(
    { values }: { values: I6_2_3_1Member }
) {
    const form = useForm<I6_2_3_1Member>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
            <MyTextInput
                    label="Mã giảng viên"
                    placeholder="Nhập mã giảng viên"
                    {...form.getInputProps("teacherNumber")} // Maps to 'teacherNumber'
                />
                <MyTextInput
                    label="Họ và tên"
                    placeholder="Nhập họ và tên"
                    {...form.getInputProps("name")} // Maps to 'name'
                />
                <MyTextInput
                    label="Chức vụ hội đồng"
                    placeholder="Nhập chức vụ hội đồng"
                    {...form.getInputProps("position")} // Maps to 'position'
                />
                <MyFileInput
                    label="Lý lịch"
                    placeholder="Chọn file lý lịch"
                    {...form.getInputProps("file")} // Maps to 'file'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

