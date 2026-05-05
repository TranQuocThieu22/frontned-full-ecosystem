'use client'
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
import MyNumberInput from '@/components/ui/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';


interface I {
    id?: number;          // Unique identifier
    statisticalIndicator?: string;
    bachelor?: number;
    master?: number;
    doctorate?: number;
    notes?: string;
    reportYear?: string;
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}
export default function F_oqx2kb9ikm_Create() {
    const currentYear = new Date().getFullYear().toString(); // Get the current year as a string

    const form = useForm<I>({
        initialValues: {
            reportYear: currentYear, // Set the default value for the report year
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết Danh sách chỉ số thống kê giảng viên'>
            <Select
                label="Chỉ số thống kê"
                {...form.getInputProps("statisticalIndicator")}
                data={[
                    { value: "Số giảng viên toàn thời gian", label: "Số giảng viên toàn thời gian" },
                    { value: "Số giảng viên cơ hữu trong độ tuổi lao động", label: "Số giảng viên cơ hữu trong độ tuổi lao động" },
                    { value: "Số giảng viên toàn thời gian có chỗ làm", label: "Số giảng viên toàn thời gian có chỗ làm" },
                ]}
            />
            <MyNumberInput label="Đại học" {...form.getInputProps("bachelor")} />
            <MyNumberInput label="Thạc sĩ" {...form.getInputProps("master")} />
            <MyNumberInput label="Tiến sĩ" {...form.getInputProps("doctorate")} />
            <MyTextInput label="Năm báo cáo" {...form.getInputProps("reportYear")} value={currentYear} readOnly />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyButtonCreate>
    )
}


