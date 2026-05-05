'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

export interface I6_3_6ListOfRecommend {
    id?: number;
    code?: string;
    topicName?: string;
    groupName?: string;
    leaderName?: string;
    renumeration?: number;
}

export default function UpdateRecommendForm({ values }: { values: I6_3_6ListOfRecommend }) {
    const form = useForm<I6_3_6ListOfRecommend>({
        initialValues: {
            id: values.id,
            code: values.code || "",
            topicName: values.topicName || "",
            groupName: values.groupName || "",
            leaderName: values.leaderName || "",
            renumeration: values.renumeration || 0,
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => console.log(values)} modalSize="50%">
            <MyTextInput label="Mã đề xuất" placeholder="Nhập mã đề xuất" {...form.getInputProps('code')} />
            <MyTextInput label="Tên đề tài" placeholder="Nhập tên đề tài" {...form.getInputProps('topicName')} />
            <MyTextInput label="Tên nhóm nghiên cứu" placeholder="Nhập tên nhóm nghiên cứu" {...form.getInputProps('groupName')} />
            <MyTextInput label="Trưởng nhóm" placeholder="Nhập tên trưởng nhóm" {...form.getInputProps('leaderName')} />
            <MyNumberInput label="Thù lao" placeholder="Nhập thù lao" {...form.getInputProps('renumeration')} />
        </MyActionIconUpdate>
    );
}
