'use client';
import MyActionIconUpdate from "@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyDateInput from "@/components/ui/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/ui/Inputs/TextInput/MyTextInput";
import { Select } from "@mantine/core";
import { useForm } from '@mantine/form';
import { I_t2gufmu9g3_Read } from "./F_t2gufmu9g3_Read";

export default function F_t2gufmu9g3_Update({ values }: { values: I_t2gufmu9g3_Read }) {
    const form = useForm<I_t2gufmu9g3_Read>({
        // initialValues: {
        //     code: values.code || "",
        //     name: values.name || "",
        //     position: values.position || "",
        //     decisionNumber: values.decisionNumber || "",
        //     effectiveDate: values.effectiveDate || undefined, 
        //     expiryDate: values.expiryDate || undefined,
        //     issuedBy: values.issuedBy || "",
        //     link: values.link || "",
        // },
        initialValues: values
    });


    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã nhân sự" {...form.getInputProps("code")} />
            <MyTextInput label="Họ tên" {...form.getInputProps("name")} />
            <Select label="Chức vụ" {...form.getInputProps("position")} data={["Chủ tịch Hội đồng Đại học", "Hiệu trưởng/ giám đốc cơ sở giáo dục đại học"]} />
            <MyTextInput label="Số quyết định" {...form.getInputProps("decisionNumber")} />
            <MyDateInput label="Ngày hiệu lực" {...form.getInputProps("effectiveDate")} />
            <MyDateInput label="Ngày hết hiệu lực" {...form.getInputProps("expiryDate")} />
            <MyTextInput label="Nơi ban hành" {...form.getInputProps("issuedBy")} />
            <MyTextInput label="Link Website" {...form.getInputProps("link")} />
        </MyActionIconUpdate>);
}
