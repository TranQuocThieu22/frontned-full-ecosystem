'use client'
import { DayOffRequest } from "@/shared/interfaces/DayOffRequest";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Checkbox, Group, Radio, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function ApproveAbsenceApproveLeave({ values }: { values: DayOffRequest }) {
    const form = useForm<DayOffRequest>({
        mode: "uncontrolled",
    })
    useEffect(() => {
        form.setValues({
            id: values.id,
            code: values.code,
            name: values.name,
            concurrencyStamp: values.concurrencyStamp,
            note: values.note,
            isSentMail: values.isSentMail,
            status: values.status
        })
    }, [values])
    return (
        <CustomButtonCreateUpdate
            modalProps={{ size: "lg" }}
            buttonProps={{
                actionType: "create",
                children: "Duyệt"
            }}
            isUpdate={false}
            form={form}
            onSubmit={(values) => {
                return baseAxios.post("/DayOffRequest/ApproveLeave", values)
            }}
        >
            <Radio.Group
                withAsterisk
                value={form.getValues().status?.toString()}
                onChange={e => form.setFieldValue("status", parseInt(e))}
            >
                <Group>
                    <Radio value={"1"} label="Duyệt" />
                    <Radio value={"2"} label="Hủy yêu cầu" />
                </Group>
            </Radio.Group>
            <Textarea label="Phản hồi" {...form.getInputProps("note")} />
            <Checkbox
                label="Gửi thông báo qua Email"
                {...form.getInputProps("isSentMail", { type: "checkbox" })}
                onChange={e => form.setFieldValue("isSentMail", e.currentTarget.checked)}
            />
        </CustomButtonCreateUpdate>
    )
}
