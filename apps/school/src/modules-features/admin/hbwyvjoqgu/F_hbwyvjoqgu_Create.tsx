'use client'

import { useForm } from '@mantine/form';
import { MyButtonCreate, MyDateInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { useState } from 'react';
import { I_hbwyvjoqgu } from './F_hbwyvjoqgu_Read';


export default function F_hbwyvjoqgu_Create() {
    const [value, setValue] = useState(new Date());
    const form = useForm<I_hbwyvjoqgu>({
        initialValues: {
            studentCode: "",
            birthDate: new Date("2000-01-01"),
            sex: "Nam",
            bloodGroud: "",
            medicalHistory: "",
            conclude: "",
            hospitalDate: new Date(),
            healthStatus: "",
            diagnosis:"",
            medic:"",
            suggestion: "",
            result: "",
            nguoiCapNhat: "Quản trị viên",
            ngayCapNhat: new Date("2024-12-23")
        },
        validate: {
            studentCode: (value) => (value ? null : 'Mã là bắt buộc'),
            hospitalDate: (value) => (value ? null : 'Ngày khám là bắt buộc'),
            healthStatus: (value) => (value ? null : 'Tình trạng sức khỏe là bắt buộc'),
            diagnosis: (value) => (value ? null : 'Chuẩn đoán cơ sở là bắt buộc'),
        },
    });


    return (
        <MyButtonCreate modalSize={"50%"} title='Chi tiết chăm sóc sức khỏe hằng ngày học sinh' form={form} onSubmit={()=>{}} >
        <MySelect
            withAsterisk
            label="Học sinh"
            placeholder="Chọn học sinh"
            data={['HS000001 - Tô Ngọc Lâm', 'HS000002 - Đặng Ngọc Lâm', 'HS000003 - Huỳnh Ngọc Lâm']}
            defaultValue="HS000001 - Tô Ngọc Lâm"
            mb={10}
        />
        <MyDateInput  label='Ngày sinh' {...form.getInputProps("birthDate")}/>
        <MyTextInput disabled label='Giới tính '  {...form.getInputProps("sex")} />
        <MyTextInput label='Nhóm máu'  {...form.getInputProps("bloodGroud")} />
        <MyTextInput label='Tiền sử bệnh lý'  {...form.getInputProps("medicalHistory")} />
        <MyTextInput label='Kết luận y tế '  {...form.getInputProps("conclude")} />
        <MyDateInput label='Ngày khám' {...form.getInputProps("hospitalDate")}/>
            <MyTextInput label='Tình trạng sức khỏe '  {...form.getInputProps("healthStatus")} />
            <MyTextInput label='Chuẩn đoán cơ sở '  {...form.getInputProps("diagnosis")} />
            <MyTextInput label='Chỉ định thuốc '  {...form.getInputProps("medic")} />
            <MyTextInput label='Đề nghị y tế '  {...form.getInputProps("suggestion")} />
            <MyTextInput label='Kết quả xử lý đề nghị '  {...form.getInputProps("result")} />
    </MyButtonCreate>
    )
}