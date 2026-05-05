'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { useForm } from "@mantine/form";

import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { IListOfTopic } from "./F6_2_3_1CreateReviewCommitteeMembersOutline";


export default function F6_2_3_1UpdateListOfTopics({ values }: { values: IListOfTopic }) {
    const form = useForm<IListOfTopic>({
        initialValues: {
            code: "",
            topicName: "",
            groupName: "",
            leaderName: "",
            telephone: "",
            email: ""
        }
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize={"100%"}>
            <MyTextInput
                label="Mã đề tài"
                placeholder="Nhập đề tài"
                {...form.getInputProps('topicCode')}
            />
            <MyTextInput
                label="Tên đề tài"
                placeholder="Nhập tên đề tài"
                {...form.getInputProps('topicName')}
            />

            <MyTextInput
                label="Tên nhóm nghiên cứu"
                placeholder="Nhập tên nhóm nghiên cứu"
                {...form.getInputProps('groupName')}
            />
            <MyTextInput
                label="Tên trưởng nhóm"
                placeholder="Nhập tên trưởng nhóm"
                {...form.getInputProps('leaderName')}
            />
            <MyTextInput
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"

            />
            <MyTextInput
                label="Email"
                placeholder="Nhập email"

            />
        </MyActionIconUpdate>
    );
}
