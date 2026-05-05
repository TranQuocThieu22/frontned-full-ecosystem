'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"

interface IBanGio {
    id?: number,
    name?: string,
    code?: string,
    note?: string


}
export default function F_qdwzemxaux_Update(
    { values }: { values: IBanGio }
) {
    const form = useForm({
        initialValues: values
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label="Mã bận giờ" {...form.getInputProps("code")} defaultValue={form.values.code} />
            <MyTextInput label="Tên bận giờ" {...form.getInputProps("name")} defaultValue={form.values.name} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} defaultValue={form.values.note} />
        </MyActionIconUpdate>
    )
}
