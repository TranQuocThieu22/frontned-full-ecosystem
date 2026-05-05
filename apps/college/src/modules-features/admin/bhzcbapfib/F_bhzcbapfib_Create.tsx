'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface I_bhzcbapfib_Create {
    id?: number; // STT
    maChiNhanh?: string; // Mã chi nhánh
    tenChiNhanh?: string; // Tên chi nhánh
    diaChi?: string; // Địa chỉ
    ghiChu?: string; // Ghi chú
}

export default function ChiNhanhCreate() {
    const form = useForm<I_bhzcbapfib_Create>({
        initialValues: {
            maChiNhanh: '', // Mã chi nhánh
            tenChiNhanh: '', // Tên chi nhánh
            diaChi: '', // Địa chỉ
            ghiChu: '', // Ghi chú
        },
        validate: {
            maChiNhanh: (value) => (value ? null : 'Mã chi nhánh là bắt buộc'),
            tenChiNhanh: (value) => (value ? null : 'Tên chi nhánh là bắt buộc'),
            diaChi: (value) => (value ? null : 'Địa chỉ là bắt buộc'),
            ghiChu: (value) => (value ? null : 'Ghi chú là bắt buộc'),
        },
    });

    const handleSubmit = (values: I_bhzcbapfib_Create) => {
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
            message: 'Thêm mới chi nhánh thành công!',
            color: 'green',
        });
    };

    return (
        <MyButtonCreate form={form} onSubmit={() => handleSubmit(form.values)} objectName='Chi tiết chi nhánh'>
            <MyTextInput label='Mã chi nhánh' {...form.getInputProps("maChiNhanh")} />
            <MyTextInput label='Tên chi nhánh' {...form.getInputProps("tenChiNhanh")} />
            <MyTextInput label='Địa chỉ' {...form.getInputProps("diaChi")} />
            <MyTextArea label='Ghi chú' {...form.getInputProps("ghiChu")} />
        </MyButtonCreate>
    );
}
