'use client';

import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';

interface I_Course {
    id?: number; // STT
    maMon?: string; // Mã môn
    tenMon?: string; // Tên môn
    tenMonEg?: string; // Tên môn Eg
    ghiChu?: string; // Ghi chú
}

export default function F_uwagvkhy4y_Create() {
    const form = useForm<I_Course>({
        initialValues: {
            maMon: '',
            tenMon: '',
            tenMonEg: '',
            ghiChu: '',
        },
        validate: {
            maMon: (value) => (value ? null : 'Mã môn bắt buộc nhập'),
            tenMon: (value) => (value ? null : 'Tên môn bắt buộc nhập'),
            tenMonEg: (value) => (value ? null : 'Tên môn Eg bắt buộc nhập'),
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết môn học'>
            <MyTextInput
                label="Mã môn"
                placeholder="Nhập mã môn"
                {...form.getInputProps('maMon')}
            />
            <MyTextInput
                label="Tên môn"
                placeholder="Nhập tên môn"
                {...form.getInputProps('tenMon')}
            />
            <MyTextInput
                label="Tên môn Eg"
                placeholder="Nhập tên môn Eg"
                {...form.getInputProps('tenMonEg')}
            />
            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps('ghiChu')}
            />
        </MyButtonCreate>
    );
}
