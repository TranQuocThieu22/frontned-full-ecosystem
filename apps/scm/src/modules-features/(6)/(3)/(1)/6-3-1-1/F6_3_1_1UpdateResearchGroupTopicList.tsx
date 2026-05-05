'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

export interface I6_3_1_1ListOfTopic {
    id?: number; // ID (không chỉnh sửa, chỉ hiển thị nếu cần)
    topicCode?: string; // Mã chủ đề
    topicName?: string; // Tên chủ đề
    groupName?: string; // Tên nhóm nghiên cứu
    leaderName?: string; // Tên trưởng nhóm
}

export default function UpdateListOfTopicForm({ values }: { values: I6_3_1_1ListOfTopic }) {
    const form = useForm<I6_3_1_1ListOfTopic>({
        initialValues: {
            id: values.id || undefined, // Chỉ hiển thị nếu cần
            topicCode: values.topicCode || "",
            topicName: values.topicName || "",
            groupName: values.groupName || "",
            leaderName: values.leaderName || "",
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => console.log(values)} modalSize={"50%"}>

            <MyTextInput
                label="Mã chủ đề"
                placeholder="Nhập mã chủ đề"
                {...form.getInputProps('topicCode')}
            />
            <MyTextInput
                label="Tên chủ đề"
                placeholder="Nhập tên chủ đề"
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
        </MyActionIconUpdate>
    );
}
