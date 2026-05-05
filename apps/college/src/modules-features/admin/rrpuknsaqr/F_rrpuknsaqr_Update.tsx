'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';


interface I {
    id?: number; // STT
    maHe?: string; // Mã hệ
    tenHe?: string; // Tên hệ
    tenHeEg?: string;
    ghiChu?: string;
}
export default function F_rrpuknsaqr_Update({ data }: { data: I }) {
    const form = useForm<I>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã hệ' {...form.getInputProps("maHe")} readOnly />
            <MyTextInput label='Tên hệ' {...form.getInputProps("tenHe")} />
            <MyTextInput label='Tên hệ Eg'  {...form.getInputProps("tenHeEg")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyActionIconUpdate>
    )
}


