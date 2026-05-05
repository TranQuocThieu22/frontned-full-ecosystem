'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface Ingfekyynfw {
    id?: number;
    maPhienBan?: string; // Mã phiên bản
    tenPhienBan?: string; // Tên phiên bản
    ghiChu?: string; // Ghi chú
}

export default function F_ngfekyynfw_Create() {
    const form = useForm<Ingfekyynfw>({
        initialValues: {
            maPhienBan: '', // Mã phiên bản
            tenPhienBan: '', // Tên phiên bản
            ghiChu: '', // Ghi chú
        },
        validate: {
            maPhienBan: (value) => (value ? null : 'Mã phiên bản là bắt buộc'),
            tenPhienBan: (value) => (value ? null : 'Tên phiên bản là bắt buộc'),
            ghiChu: (value) => (value ? null : 'Ghi chú là bắt buộc'),
        },
    });

    const handleSubmit = (values: Ingfekyynfw) => {
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
        <MyButtonCreate form={form} onSubmit={() => handleSubmit(form.values)} objectName='Phiên bản'>
            <MyTextInput label='Mã phiên bản' {...form.getInputProps("maPhienBan")} />
            <MyTextInput label='Tên phiên bản' {...form.getInputProps("tenPhienBan")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </MyButtonCreate>
    );
}
