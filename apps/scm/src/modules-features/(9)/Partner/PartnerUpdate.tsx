'use client'
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { Partner } from "./PartnerLayout";

export default function PartnerUpdate({ values }: { values: Partner }) {
    const form = useForm<Partner>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate
            title="Chi tiết đối tác"
            form={form}
            onSubmit={() => { }}
            modalSize="50%"
        >
            <MyTextInput label="Mã đối tác" {...form.getInputProps("code")} />
            <MyTextInput label="Tên đối tác" {...form.getInputProps("name")} />
            <MySelect
                defaultValue={"Trường đại học"}
                data={["Trường đại học", "Doanh nghiệp"]}
                label="Loại hình đối tác"
                {...form.getInputProps("type")}
            />
            <MyTextInput label="Quốc gia" {...form.getInputProps("region")} />
            <MySelect
                defaultValue={"Trường đại học"}
                data={["Y sinh", "Công nghệ thông tin", "Năng lượng tái tạo"]}
                label="Lĩnh vực hợp tác"
                {...form.getInputProps("cooperationType")}
            />
            <MyTextInput label="Thông tin liên hệ" {...form.getInputProps("contactInfo")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("notes")} />
        </MyActionIconUpdate>
    )
}
