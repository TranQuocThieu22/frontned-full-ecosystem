'use client'
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
import MyDateInput from '@/components/ui/Inputs/DateInput/MyDateInput';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';


interface I {
    id?: number;          // Unique identifier
    code?: string;        // Mã nhân sự
    name?: string;        // Họ tên
    position?: string;    // Chức vụ
    decisionNumber?: string; // Số quyết định
    effectiveDate?: Date; // Ngày hiệu lực
    expiryDate?: Date;    // Ngày hết hiệu lực
    issuedBy?: string;    // Nơi ban hành
    link?: string;
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật

}
export default function F_t2gufmu9g3_Create() {
    const form = useForm<I>({
        initialValues: {
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết Danh sách lãnh đạo chủ chốt'>
            <MyTextInput label="Mã nhân sự" {...form.getInputProps("code")} />
            <MyTextInput label="Họ tên" {...form.getInputProps("name")} />
            <Select label="Chức vụ" {...form.getInputProps("position")} data={["Chủ tịch hội đồng trường/ hội đồng đại học", "Hiệu trưởng/ giám đốc cơ sở giáo dục đại học"]} defaultValue={"Chủ tịch hội đồng trường/ hội đồng đại học"} />
            <MyTextInput label="Số quyết định" {...form.getInputProps("decisionNumber")} />
            <MyDateInput label="Ngày hiệu lực"  {...form.getInputProps("effectiveDate")} />
            <MyDateInput label="Ngày hết hiệu lực" {...form.getInputProps("expiryDate")} />
            <MyTextInput label="Nơi ban hành" {...form.getInputProps("issuedBy")} />
            <MyTextInput label="Link Website" {...form.getInputProps("link")} />
        </MyButtonCreate>
    )
}


