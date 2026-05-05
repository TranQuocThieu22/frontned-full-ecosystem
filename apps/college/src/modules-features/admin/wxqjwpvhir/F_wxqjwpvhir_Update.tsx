'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';


interface I {
    id?: number; // STT
    maHocChe?: string; // Mã học chế
    tenHocChe?: string; // Tên học chế
    tenHocCheEg?: string
    ghiChu?: string
}
export default function F_euvqpsrtts_Update({ data }: { data: I }) {
    const form = useForm<I>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput label='Mã học chế' {...form.getInputProps("maHocChe")} disabled />
            <MyTextInput label='Tên học chế' {...form.getInputProps("tenHocChe")} />
            <MyTextInput label='Tên học chế Eg' {...form.getInputProps("tenHocCheEg")}/>
            <MyTextArea label='Ghi chú' {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    )
}


