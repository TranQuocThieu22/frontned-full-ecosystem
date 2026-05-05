'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
export interface IF_jhzaohpaoh_Create {
    id?: number; // STT
    languageCode?: string; // Mã ngôn ngữ
    name?: string //Tên ngôn ngữ
    ghiChu?: string
}


export default function F_jhzaohpaoh_Create() {
    const form = useForm<IF_jhzaohpaoh_Create>({
        initialValues: {
            languageCode: "",
            name: "",
            ghiChu: ""
        },
        validate: {
            languageCode: (value) => (value ? null : 'Mã ngôn ngữ là bắt buộc'),
            name: (value) => (value ? null : 'Tên ngôn ngữ là bắt buộc')
        },
    });
    const handleSubmit = (values: IF_jhzaohpaoh_Create) => {
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
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Ngôn ngữ'>
            <MyTextInput label='Mã ngôn ngữ' {...form.getInputProps("languageCode")} />
            <MyTextInput label='Tên ngôn ngữ' {...form.getInputProps("name")} />

            {/* <Select
                label="Khoa quản lý"
                data={[
                    { value: "1", label: "Khoa công nghệ thông tin" },
                    { value: "2", label: "Khoa ngoại ngữ" },
                    { value: "3", label: "Khoa kinh tế" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("khoaQuanLy", parseInt(value?.toString()!))}
            /> */}
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyButtonCreate>
    )
}