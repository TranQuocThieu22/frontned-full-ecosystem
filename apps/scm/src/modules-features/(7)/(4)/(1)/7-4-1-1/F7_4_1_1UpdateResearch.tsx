
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { useForm, UseFormReturnType } from "@mantine/form"
import { I7_4_1_1Research } from "./F7_4_1_1CreateDecision"

export default function F7_4_1_1UpdateResearch(
    { values }: { values: I7_4_1_1Research }
) {
    const form = useForm<I7_4_1_1Research>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
            <MyTextInput
                    label="Mã đề tài"
                    {...form.getInputProps("researchCode")}  // Maps to 'researchCode'
                />
                <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("researchName")}  // Maps to 'researchName'
                />
                <MyTextInput
                    label="Chủ nhiệm đề tài"
                    {...form.getInputProps("researchLeader")}  // Maps to 'researchLeader'
                />
                <MyTextInput
                    label="Cố vấn"
                    {...form.getInputProps("advisor")}  // Maps to 'advisor'
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

