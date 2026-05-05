'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
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

export default function F_uwagvkhy4y_Update({ data }: { data: I_Course }) {
    const form = useForm<I_Course>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput
                disabled
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
        </MyActionIconUpdate>
    )
}
