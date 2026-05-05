'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'; // Giả sử bạn có input để chọn ngày
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';

interface ITable_SinhVien_Update {
    id?: number; // STT
    maSinhVien?: string; // Mã sinh viên
    hoLot?: string; // Họ Lót
    ten?: string; // Tên
    ngaySinh?: Date; // Ngày sinh
    gioiTinh?: string; // Giới tính
    maLop?: string; // Mã lớp
}

export default function F_Table_SinhVien_Update({ data }: { data: ITable_SinhVien_Update }) {
    const form = useForm<ITable_SinhVien_Update>({
        initialValues: data
    });



    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã sinh viên' {...form.getInputProps("maSinhVien")} />
            <MyTextInput label='Họ Lót' {...form.getInputProps("hoLot")} />
            <MyTextInput label='Tên' {...form.getInputProps("ten")} />
            <MyDateInput label='Ngày sinh' {...form.getInputProps("ngaySinh")} />
            <MyTextInput label='Giới tính' {...form.getInputProps("gioiTinh")} />
            <MyTextInput label='Mã lớp' {...form.getInputProps("maLop")} />
        </MyActionIconUpdate>
    );
}
