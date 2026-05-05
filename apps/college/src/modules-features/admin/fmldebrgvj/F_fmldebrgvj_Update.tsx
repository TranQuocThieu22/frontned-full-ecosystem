'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"
interface IDsThoiGian {
    id?: number,
    name?: string,
    code?: string,
    sang?: number,
    chieu?: number,
    toi?: number,
    note?: string
}
export default function F_fmldebrgvj_Update(
    { values }: { values: IDsThoiGian }
) {
    const form = useForm({
        initialValues: values
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label="Mã thời gian" {...form.getInputProps("code")} defaultValue={form.values.code} />
            <MyTextInput label="Tên thời gian" {...form.getInputProps("name")} defaultValue={form.values.name} />
            <MyNumberInput label="Sáng" {...form.getInputProps("sang")} defaultValue={form.values.sang} />
            <MyNumberInput label="chiều" {...form.getInputProps("trua")} defaultValue={form.values.chieu} />
            <MyNumberInput label="tối" {...form.getInputProps("chieu")} defaultValue={form.values.toi} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("note")} defaultValue={form.values.note} />
        </MyActionIconUpdate>
    )
}
