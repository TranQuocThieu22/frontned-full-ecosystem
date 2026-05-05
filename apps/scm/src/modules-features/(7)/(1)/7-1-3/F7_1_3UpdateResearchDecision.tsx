
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I7_1_3DecisionData } from "./F7_1_3ReadResearchDecision"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"

export default function F7_1_3ResearchDecision(
    { values }: { values: I7_1_3DecisionData }
) {
    const form = useForm<I7_1_3DecisionData>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => {
            }}
        >
            <MyFlexColumn>
                <MyTextInput
                    label="Số quyết định"
                    placeholder="Nhập số quyết định"
                    {...form.getInputProps("decisionNumber")}
                />
                <MyDateInput
                    label="Ngày quyết định"
                    placeholder="Nhập ngày ban hành"
                    {...form.getInputProps("decisionDate")}
                />
                <MyTextInput
                    label="Tên quyết định"
                    placeholder="Nhập tên quyết định"
                    {...form.getInputProps("decisionName")} // Corrected from 'decisonName' to 'decisionName'
                />
                <MyFileInput
                    label="File quyết định"
                    placeholder="Chọn file"
                    {...form.getInputProps("decisionFile")}
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

