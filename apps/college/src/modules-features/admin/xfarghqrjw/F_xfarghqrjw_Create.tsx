'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';

interface I {
    id?: number; // STT
    studentCode?: string; // Mã sinh viên
    fullName?: string; // Họ tên
    dob?: string; // Ngày sinh
    gender?: string; // Giới tính
    nhhkStart?: string; // NHHK bắt đầu
    nhhkEnd?: string; // NHHK kết thúc
    policy?: string; // Diện chính sách
    note?: string; // Ghi chú
}

export default function F_xfarghqrjw_Create() {
    const form = useForm<I>({
        initialValues: {
            studentCode: '', // Mã sinh viên
            fullName: '', // Họ tên
            dob: '', // Ngày sinh
            gender: '', // Giới tính
            nhhkStart: '', // NHHK bắt đầu
            nhhkEnd: '', // NHHK kết thúc
            policy: '', // Diện chính sách
            note: '', // Ghi chú
        },
        validate: {
            studentCode:(value)=>(value?null:'Mã sinh viên bắt buộc nhập'),
            fullName:(value)=>(value?null:'Họ và tên bắt buộc nhập'),
            dob:(value)=>(value?null:'Ngày sinh bắt buộc nhập'),
            gender:(value)=>(value?null:'Giới tính bắt buộc nhập'),
            nhhkStart:(value)=>(value?null:'NHHK bắt đầu bắt buộc nhập'),
            nhhkEnd:(value)=>(value?null:'NNHK kết thúc bắt buộc phải nhập'),
            policy:(value)=>(value?null:"Diện chính sách bắt buộc phải nhập"),
            note:(value)=>(value?null:'Ghi chú bắt buộc phải nhâp')
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName="Chi tiết Diện chính sách sinh viên chung">
            {/* Mã sinh viên */}
            <MyTextInput
                label="Mã sinh viên"
                placeholder="Nhập mã sinh viên"
                {...form.getInputProps('studentCode')}
            />

            {/* Họ tên */}
            <MyTextInput
                label="Họ tên"
                placeholder="Nhập họ tên"
                {...form.getInputProps('fullName')}
            />

            {/* Ngày sinh */}
            <MyTextInput
                label="Ngày sinh"
                placeholder="Nhập ngày sinh"
                type="date"
                {...form.getInputProps('dob')}
            />

            {/* Giới tính */}
            <Select
                label="Giới tính"
                placeholder="Chọn giới tính"
                data={[
                    { value: 'Nam', label: 'Nam' },
                    { value: 'Nữ', label: 'Nữ' },
                    { value: 'Khác', label: 'Khác' },
                ]}
                {...form.getInputProps('gender')}
            />

            {/* NHHK bắt đầu */}
            <MyTextInput
                label="NHHK bắt đầu"
                placeholder="Nhập NHHK bắt đầu"
                {...form.getInputProps('nhhkStart')}
            />

            {/* NHHK kết thúc */}
            <MyTextInput
                label="NHHK kết thúc"
                placeholder="Nhập NHHK kết thúc"
                {...form.getInputProps('nhhkEnd')}
            />

            {/* Diện chính sách */}
            <Select
                label="Diện chính sách"
                placeholder="Chọn diện chính sách"
                data={[
                    { value: 'Con thương binh', label: 'Con thương binh' },
                    { value: 'Hộ nghèo', label: 'Hộ nghèo' },
                    { value: 'Khác', label: 'Khác' },
                ]}
                {...form.getInputProps('policy')}
            />

            {/* Ghi chú */}
            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps('note')}
            />
        </MyButtonCreate>
    );
}
