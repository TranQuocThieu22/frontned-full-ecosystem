'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

export interface I6_5_1_1ListOfTopic {
    id?: number;
    topicCode?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
}

export default function UpdateTopicForm({ values }: { values: I6_5_1_1ListOfTopic }) {
    const form = useForm<I6_5_1_1ListOfTopic>({
        initialValues: {
            id: values.id,
            topicCode: values.topicCode || "",
            topicName: values.topicName || "",
            groupName: values.groupName || "",
            leaderName: values.leaderName || "",
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => console.log(values)} modalSize="50%">
            <MyTextInput label="Mã đề tài" placeholder="Nhập mã đề tài" {...form.getInputProps('topicCode')} />
            <MyTextInput label="Tên đề tài" placeholder="Nhập tên đề tài" {...form.getInputProps('topicName')} />
            <MyTextInput label="Tên nhóm nghiên cứu" placeholder="Nhập tên nhóm nghiên cứu" {...form.getInputProps('groupName')} />
            <MyTextInput label="Trưởng nhóm" placeholder="Nhập tên trưởng nhóm" {...form.getInputProps('leaderName')} />
        </MyActionIconUpdate>
    );
}
