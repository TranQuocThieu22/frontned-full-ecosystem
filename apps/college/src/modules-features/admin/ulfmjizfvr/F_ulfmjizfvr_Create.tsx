import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

interface IF_ulfmjizfvr_Create {
    id?: number;
    maDay?: string;
    tenDay?: string;
    chiNhanh?: string;
    ghiChu?: string;
}

export default function F_ulfmjizfvr_Create() {
    const form = useForm<IF_ulfmjizfvr_Create>({
        initialValues: {
            id: 0,
            maDay: '',
            tenDay: '',
            chiNhanh: '',
            ghiChu: '',
        },
        validate: {
            maDay: (value) => (value ? null : 'Mã dãy là bắt buộc'),
            tenDay: (value) => (value ? null : 'Tên dãy là bắt buộc'),
            chiNhanh: (value) => (value ? null : 'Chi nhánh là bắt buộc'),
            ghiChu: (value) => (value ? null : 'Ghi chú là bắt buộc'),
        },
    });

    const handleSubmit = (values: IF_ulfmjizfvr_Create) => {
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
        <MyButtonCreate
            form={form}
            onSubmit={() => handleSubmit(form.values)} // Gọi handleSubmit với giá trị form
            objectName='Chi tiết dãy phòng'
        >
            <MyTextInput label='Mã dãy' {...form.getInputProps("maDay")} />
            <MyTextInput label='Tên dãy' {...form.getInputProps("tenDay")} />
            <MySelect
                data={['Thủ Đức', 'Quận Tân Bình']}
                defaultValue='Thủ Đức'
                label='Chi nhánh'
                {...form.getInputProps('chiNhanh')}
            />
            <MyTextArea label="Ghi chú" {...form.getInputProps('ghiChu')} />
        </MyButtonCreate>
    );
}
