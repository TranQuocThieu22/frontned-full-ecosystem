'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput'; // Giả sử bạn có input để chọn ngày
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface ITable_SinhVien_Create {
    id?: number; // STT
    maSinhVien?: string; // Mã sinh viên
    haLot?: string; // Họ Lót
    ten?: string; // Tên
    ngaySinh?: string; // Ngày sinh
    gioiTinh?: string; // Giới tính
    maLop?: string; // Mã lớp
}

export default function F_Table_SinhVien_neyukerymr_Create() {
    const form = useForm<ITable_SinhVien_Create>({
        initialValues: {
            maSinhVien: '', // Mã sinh viên
            haLot: '', // Họ Lót
            ten: '', // Tên
            ngaySinh: '', // Ngày sinh
            gioiTinh: '', // Giới tính
            maLop: '', // Mã lớp
        },
        validate: {
            maSinhVien: (value) => (value ? null : 'Mã sinh viên là bắt buộc'),
            haLot: (value) => (value ? null : 'Họ Lót là bắt buộc'),
            ten: (value) => (value ? null : 'Tên là bắt buộc'),
            ngaySinh: (value) => (value ? null : 'Ngày sinh là bắt buộc'),
            gioiTinh: (value) => (value ? null : 'Giới tính là bắt buộc'),
            maLop: (value) => (value ? null : 'Mã lớp là bắt buộc'),
        },
    });

    const handleSubmit = (values: ITable_SinhVien_Create) => {
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
            message: 'Thêm mới sinh viên thành công!',
            color: 'green',
        });
    };

    return (
        <MyButtonCreate form={form} onSubmit={() => handleSubmit(form.values)} objectName='Sinh viên'>
            <MyTextInput label='Mã sinh viên' {...form.getInputProps("maSinhVien")} />
            <MyTextInput label='Họ Lót' {...form.getInputProps("haLot")} />
            <MyTextInput label='Tên' {...form.getInputProps("ten")} />
            <MyDateInput label='Ngày sinh' {...form.getInputProps("ngaySinh")} />
            <MyTextInput label='Giới tính' {...form.getInputProps("gioiTinh")} />
            <MyTextInput label='Mã lớp' {...form.getInputProps("maLop")} />
        </MyButtonCreate>
    );
}
