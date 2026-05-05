'use client'
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface I {
    id?: number;          // Unique identifier
    indicatorCode?: string;  // Mã chỉ số
    indicatorName?: string;  // Tên chỉ số
    targetValue?: number;    // Chi tiêu (Numeric)
    resultValue?: number;    // Kết quả (Numeric)
    reportYear?: string;     // Năm báo cáo (Extracted from effectiveDate)
    remarks?: string;        // Ghi chú
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}

export default function F_h8kz9e8j7d_Create() {
    const currentYear = new Date().getFullYear().toString(); // Get the current year as a string

    const form = useForm<I>({
        initialValues: {
            reportYear: currentYear, // Set the default value for the report year
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết Danh sách chỉ số hoạt động chính'>
            <MyTextInput label="Mã chỉ số" {...form.getInputProps("indicatorCode")} />
            <MyTextInput label="Tên chỉ số" {...form.getInputProps("indicatorName")} />
            <NumberInput label="Chi tiêu" {...form.getInputProps("targetValue")} min={0} />
            <NumberInput label="Kết quả" {...form.getInputProps("resultValue")} min={0} />
            <MyTextInput label="Năm báo cáo" {...form.getInputProps("reportYear")} value={currentYear} readOnly />
            <MyTextInput label="Ghi chú" {...form.getInputProps("remarks")} />
        </MyButtonCreate>
    );
}
