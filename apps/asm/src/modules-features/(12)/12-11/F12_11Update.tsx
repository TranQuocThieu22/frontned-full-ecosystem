'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { spec } from 'node:test/reporters';

interface I_F12_11_Form {
    prjCode?: string;
    prjName?: string;
    note?: string;
}

export default function F12_11Create({data}:{data:I_F12_11_Form}) {
    const form = useForm<I_F12_11_Form>({
        initialValues: data
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => {}} >
            <MyTextInput label='Mã dự án' {...form.getInputProps("prjCode")} />
            <MyTextInput label='Tên dự án' {...form.getInputProps("prjName")} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("note")} />
        </MyActionIconUpdate>
    );
}