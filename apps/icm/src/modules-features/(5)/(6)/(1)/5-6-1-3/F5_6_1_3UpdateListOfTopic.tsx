'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { I5_6_1_3ListOfTopic } from "./F5_6_1_3CreateCommitteeScoringResultsSummary";



export default function F5_5_3UpdateProjectAdjustment({ values }: { values: I5_6_1_3ListOfTopic }) {
    const form = useForm<I5_6_1_3ListOfTopic>({
        initialValues: {
            ...values,
        },
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyTextInput label="Mã đề tài" {...form.getInputProps("code")} />
            <MyTextInput label="Tên đề tài" {...form.getInputProps("topicName")} />
            <MyTextInput label="Chủ nhiệm" {...form.getInputProps("leaderName")} />
            <MyNumberInput label="Điểm trung bình" {...form.getInputProps("point")} />
            <MyTextInput label="Xếp loại" {...form.getInputProps("rank")} />
        </MyActionIconUpdate>

    )
}