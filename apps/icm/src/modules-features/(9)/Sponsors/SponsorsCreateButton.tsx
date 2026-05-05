'use client'

import { MultiSelect, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyDateInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { I_Sponsor } from "./SponsorsTable";

export default function SponsorCreateButton() {
    const form = useForm<I_Sponsor>({
        initialValues: {
            code: "",
            name: "",
            sponsorName: "",
            sponsorType: "",
            deadline: "",
            description: "",
            contact: ""
        }
    })
    
    return (
        <MyButtonCreate modalSize="70%" objectName="chương trình tài trợ" form={form} onSubmit={() => {
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <MyTextInput label="Mã chương trình" {...form.getInputProps("code")} />
                <MyTextInput label="Tên chương trình" {...form.getInputProps("name")} />
                <MultiSelect
                    label="Lĩnh vực"
                    data={[
                        "Giáo dục",
                        "Trao đổi sinh viên & cán bộ",
                        "Y sinh",
                        "Sức khỏe kĩ thuật số",
                        "Đa lĩnh vực (tùy đề xuất)",
                    ]}
                />                <MySelect label="Tổ chức tài trợ" data={["Liên minh Châu Âu", "Japan Society for the Promotion of Science"]} {...form.getInputProps("sponsorName")} />
                <MyDateInput label="Thời hạn nộp hồ sơ" {...form.getInputProps("deadline")} />
                <MyTextInput label="Liên hệ" {...form.getInputProps("contact")} />
            </div>
            <div style={{ marginTop: 16 }}>
                <Textarea label="Mô tả" minRows={3} placeholder="Nhập mô tả rõ ràng về chương trình tài trợ" {...form.getInputProps("description")} />
            </div>
        </MyButtonCreate>
    )
}
