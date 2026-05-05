
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I6_2_3_1Decision } from "./F6_2_3_1Read"

export default function F6_2_3_1UpdateDecision(
    { values }: { values: I6_2_3_1Decision }
) {
    const form = useForm<I6_2_3_1Decision>({
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
                    label="Tên đề tài"
                    {...form.getInputProps("researchName")} // Field for 'researchName'
                />
                <MyTextInput
                    label="Tên nhóm nghiên cứu"
                    {...form.getInputProps("groupName")} // Field for 'groupName'
                />
                <MyTextInput
                    label="Trưởng nhóm"
                    {...form.getInputProps("leader")} // Field for 'leader'
                />
                <MyTextInput
                    label="Số điện thoại"
                    {...form.getInputProps("phoneNumber")} // Field for 'phoneNumber'
                />
                <MyTextInput
                    label="Email"
                    {...form.getInputProps("email")} // Field for 'email'
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

