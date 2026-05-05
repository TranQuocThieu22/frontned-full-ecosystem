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
export default function F_tffo45cric_Create() {
    const form = useForm<I>({
        initialValues: {
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết Danh sách lãnh đạo chủ chốt'>
            <Select
                label="Loại văn bản"
                {...form.getInputProps("documentType")}
                data={[
                    "Chiến lược kế hoạch phát triển",
                    "Quy chế tổ chức và hoạt động",
                    "Quy chế tài chính",
                    "Quy chế dân chủ",
                    "Danh mục vị trí việc làm",
                    "Quy định về công tác cán bộ, nhân sự",
                    "Quy định về đảm bảo chất lượng",
                ]}
                defaultValue={"Quy định về đảm bảo chất lượng"}
            />
            <MyTextInput label="Số văn bản" {...form.getInputProps("documentNumber")} />
            <MyDateInput label="Ngày ban hành"  {...form.getInputProps("issueDate")} />
            <MyTextInput label="Tên văn bản của cơ sở" {...form.getInputProps("institution")} />
            <Select

                label="Tình trạng"
                {...form.getInputProps("status")}
                data={["Đã ban hành", "Chưa ban hành"]}
                defaultValue={"Đã ban hành"}
            />
            <MyTextInput label="Link Website" {...form.getInputProps("webLink")} />
        </MyButtonCreate>
    )
}


