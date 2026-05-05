'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { MultiSelect, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyDateInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { I_Sponsor } from "./SponsorsTable";

export default function Update_Sponsors({ values }: { values: I_Sponsor }) {
    const form = useForm<I_Sponsor>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate modalSize="70%" title="Chi tiết chương trình tài trợ" form={form} onSubmit={() => {
        }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <MyTextInput label="Mã chương trình" {...form.getInputProps("code")} />
                <MyTextInput label="Tên chương trình" {...form.getInputProps("name")} />
                <MultiSelect
                    label="Lĩnh vực"
                    defaultValue={values.sponsorType?.split(";").map((s) => s.trim())}
                    data={[
                        "Giáo dục",
                        "Trao đổi sinh viên & cán bộ",
                        "Y sinh",
                        "Sức khỏe kĩ thuật số",
                        "Đa lĩnh vực (tùy đề xuất)",
                    ]}
                />
                <MySelect label="Tổ chức tài trợ" data={["Liên minh Châu Âu", "Japan Society for the Promotion of Science"]} {...form.getInputProps("sponsorName")} />
                <MyDateInput label="Thời hạn nộp hồ sơ" {...form.getInputProps("deadline")} />
                <MyTextInput label="Liên hệ" {...form.getInputProps("contact")} />
            </div>
            <div style={{ marginTop: 16 }}>
                <Textarea label="Mô tả" minRows={3} {...form.getInputProps("description")} />
            </div>
        </MyActionIconUpdate>
    )
}
