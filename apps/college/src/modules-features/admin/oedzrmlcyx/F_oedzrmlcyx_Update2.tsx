'use client';

import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { useForm } from '@mantine/form';
import { ITableRow } from './F_oedzrmlcyx_Create';

export default function F_rkgjotusmn_Update2({ data }: { data: ITableRow }) {
    const form = useForm<ITableRow>({
        initialValues: {
            id: data?.id || 0,
            studentCode: data?.studentCode || '',
            lastName: data?.lastName || '',
            firstName: data?.firstName || '',
            dob: data?.dob || '',
            gender: data?.gender || '',
            classCode: data?.classCode || '',
            semester: data?.semester || 0, // Correctly initialize the semester value
        },
    });





    return (
        <MyActionIconUpdate
            form={form}
            onSubmit={() => {
                // Perform your update logic here
                console.log(form.values);
            }}
        >
            <MyTextInput
                label="STT"
                placeholder="Nhập STT"
                value={form.values.id.toString()}
                onChange={(e) => form.setFieldValue('id', parseInt(e.target.value, 10))}
            />
            <MyTextInput
                label="Mã sinh viên"
                placeholder="Nhập mã sinh viên"
                {...form.getInputProps('studentCode')}
            />
            <MyTextInput
                label="Họ lót"
                placeholder="Nhập họ lót"
                {...form.getInputProps('lastName')}
            />
            <MyTextInput
                label="Tên"
                placeholder="Nhập tên"
                {...form.getInputProps('firstName')}
            />
            <MyTextInput
                label="Ngày sinh"
                placeholder="Nhập ngày sinh (DD/MM/YYYY)"
                value={U0DateToDDMMYYYString(new Date(form.values.dob))}
                onChange={(e) => {
                    const dateValue = e.target.value;
                    const [day, month, year] = dateValue.split('/');
                    // form.setFieldValue(
                    //     'dob',
                    //     new Date(Number(year), Number(month) - 1, Number(day)).toISOString()
                    // );
                }}
            />
            <MyTextInput
                label="Giới tính"
                placeholder="Nhập giới tính"
                {...form.getInputProps('gender')}
            />
            <MyTextInput
                label="Số học kỳ"
                placeholder="Nhập số học kỳ"
                value={(form.values.semester ?? '').toString()} // Handle undefined or null
                onChange={(e) => {
                    const value = e.target.value;
                    form.setFieldValue('semester', parseInt(value, 10) || 0); // Default to 0 if invalid
                }}
            />
        </MyActionIconUpdate>
    );
}
