'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';

interface I_bhzcbapfib_Update {
    id?: number; // STT
    maChiNhanh?: string; // Mã chi nhánh
    tenChiNhanh?: string; // Tên chi nhánh
    diaChi?: string; // Địa chỉ
    ghiChu?: string; // Ghi chú
}

export default function F_bhzcbapfib_Update({data}:{data:I_bhzcbapfib_Update}) {
    const form = useForm<I_bhzcbapfib_Update>({
        initialValues: data,
        validate: {
            maChiNhanh: (value) => (value ? null : 'Mã chi nhánh là bắt buộc'),
            tenChiNhanh: (value) => (value ? null : 'Tên chi nhánh là bắt buộc'),
            diaChi: (value) => (value ? null : 'Địa chỉ là bắt buộc'),
            ghiChu: (value) => (value ? null : 'Ghi chú là bắt buộc'),
        },
    });


    return (
        <MyActionIconUpdate form={form} onSubmit={() => {}} >
            <MyTextInput label='Mã chi nhánh' {...form.getInputProps("maChiNhanh")} disabled/>
            <MyTextInput label='Tên chi nhánh' {...form.getInputProps("tenChiNhanh")} />
            <MyTextInput label='Địa chỉ' {...form.getInputProps("diaChi")} />
            <MyTextArea label='Ghi chú' {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    );
}
