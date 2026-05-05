'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"

interface ITinhChatThi {
    id?: number,
    name?: string,
    code?: string,
    note?: string,

}
export default function F_htsnivjoef_Update(
    { values }: { values: ITinhChatThi }
) {
    const form = useForm({
        initialValues: values
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label="Mã Tính chất thi" {...form.getInputProps("code")} defaultValue={form.values.code} />
            <MyTextInput label="Tên Tính chất thi" {...form.getInputProps("name")} defaultValue={form.values.name} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} defaultValue={form.values.note} />
        </MyActionIconUpdate>
    )
}
