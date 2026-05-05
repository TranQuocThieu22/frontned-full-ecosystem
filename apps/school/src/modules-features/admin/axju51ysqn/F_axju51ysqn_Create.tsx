'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I {
    order?: number, 
    starttime?: string, 
    content?: string,
}

export default function F_axju51ysqn_Create() {
    const form = useForm<I>({
        initialValues: {
            order: undefined,
            starttime: "",
            content: ""
        },
        validate: {
            order: (value) => value ? null : 'Không được để trống',
            starttime: (value) => value ? null : 'Không được để trống',
        }
    })
    return (
        <MyButtonCreate  objectName="Nội dung sự kiện" form={form} onSubmit={() => { }}>
            <MyNumberInput min={0} label="Thứ tự" {...form.getInputProps("order")} hideControls />
            <MyTextInput label="Thời gian bắt đầu" {...form.getInputProps("starttime")} />
            <MyTextArea label="Nội dung" {...form.getInputProps("content")} />
        </MyButtonCreate>
    )
}
