'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { ppid } from 'process';

interface I_b5kgyy98l9_Form {
    school?: string;
    schoolname?: string;
    schoolnameeg?: string;
    idlocation?: string;
    location?: string;
    note?: string;
}

export default function F_b5kgyy98l9_Create() {
    const form = useForm<I_b5kgyy98l9_Form>({
        initialValues: {
            school: '',
            schoolname: '',
            schoolnameeg: '',
            idlocation: '',
            location: '',
            note: '',
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => {}} objectName='Danh mục dự án'>
            <MyTextInput label='Mã trường' {...form.getInputProps("school")}/>
            <MyTextInput label='Tên trường' {...form.getInputProps("schoolname")}/>
            <MyTextInput label='Tên trường eg' {...form.getInputProps("schoolnameeg")}/>
            <Select label="Địa bàn" {...form.getInputProps("idlocation")} data={['Hà Tây', 'Hà Bắc', 'Hà Đông', 'Hà Nam']}/>
            <Select label="Khu vực" data={['Khu Vực 1', 'Khu Vực 2', 'Khu Vực 2 nông thôn', 'Khu Vực 3']} defaultValue="Khu Vực 1" clearable/>
            <MyTextInput label='Ghi chú' {...form.getInputProps("node")}/>
        </MyButtonCreate>
    )
}