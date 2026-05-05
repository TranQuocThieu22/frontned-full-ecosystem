'use client'
import { useForm } from "@mantine/form"

import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { I6_5_1_1ListOfTopic } from "./F5_6_1_1CreateProjectReviewCommitteeMembers"

export default function F6_5_1_1UpdateListOfTopics({ values }: { values: I6_5_1_1ListOfTopic }) {
    const form = useForm<I6_5_1_1ListOfTopic>({
        initialValues: {
            ...values,
        }
    })
    return (
        <MyActionIconUpdate onSubmit={() => { }} modalSize={"100%"} form={form} >
            <MyTextInput label="Mã đề tài" {...form.getInputProps("code")} />
            <MyTextInput label="Tên đề tài" {...form.getInputProps("topicname")} />
            <MyTextInput label="Chủ nhiệm đề tài" {...form.getInputProps("leaderName")} />
        </MyActionIconUpdate>
    )
}