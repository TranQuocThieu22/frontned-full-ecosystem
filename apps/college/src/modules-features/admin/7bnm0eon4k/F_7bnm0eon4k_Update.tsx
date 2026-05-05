'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';

interface I {
    id?: number;
    maPhuongThuc?: string; //Mã phương thức
    tenPhuongThuc?: string;  // Tên phương thức
    tenPhuongThucEg?: string;  // Tên phương thức Eg
    maBoDem?: string; // Bộ đếm
    mauHoSoDangKy?: string; // Mẫu hồ sơ đăng ký
    ghiChu?: string; // Ghi chú
}

export default function F_7bnm0eon4k_Update({ doituong }: { doituong: I }) {
    const form = useForm<I>({
        initialValues: doituong
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput label='Mã phương thức' {...form.getInputProps("maPhuongThuc")} />
            <MyTextInput label='Tên phương thức' {...form.getInputProps("tenPhuongThuc")} />
            <MyTextInput label='Tên phương thức Eg' {...form.getInputProps("tenPhuongThucEg")} />
            <Select
                label="Bộ đếm"
                data={[
                    { value: "1", label: 'Học bạ lớp 12' },
                    { value: "2", label: 'Điểm thi THPT quốc gia' },
                    { value: "3", label: 'Học bạ + Điểm thi THPT' },
                ]}
                {...form.getInputProps("maBoDem")}
                onChange={(value) => form.setFieldValue("maBoDem", value?.toString())}
            />
            <MyFileInput label='Mẫu hồ sơ đăng ký' {...form.getInputProps("mauHoSoDangKy")} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("ghiChu")} />
        </MyActionIconUpdate>
    )
}