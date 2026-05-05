'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
export interface IF_xcivliulbu_Create {
    id?: number; // STT
    levelCode?: string; // Mã bậc
    name?: string //Tên bậc
    nameEg?: string //Tên bậc Eg
    ghiChu?: string
}

export default function F_xcivliulbu_Create() {
    const form = useForm<IF_xcivliulbu_Create>({
        initialValues: {
            levelCode: "",
            name: "",
            nameEg: "",
            ghiChu: ""
        },
        validate: {
            levelCode: (value) => (value ? null : 'Mã là bắt buộc'),
            name: (value) => (value ? null : 'Tên là bắt buộc')
        },
    });
    const handleSubmit = (values: IF_xcivliulbu_Create) => {
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
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Bậc'>
            <MyTextInput label='Mã bậc' {...form.getInputProps("levelCode")} />
            <MyTextInput label='Tên bậc' {...form.getInputProps("name")} />
            <MyTextInput label='Tên bậc Eg' {...form.getInputProps("nameEg")} />
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