'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import { Modal } from '@mantine/core';
import { useForm } from '@mantine/form';

// Interface dữ liệu
export interface I_w0d4wkrvnn {
    id?: number;
    order: number;
    code: string;
    name: string;
    songayxuli: number;
    tennghiepvu: string;
}

// Mảng dữ liệu có sẵn
const userList = [
    { code: 'BaoTN', name: 'Tô Ngọc Bảo' },
    { code: 'LyTN', name: 'Tô Ngọc Ly' },
    { code: 'LinhTN', name: 'Tô Ngọc Linh' },
];

export default function F_w0d4wkrvnn_Create() {
    const form = useForm<I_w0d4wkrvnn>({
        initialValues: {
            order: 0,
            code: '',
            name: '',
            songayxuli: 0,
            tennghiepvu: '',
        },
        validate: {},
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => {}} objectName='Chi tiết đợt xét'>
            <MyNumberInput min={1} label='Thứ tự' {...form.getInputProps('order')}/>
            <MySelect
                label='Tên nhóm'
                data={userList.map((user) => ({ value: user.name, label: user.name }))}
                {...form.getInputProps('name')}
            />
            <MyNumberInput min={0} label='Số ngày xử lý' {...form.getInputProps('songayxuli')} />
            <MySelect data={["Trình Ký", "Kiểm tra học phí", "Kiểm tra hồ sơ nhập học"]} label='Tên nghiệp vụ xử lí' {...form.getInputProps('tennghiepvu')} />
            </MyButtonCreate>
    );
}
