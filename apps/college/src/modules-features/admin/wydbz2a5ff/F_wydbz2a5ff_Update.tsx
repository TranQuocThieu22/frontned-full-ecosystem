'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'; // Giả sử có component nhập ngày
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';

export interface I_wydbz2a5ff {
    id?: number; // STT
    code: string; // Mã
    name: string; // Tên
    bodem: string; // Bộ đệm
    filemauin: string; // File mẫu in
    nhomGCN: string; // Nhóm GCN
    maudon: string; // Mẫu đơn
    minhchung: boolean; // Minh chứng
    choin: boolean;
    soluong: number;
    note?: string;
}

export default function F_wydbz2a5ff_Update({data}:{data:I_wydbz2a5ff}) {
    const form = useForm<I_wydbz2a5ff>({
        initialValues:data
    });

   
    return (
        <MyActionIconUpdate form={form} onSubmit={() => {}} >
                    <MyTextInput label='Mã GCN' {...form.getInputProps("code")} />
                    <MyTextInput label='Tên GCN' {...form.getInputProps("name")} />
                    <MyTextInput label='Bộ đếm' {...form.getInputProps("bodem")} />
                    <MyFileInput label='File mẫu in' {...form.getInputProps("filemauin")} />
                    <MyTextInput label='Nhóm GCN' {...form.getInputProps("nhomGCN")} />
                    <MyFileInput label='Mẫu đơn SV tải' {...form.getInputProps("maudon")} />
                    <Checkbox label="Bắt buộc minh chứng" {...form.getInputProps("minhchung", { type: "checkbox" })} />
                    <Checkbox label="Cho in trên web" {...form.getInputProps("choin", { type: "checkbox" })} />
                    <MyNumberInput min={1} label='số lượng ĐK tối đa' {...form.getInputProps("soluong")} />
                    <MyTextInput label='Ghi chú' {...form.getInputProps("note")} />
        </MyActionIconUpdate>
    );
}
