
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I6_1_7Member } from "./F6_1_7Create"


export default function F6_1_7UpdateMember(
    { values }: { values: I6_1_7Member }
) {
    const form = useForm<I6_1_7Member>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
            <MyTextInput
                    label="Mã thành viên"
                    {...form.getInputProps("memberNumber")} // Field for 'memberNumber'
                />
                <MyTextInput
                    label="Họ tên"
                    {...form.getInputProps("name")} // Field for 'name'
                />
                <MyTextInput
                    label="Chức vụ"
                    {...form.getInputProps("position")} // Field for 'position'
                />
                <MyTextInput
                    label="Thù lao"
                    {...form.getInputProps("amount")} // Field for 'amount'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

