'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';


interface I_rkgjotusmn {
    id?: number; // STT
    maHoSo?: string; // Mã hồ sơ
    tenHoSo?: string; // Tên hồ sơ
    tenHoSoEg?: string; // Tên hồ sơ Eg
    ghiChu?: string; // Ghi chú
}

export default function F_rkgjotusmn_Update({ data }: { data: I_rkgjotusmn }) {
    const form = useForm<I_rkgjotusmn>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput
                disabled
                label="Mã hồ sơ"
                placeholder="Nhập mã hồ sơ"
                {...form.getInputProps('maHoSo')}
            />
            <MyTextInput
                label="Tên hồ sơ"
                placeholder="Nhập tên hồ sơ"
                {...form.getInputProps('tenHoSo')}
            />
            <MyTextInput
                label="Tên hồ sơ Eg"
                placeholder="Nhập tên hồ sơ Eg"
                {...form.getInputProps('tenHoSoEg')}
            />
            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps('ghiChu')}
            />

        </MyActionIconUpdate>
    )
}


