'use client'
import MyButtonCreate from '@/components/ui/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';


interface I {
    id?: number;          // Unique identifier
    reportType?: string;    // Loại file báo cáo
    result?: string;        // Kết quả
    reportYear?: string;    // Năm báo cáo
    notes?: string;         // Ghi chú
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}
export default function F_giu5vmfd49_Create() {
    const currentYear = new Date().getFullYear().toString(); // Get the current year as a string

    const form = useForm<I>({
        initialValues: {
            reportYear: currentYear, // Set the default value for the report year
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết Danh sách file báo cáo HEMIS'>
            <Select
                label="Loại file"
                {...form.getInputProps("reportType")}
                data={[
                    { value: "Bảng 1A: Danh sách lãnh đạo chủ chốt", label: "Bảng 1A: Danh sách lãnh đạo chủ chốt" },
                    { value: "Bảng 1B: Tình trạng hoàn thiện các văn bản", label: "Bảng 1B: Tình trạng hoàn thiện các văn bản" },
                    { value: "Bảng 1C: Kết quả thực hiện các chỉ số hoạt động chính", label: "Bảng 1C: Kết quả thực hiện các chỉ số hoạt động chính" },
                    { value: "Bảng 2A: Đội ngũ giảng viên toàn thời gian", label: "Bảng 2A: Đội ngũ giảng viên toàn thời gian" },
                    { value: "Bảng 3A: Khuôn viên trụ sở chính và các phân hiệu", label: "Bảng 3A: Khuôn viên trụ sở chính và các phân hiệu" },
                    { value: "Bảng 3B: Công trình phục vụ đào tạo và nghiên cứu", label: "Bảng 3B: Công trình phục vụ đào tạo và nghiên cứu" },
                    { value: "Bảng 3C: Giáo trình, tài liệu học tập bắt buộc", label: "Bảng 3C: Giáo trình, tài liệu học tập bắt buộc" },
                    { value: "Bảng 3D: Hạ tầng công nghệ thông tin", label: "Bảng 3D: Hạ tầng công nghệ thông tin" },
                    { value: "Bảng 4: Báo cáo thu nhập", label: "Bảng 4: Báo cáo thu nhập" },
                    { value: "Bảng 5A: Kết quả đào tạo và tuyển sinh", label: "Bảng 5A: Kết quả đào tạo và tuyển sinh" },
                    { value: "Bảng 5B: Quy mô đào tạo theo lĩnh vực và trình độ", label: "Bảng 5B: Quy mô đào tạo theo lĩnh vực và trình độ" },
                    { value: "Bảng 6A: Công bố khoa học của giảng viên", label: "Bảng 6A: Công bố khoa học của giảng viên" },
                    { value: "Bảng KS-1: Kết quả khảo sát người học", label: "Bảng KS-1: Kết quả khảo sát người học" },
                ]}
            />
            <Select
                label="Kết quả"
                {...form.getInputProps("result")}
                data={[
                    { value: "Đầy đủ", label: "Đầy đủ" },
                    { value: "Còn thiếu", label: "Còn thiếu" },
                ]}
            />
            <MyTextInput label="Năm báo cáo" {...form.getInputProps("reportYear")} value={currentYear} readOnly />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyButtonCreate>
    )
}


