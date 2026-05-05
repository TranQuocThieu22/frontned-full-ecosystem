
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I7_2_2_1Member } from "./F7_4_1_1CreateDecision"

export default function F7_4_1_1UpdateMember(
    { values }: { values: I7_2_2_1Member }
) {
    const form = useForm<I7_2_2_1Member>({
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
                    {...form.getInputProps("memberCode")}  // Maps to 'memberCode'
                />
                <MyTextInput
                    label="Họ tên"
                    {...form.getInputProps("memberName")}  // Maps to 'memberName'
                />
                <MyTextInput
                    label="Chức vụ hội đồng"
                    {...form.getInputProps("position")}  // Maps to 'position'
                />
                <MyFileInput
                    label="Lý lịch"
                    placeholder="Chọn file"
                    {...form.getInputProps("file")}  // Maps to 'file'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

