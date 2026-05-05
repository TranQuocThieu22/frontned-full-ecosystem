'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';

interface Ingfekyynfw {
    id?: number;
    maPhienBan?: string; // Mã phiên bản
    tenPhienBan?: string; // Tên phiên bản
    ghiChu?: string; // Ghi chú
}

export default function F_ngfekyynfw_Update({ data }: { data: Ingfekyynfw }) {
    const form = useForm<Ingfekyynfw>({
        initialValues: data
    });



    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã phiên bản' {...form.getInputProps("maPhienBan")} readOnly />
            <MyTextInput label='Tên phiên bản' {...form.getInputProps("tenPhienBan")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    );
}
