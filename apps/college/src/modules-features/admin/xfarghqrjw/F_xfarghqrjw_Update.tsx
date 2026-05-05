'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { I_xfarghqrjw } from './F_xfarghqrjw_Read';




export default function F_xfarghqrjw_Update({ data }: { data: I_xfarghqrjw }) {
    const form = useForm<I_xfarghqrjw>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            {/* Mã sinh viên */}
            <MyTextInput
                label="Mã sinh viên"
                placeholder="Nhập mã sinh viên"
                {...form.getInputProps('studentCode')}
                disabled
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
                {...form.getInputProps('policyName')}
            />

            {/* Ghi chú */}
            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps('note')}
            />
        </MyActionIconUpdate>
    )
}


