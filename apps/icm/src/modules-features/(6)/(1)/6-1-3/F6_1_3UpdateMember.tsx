
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I6_1_3Member } from "./F6_1_3Create"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"

export default function I6_1_3UpdateMember(
    { values }: { values: I6_1_3Member }
) {
    const form = useForm<I6_1_3Member>({
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
                    {...form.getInputProps("teacherNumber")} // Maps to 'teacherNumber'
                />
                <MyTextInput
                    label="Họ và tên"
                    {...form.getInputProps("name")} // Maps to 'name'
                />
                <MyTextInput
                    label="Chức vụ hội đồng"
                    {...form.getInputProps("position")} // Maps to 'position'
                />
                <MyFileInput
                    label="Lý lịch"
                    placeholder="Chọn file"
                    {...form.getInputProps("file")} // Maps to 'file'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

