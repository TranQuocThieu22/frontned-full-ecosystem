'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
export interface IF_faofhttxaq_Create {
    id?: number; // STT
    studentCode?: string; // Mã sinh viên
    name?: string //họ tên
    birthDate?: Date  //Ngày sinh
    sex?: string //Giới tính

    semYearStart?: string  //năm học kỳ bắt đầu
    semYearEnd?: string //năm học kỳ kết thúc
    policyCode?: string
    policyName?: string //diện chính sách
    percentDisscount?: number //Phần trăm miễn giảm
    amountMoneyDiscount?: number //Số tiền miễn giảm
    ghiChu?: string
}

export default function F_faofhttxaq_Create() {
    const form = useForm<IF_faofhttxaq_Create>({
        initialValues: {
            studentCode: "",
            name: "",
            birthDate: undefined,
            sex: "",
            semYearStart: "",
            semYearEnd: "",
            // policyCode: "",
            policyName: "",
            // percentDisscount: 0,
            // amountMoneyDiscount: 0,
            ghiChu: ""
        },
        validate: {
            studentCode: (value) => (value ? null : 'Mã là bắt buộc'),
            name: (value) => (value ? null : 'Tên là bắt buộc')
        },
    });
    const handleSubmit = (values: IF_faofhttxaq_Create) => {
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
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Diện chính sách sinh viên chung'>
            <MyTextInput label='Mã sinh viên' {...form.getInputProps("studentCode")} />
            <MyTextInput label='Họ tên' {...form.getInputProps("name")} />
            <MyDateInput label='Ngày sinh' {...form.getInputProps("birthDate")} />
            <Select
                label="Giới tính"
                data={[
                    { value: "1", label: "Nam" },
                    { value: "2", label: "Nữ" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("sex", value?.toString())}
            />
            <Select
                searchable
                label="Năm học kỳ bắt đầu"
                data={[
                    { value: "1", label: "2024 - 1" },
                    { value: "2", label: "2028 - 1" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("sex", value?.toString())}
            />
            <Select
                searchable
                label="Năm học kỳ kết thúc"
                data={[
                    { value: "1", label: "2024 - 1" },
                    { value: "2", label: "2028 - 1" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("sex", value?.toString())}
            />
            {/* <MyDateInput  label='Năm học kỳ bắt đầu' {...form.getInputProps("semYearStart")} />
            <MyDateInput label='Năm học kỳ kết thúc' {...form.getInputProps("semYearEnd")} /> */}
            {/* <MyTextInput label='% Giảm' {...form.getInputProps("percentDisscount")} /> */}
            {/* <MyTextInput label='Số tiền miễn giảm' {...form.getInputProps("amountMoneyDiscount")} /> */}
            {/* <MyTextInput label='Mã diện chính sách' {...form.getInputProps("policyCode")} /> */}
            <Select
                label="Diện chính sách"
                data={[
                    { value: "1", label: "Hộ cận nghèo" },
                    { value: "2", label: "Diện 2" },
                    { value: "3", label: "Diện 3" },
                    { value: "4", label: "Diện 4" },
                    { value: "5", label: "Diện 5" },
                    { value: "6", label: "Diện 6" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("policyName", value?.toString())}
            />

            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyButtonCreate>
    )
}