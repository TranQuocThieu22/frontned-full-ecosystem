'use client';
import MyActionIconUpdate from '@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyDateInput from '@/components/ui/Inputs/DateInput/MyDateInput';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import { Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import { I_tffo45cric_Read } from "./F_tffo45cric_Read";

export default function F_tffo45cric_Update({ values }: { values: I_tffo45cric_Read }) {
    const form = useForm<I_tffo45cric_Read>({
        initialValues: {
            id: values.id || 0,
            documentType: values.documentType || "",
            status: values.status || "",
            documentNumber: values.documentNumber || "",
            issueDate: values.issueDate || undefined,
            institution: values.institution || "",
            webLink: values.webLink || "",
        },
    });

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
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
            />
            <MyTextInput label="Số văn bản" {...form.getInputProps("documentNumber")} />
            <MyDateInput label="Ngày ban hành"  {...form.getInputProps("issueDate")} />
            <MyTextInput label="Tên văn bản của cơ sở" {...form.getInputProps("institution")} />
            <Select

                label="Tình trạng"
                {...form.getInputProps("status")}
                data={["Đã ban hành", "Chưa ban hành"]}
            />
            <MyTextInput label="Link Website" {...form.getInputProps("webLink")} />
        </MyActionIconUpdate>);
}
