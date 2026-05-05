'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
export interface IF_xwzcqjqvhv_Create {
    id?: number; // STT
    reasonsCode?: string; // Mã lý do quyết định
    name?: string //Tên lý do
    type?: string; // Khoa quản lý
    ghiChu?: string
}

export default function F_xwzcqjqvhv_Create() {
    const form = useForm<IF_xwzcqjqvhv_Create>({
        initialValues: {
            reasonsCode: "",
            name: "",
            type: "",
            ghiChu: ""
        },
        validate: {
            reasonsCode: (value) => (value ? null : 'Mã là bắt buộc'),
            name: (value) => (value ? null : 'Tên là bắt buộc')
        },

    });
    const handleSubmit = (values: IF_xwzcqjqvhv_Create) => {
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
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Danh mục lý do quyết định'>
            <MyTextInput label='Mã lý do' {...form.getInputProps("reasonsCode")} />
            <MyTextInput label='Tên lý do' {...form.getInputProps("name")} />
            <Select
                label="Loại vào / ra"
                data={[
                    { value: "1", label: "Quyết định vào mới" },
                    { value: "2", label: "Quyết định bảo lưu" },
                    { value: "3", label: "Quyết định học lại" },
                    { value: "4", label: "Quyết định đổi lớp" },
                    { value: "5", label: "Quyết định nghỉ học" },
                    { value: "6", label: "Quyết định tốt nghiệp" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("type", value?.toString())}
            />
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyButtonCreate>
    )
}