'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";

interface I_BoDem {
    value: string;
    label: string;
}

export interface I {
    id?: number;
    maPhuongThuc?: string; //Mã phương thức
    tenPhuongThuc?: string;  // Tên phương thức
    tenPhuongThucEg?: string;  // Tên phương thức Eg
    boDem?: I_BoDem[]; // Bộ đếm
    mauHoSoDangKy?: string; // Mẫu hồ sơ đăng ký
    ghiChu?: string; // Ghi chú
}

export default function F_7bnm0eon4k_Create() {
    const form = useForm<I>({
        initialValues: {
            maPhuongThuc: "",
            tenPhuongThuc: "",
            tenPhuongThucEg: "",
            boDem: [],
            mauHoSoDangKy: undefined,
            ghiChu: ""
        },
        validate: {
            maPhuongThuc: (value) => (value ? null : 'Mã là bắt buộc'),
        },
    });
    const handleSubmit = (values: I) => {
        const validationErrors = form.validate();
        if (validationErrors.hasErrors) {
            showNotification({
                title: 'Lỗi nhập liệu',
                message: 'Vui lòng điền đầy đủ thông tin vào các trường bắt buộc!',
                color: 'red',
            });
            return;
        }
        console.log('Dữ liệu hợp lệ:', values);
        showNotification({
            title: 'Thành công',
            message: 'Thêm mới thành công!',
            color: 'green',
        });
    };

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='phương thức xét tuyển' >
            <MyTextInput label='Mã phương thức' {...form.getInputProps("MaPhuongThuc")} />
            <MyTextInput label='Tên phương thức' {...form.getInputProps("tenPhuongThuc")} />
            <MyTextInput label='Tên phương thức Eg' {...form.getInputProps("tenPhuongThucEg")} />
            <Select
                label="Bộ đếm"
                data={[
                    { value: "1", label: 'Học bạ lớp 12' },
                    { value: "2", label: 'Điểm thi THPT quốc gia' },
                    { value: "3", label: 'Học bạ + Điểm thi THPT' },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => {
                    if (value) {
                        form.setFieldValue('boDem', [{ value, label: value }]);
                    }
                }}
            />
            <MyFileInput label='Mẫu hồ sơ đăng ký' {...form.getInputProps("mauHoSoDangKy")} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("ghiChu")} />
        </MyButtonCreate>
    )
}