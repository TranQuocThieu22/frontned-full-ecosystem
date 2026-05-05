'use client'
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';


interface I {
    id?: number;
    campusCode?: string;         // Mã khuôn viên
    campusName?: string;         // Tên khuôn viên
    usageType?: string;          // Hình thức sử dụng
    landArea?: number;           // Diện tích đất
    campusCoefficient?: number;  // Hệ số khuôn viên
    convertedArea?: number;      // Diện tích quy đổi
    address?: string;            // Địa chỉ
    remarks?: string;            // Ghi chú
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật

}
export default function F_zvsdgn3tko_Create() {
    const form = useForm<I>({
        initialValues: {
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết Danh sách khuôn viên'>
            <MyTextInput label="Mã khuôn viên" {...form.getInputProps("campusCode")} />
            <MyTextInput label="Tên khuôn viên" {...form.getInputProps("campusName")} />
            <Select
                label="Hình thức sử dụng"
                {...form.getInputProps("usageType")}
                data={["Sở hữu", "Liên kết", "Thuê lâu năm"]}
            />
            <NumberInput label="Diện tích đất" {...form.getInputProps("landArea")} min={0} />
            <NumberInput label="Hệ số khuôn viên" {...form.getInputProps("campusCoefficient")} min={0} />
            <NumberInput label="Diện tích quy đổi" {...form.getInputProps("convertedArea")} min={0} />
            <MyTextInput label="Địa chỉ" {...form.getInputProps("address")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("remarks")} />
        </MyButtonCreate>
    )
}


