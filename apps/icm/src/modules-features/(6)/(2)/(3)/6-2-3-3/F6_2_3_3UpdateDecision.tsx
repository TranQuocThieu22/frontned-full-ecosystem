
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I6_2_3_3Decision } from "./F6_2_3_3Read"

export default function F6_2_3_3UpdateDecision(
    { values }: { values: I6_2_3_3Decision }
) {
    const form = useForm<I6_2_3_3Decision>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
            <MyTextInput
                    label="Số quyết định hội đồng xét duyệt đề cương"
                    {...form.getInputProps("decisionNumber")} // Field for 'decisionNumber'
                />
                <MyTextInput
                    label="Mã đề tài"
                    {...form.getInputProps("researchId")} // Field for 'decidedDate'
                />
                <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("researchTitle")} // Field for 'decisionName'
                />
                
                <MyTextInput
                    label="Tên nhóm nghiên cứu"
                    {...form.getInputProps("researchGroupName")} // Field for 'researchGroupName'
                />
                <MyTextInput
                    label="Trưởng nhóm"
                    {...form.getInputProps("leaderName")} // Field for 'leaderName'
                />
                <MyTextInput
                    label="Điểm trung bình"
                    {...form.getInputProps("averageScore")} // Field for 'averageScore'
                />
                <MyFileInput
                    label="File biên bản"
                    placeholder="Choose file"
                    {...form.getInputProps("minutesFile")} // Field for 'minutesFile'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

