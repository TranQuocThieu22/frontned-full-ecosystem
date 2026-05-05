'use client';
import MyActionIconUpdate from '@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import { I_giu5vmfd49_Read } from "./F_giu5vmfd49_Read";

export default function F_giu5vmfd49_Update({ values }: { values: I_giu5vmfd49_Read }) {
    const form = useForm<I_giu5vmfd49_Read>({
        initialValues: {
            reportType: values.reportType || "",  // Default to empty string if no value is provided
            result: values.result || "",   // Default value for result selection
            reportYear: values.reportYear || "", // Default to current year
            notes: values.notes || "",          // Default to empty string for notes
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
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
            <MyTextInput readOnly label="Năm báo cáo" {...form.getInputProps("reportYear")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
        </MyActionIconUpdate>
    );
}
