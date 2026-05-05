'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
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

export default function F_vahqbeopau_Update({data}:{data:I_vahqbeopau}) {
    const form = useForm<I_vahqbeopau>({
        initialValues:data
    });

   
    return (
        <MyActionIconUpdate form={form} onSubmit={() => {}} >
            <MyTextInput label='Mã đợt xét' {...form.getInputProps("maDotXet")} disabled />
            <MyTextInput label='Tên đợt xét' {...form.getInputProps("tenDotXet")} />
            <MyTextInput label='Số quyết định' {...form.getInputProps("soQuyetDinh")} />
            <MyDateInput label='Ngày ký' {...form.getInputProps("ngayKy")} />
        </MyActionIconUpdate>
    );
}
