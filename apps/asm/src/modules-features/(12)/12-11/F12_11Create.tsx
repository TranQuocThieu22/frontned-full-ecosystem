'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { ppid } from 'process';

interface I_F12_11_Form {
    prjCode?: string;
    prjName?: string;
    note?: string;
}

export default function F12_11Create() {
    const form = useForm<I_F12_11_Form>({
        initialValues: {
            prjCode: '',
            prjName: '',
            note: '',
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => {}} objectName='Danh mục dự án'>
            <MyTextInput label='Mã dự án' {...form.getInputProps("prjCode")}/>
            <MyTextInput label='Tên dự án' {...form.getInputProps("prjName")}/>
            <MyTextInput label='Ghi chú' {...form.getInputProps("node")}/>
        </MyButtonCreate>
    )
}