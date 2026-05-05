
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I6_1_6Decision } from "./F6_1_6Read"

export default function F6_1_6UpdateDecision(
    { values }: { values: I6_1_6Decision }
) {
    const form = useForm<I6_1_6Decision>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
            <MyTextInput
                    label="Số quyết định"
                    {...form.getInputProps("decisionNumber")} // Field for 'decisionNumber'
                />
                <MyTextInput
                    label="Ngày quyết định"
                    {...form.getInputProps("decidedDate")} // Field for 'decidedDate'
                />
                <MyTextInput
                    label="Tên quyết định"
                    {...form.getInputProps("decisionName")} // Field for 'decisionName'
                />
                <MyTextInput
                    label="Tên nhóm nghiên cứu"
                    {...form.getInputProps("groupName")} // Field for 'groupName'
                />
                <MyFileInput
                    label="File quyết định"
                    placeholder="Chọn file"
                    {...form.getInputProps("file")} // Field for 'file'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

