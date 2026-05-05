'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';


interface I {
    id?: number; // STT
    maHe?: string; // Mã hệ
    tenHe?: string; // Tên hệ
    tenHeEg?: string;
    ghiChu?: string;
}
export default function F_rrpuknsaqr_Create() {
    const form = useForm<I>({
        initialValues: {
            maHe: '', // Mã hệ
            tenHe: '',// Tên hệ
            tenHeEg: '',
            ghiChu: ''
        },
        validate: {
            maHe: (value) => (value ? null : 'Mã hệ là bắt buộc'),
            tenHe: (value) => (value ? null : 'Tên hệ là bắt buộc'),
            tenHeEg: (value) => (value ? null : 'Tên hệ Eg là bắt buộc'),
            ghiChu: (value) => (value ? null : 'Ghi chú là bắt buộc'),
        },
    })

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
        <MyButtonCreate form={form} onSubmit={() => handleSubmit(form.values)} objectName='Chi tiết hệ đào tạo'>
            <MyTextInput label='Mã hệ' {...form.getInputProps("maHe")} />
            <MyTextInput label='Tên hệ' {...form.getInputProps("tenHe")} />
            <MyTextInput label='Tên hệ Eg' {...form.getInputProps("tenHeEg")} />
            <MyTextArea label='Ghi chú' {...form.getInputProps("ghiChu")} />

        </MyButtonCreate>
    )
}


