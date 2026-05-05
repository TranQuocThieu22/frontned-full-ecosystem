'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';


interface I {
    id?: number; // STT
    maHocChe?: string; // Mã học chế
    tenHocChe?: string; // Tên học chế
    tenHocCheEg?: string
    ghiChu?: string
}
export default function F_euvqpsrtts_Create() {
    const form = useForm<I>({
        initialValues: {
            maHocChe: '', // Mã học chế
            tenHocChe: '', // Tên học chế
            tenHocCheEg: '',
            ghiChu: ''
        },
        validate: {
            maHocChe: (value) => (value ? null : 'Mã học chế là bắt buộc'),
            tenHocChe: (value) => (value ? null : 'Tên học chế là bắt buộc'),
            tenHocCheEg: (value) => (value ? null : 'Tên học chế Eg là bắt buộc'),
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
        <MyButtonCreate form={form} onSubmit={() => handleSubmit(form.values)} // Gọi handleSubmit với giá trị form objectName='Chi tiết học chế'
        >
            <MyTextInput label='Mã học chế' {...form.getInputProps("maHocChe")} />
            <MyTextInput label='Tên học chế' {...form.getInputProps("tenHocChe")} />
            <MyTextInput label='Tên học chế Eg' {...form.getInputProps("tenHocCheEg")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyButtonCreate>
    )
}


