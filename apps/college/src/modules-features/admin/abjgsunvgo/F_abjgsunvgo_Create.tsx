'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from "@mantine/notifications";
export interface IF_abjgsunvgo_Create {
    id?: number; // STT
    bacHeCode?: string; // Mã sinh viên
    name?: string //tên bậc hệ
    nameEg?: string //tên bậc hệ Eg
    quyChe?: string 
    bac?: string 
    he?: string 
   
    soHocKyCT?: number 
    soHocKyMax?: number 
    soHocKyNamHoc?: number 
    vietTatTS?: string
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
 
}

export default function F_abjgsunvgo_Create() {
    const form = useForm<IF_abjgsunvgo_Create>({
        initialValues: {
            bacHeCode: "",
            name: "",
            nameEg: "",
            quyChe: "",
            bac : "",
            he : "",
            // policyCode: "",
            soHocKyCT : undefined,
            soHocKyNamHoc: undefined,
            // percentDisscount: 0,
            // amountMoneyDiscount: 0,
            vietTatTS: ""
        },
        validate: {
            bacHeCode: (value) => (value ? null : 'Mã là bắt buộc'),
        
        },
    });
    const handleSubmit = (values: IF_abjgsunvgo_Create) => {
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
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Bậc hệ đào tạo'>
            <MyTextInput label='Mã bậc hệ' {...form.getInputProps("bacHeCode")} />
            <MyTextInput label='Tên bậc hệ' {...form.getInputProps("name")} />
            <MyTextInput label='Tên bậc hệ Eg' {...form.getInputProps("nameEg")} />
            <Select
                label="Quy chế"
                data={[
                    { value: "1", label: "Thông tư 08" },
                    { value: "2", label: "Thông tư 09" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("quyChe", value?.toString())}
                />
                <Select
                
                label="Bậc đào tạo"
                data={[
                    { value: "1", label: "Cao đẳng" },
                    { value: "2", label: "Liên thông" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("bac", value?.toString())}
                />
                <Select
              
                label="Hệ đào tạo"
                data={[
                    { value: "1", label: "Chính quy" },
                    { value: "2", label: "Liên thông" },
                ]}
                defaultValue={0?.toString()}
                onChange={(value) => form.setFieldValue("he", value?.toString())}
                />
           
           
            <MyTextInput label='Số học kỳ chương trình' {...form.getInputProps("soHocKyCT")} />
            <MyTextInput label='Số học kỳ tối đa' {...form.getInputProps("soHocKyMax")} />
            <MyTextInput label='Số học kỳ năm học' {...form.getInputProps("soHocKyNamHoc")} />
            <MyTextInput label='Viết tắt tuyển sinh' {...form.getInputProps("vietTatTS")} />
           
           

        </MyButtonCreate>
    )
}