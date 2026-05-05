import baseAxios from "@/api/config/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { IDayOffRequest } from "@/interfaces/DayOffRequest";
import { Group, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyCheckbox, MyTextArea } from "aq-fe-framework/components";
import { useEffect } from "react";
export default function F_ozjablkxer_ApproveLeave({ values }: { values: IDayOffRequest }) {
    const form = useForm<IDayOffRequest>({
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
        <MyButtonCreate
            modalSize={"lg"}
            label="Duyệt"
            title="Duyệt nghỉ dạy"
            form={form}
            onSubmit={async (values) => {
                return await baseAxios.post("/DayOffRequest/ApproveLeave", values)
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
            <MyTextArea label="Phản hồi" {...form.getInputProps("note")} />
            <MyCheckbox
                label="Gửi thông báo qua Email"
                {...form.getInputProps("isSentMail", { type: "checkbox" })}
                onChange={e => form.setFieldValue("isSentMail", e.currentTarget.checked)}
            />

        </MyButtonCreate>
    )
}
