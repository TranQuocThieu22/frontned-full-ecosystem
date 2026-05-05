'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'; // Giả sử có component nhập ngày
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';

export interface I_vahqbeopau {
    id?: number; // STT
    maDotXet?: string; // Mã đợt xét
    tenDotXet?: string; // Tên đợt xét
    soQuyetDinh?: string; // Số quyết định
    ngayKy?: Date | null; // Ngày ký
}

export default function F_vahqbeopau_Create() {
    const form = useForm<I_vahqbeopau>({
        initialValues: {
            maDotXet: '', // Mã đợt xét
            tenDotXet: '', // Tên đợt xét
            soQuyetDinh: '', // Số quyết định
            ngayKy: null, // Ngày ký
        },
        validate: {
            maDotXet: (value) => (value ? null : 'Mã đợt xét là bắt buộc'),
            tenDotXet: (value) => (value ? null : 'Tên đợt xét là bắt buộc'),
            soQuyetDinh: (value) => (value ? null : 'Số quyết định là bắt buộc'),
            ngayKy: (value) => (value ? null : 'Ngày ký là bắt buộc'),
        },
    });

   
    return (
        <MyButtonCreate form={form} onSubmit={() => {}} objectName='Chi tiết đợt xét'>
            <MyTextInput label='Mã đợt xét' {...form.getInputProps("maDotXet")} />
            <MyTextInput label='Tên đợt xét' {...form.getInputProps("tenDotXet")} />
            <MyTextInput label='Số quyết định' {...form.getInputProps("soQuyetDinh")} />
            <MyDateInput label='Ngày ký' {...form.getInputProps("ngayKy")} />
        </MyButtonCreate>
    );
}
