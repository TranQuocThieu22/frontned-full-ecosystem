'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I_axju51ysqn_Update {
    order?: number, 
    startTime?: string, 
    content?: string, 
}

export default function F_axju51ysqn_Update({ values }: { values: I_axju51ysqn_Update }) {
    const form = useForm<I_axju51ysqn_Update>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Chi tiết nội dung sự kiện" form={form} onSubmit={() => { }}>
            <MyTextInput disabled label="Thứ tự" {...form.getInputProps("order")} />
            <MyTextInput disabled label="Thời gian bắt đầu" {...form.getInputProps("startTime")} />
            <MyTextArea label="Nội dung" {...form.getInputProps("content")} />
        </MyActionIconUpdate>
    )
}
