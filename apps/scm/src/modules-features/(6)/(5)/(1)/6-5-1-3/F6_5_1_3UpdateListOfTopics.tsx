'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { I6_5_1_3ListOfTopic } from "./F6_5_1_3UpdatecommitteeScoringSummary";


export default function UpdateTopicForm({ value }: { value: I6_5_1_3ListOfTopic }) {
    const form = useForm<I6_5_1_3ListOfTopic>({
        initialValues: {
            id: 0,
            code: "",
            topicName: "",
            leaderName: "",
            point: 0,
            comment: "",
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => console.log(value)} modalSize="50%">
            <MyTextInput
                label="Mã đề tài"
                placeholder="Nhập mã đề tài"
                {...form.getInputProps('code')}
            />
            <MyTextInput
                label="Tên đề tài"
                placeholder="Nhập tên đề tài"
                {...form.getInputProps('topicName')}
            />
            <MyTextInput
                label="Trưởng nhóm"
                placeholder="Nhập tên trưởng nhóm"
                {...form.getInputProps('leaderName')}
            />
            <MyNumberInput
                label="Điểm"
                placeholder="Nhập điểm"
                {...form.getInputProps('point')}
            />
            <MyTextArea
                label="Đánh giá"
                placeholder="Nhập đánh giá"
                {...form.getInputProps('comment')}
            />
        </MyActionIconUpdate>
    );
}
