'use client'
import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyActionIconUpdate, MyDateInput, MyFileInput, MySelect, MyTextArea } from "aq-fe-framework/components";
import { ProtectionRegistration } from "./ReadProtectionRegistration";

export default function ProtectionRegistrationUpdate({ values }: { values: ProtectionRegistration }) {
    const form = useForm<ProtectionRegistration>({
        initialValues: {
            ...values,
            completionDate: values.completionDate !== "N/A" ? values.completionDate : undefined,
        }
    })
    return (
        <MyActionIconUpdate title="Chi tiết loại đề tài" form={form} onSubmit={() => { }} modalSize={"50%"} >
            <Text>Giai đoạn: <Text span> {values.projectCode} - {values.name}  </Text></Text>


            <MySelect
                data={["Sắp bắt đầu", "Đang triển khai", "Đã hoàn thành"]} label="Trạng thái"
                {...form.getInputProps("status")}            />
            <MyDateInput
                label="Ngày hoàn thành thực tế"
                rightSection={<IconCalendarWeek />}
                {...form.getInputProps("completionDate")}
            />

            <MyFileInput label="File đính kèm"
                {...form.getInputProps("link")} />

            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("notes")}
            />
        </MyActionIconUpdate>
    )
}
