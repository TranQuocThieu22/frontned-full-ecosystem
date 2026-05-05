'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
export interface IF_lqidbouiuy_Create {
    id?: number; // STT
    roomCode?: string; // Mã phòng
    name?: string //Tên phòng
    nameEg?: string //Tên phòng
    branch?: string//chi nhánh
    building?: string//dãy nhà

    sucChuaHoc?: number //sức chứa học sinh
    sucChuaThi?: number//sức chứa người thi
    tinhChatPhong?: string// tính chất phòng
    dienTich?: number// diện tích
    ghiChu?: string
}

export default function F_lqidbouiuy_Create() {
    const form = useForm<IF_lqidbouiuy_Create>({
        initialValues: {
            roomCode: "",
            name: "",
            nameEg: "",
            branch: "",
            building: "",
            sucChuaHoc: undefined,
            sucChuaThi: undefined,
            tinhChatPhong: "",
            dienTich: undefined,
            ghiChu: ""
        },
        validate: {
            roomCode: (value) => (value ? null : 'Mã phòng là bắt buộc'),
            name: (value) => (value ? null : 'Tên phòng là bắt buộc')
        },
    });
    const handleSubmit = (values: IF_lqidbouiuy_Create) => {
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
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Danh mục phòng'>
            <MyTextInput label='Mã phòng' {...form.getInputProps("roomCode")} />
            <MyTextInput label='Tên phòng' {...form.getInputProps("name")} />
            <MyTextInput label='Tên phòng Eg' {...form.getInputProps("nameEg")} />
            <Select
                label="Chi nhánh"
                data={[
                    { value: "1", label: "Thủ Đức" },
                    { value: "2", label: "Bình Dương" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("branch", value?.toString())}
            />
            <Select
                label="Dãy"
                data={[
                    { value: "1", label: "Dãy 01 Thủ Đức" },
                    { value: "2", label: "Dãy 02 Bình Dương" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("building", value?.toString())}
            />
            <MyTextInput label='Sức chứa học' {...form.getInputProps("sucChuaHoc")} />
            <MyTextInput label='Sức chứa thi' {...form.getInputProps("sucChuaThi")} />
            <Select
                label="Tính chất"
                data={[
                    { value: "1", label: "Vi tính" },
                    { value: "2", label: "Thí nghiệm" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("tinhChatPhong", value?.toString())}
            />
            <MyTextInput label='Diện tích' {...form.getInputProps("dienTich")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyButtonCreate>
    )
}



