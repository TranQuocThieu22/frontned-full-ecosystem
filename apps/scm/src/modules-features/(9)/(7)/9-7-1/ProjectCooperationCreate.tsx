'use client'
import { SimpleGrid, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyDateInput, MyNumberInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { I_ProjectCollaborationTable } from "./ProjectCooperationTable";

export default function ProjectCooperationCreate() {
    const form = useForm<I_ProjectCollaborationTable>({
        initialValues: {
            code: "",
            name: "",
            partnerCode: "",
            agreementCode: "",
            startDate: undefined,          
            endDate: undefined,
            field: "",
            budget: 0,
            summary: "",
            representative: ""
        }
    })
    return (
        <MyButtonCreate modalSize="70%" title="Chi tiết hợp tác" form={form} onSubmit={() => { }}>
            <SimpleGrid cols={3} spacing="md">
                <Stack>
                    <MyTextInput label="Mã dự án" {...form.getInputProps("code")} />
                    <MyTextInput label="Tên dự án" {...form.getInputProps("name")} />
                    <MyNumberInput label="Kinh phí" {...form.getInputProps("budget")} />
                </Stack>
                <Stack>
                    <MyDateInput label="Thời gian bắt đầu" {...form.getInputProps("startDate")} />
                    <MySelect label="Đại diện kết nối" data={["GV005-TS.Trần Bình,CB010-ThS.Lê Hoa"]} {...form.getInputProps("representative")} />
                    <MySelect label="Đối tác" data={["DTQT-002", "DTQT-003"]} {...form.getInputProps("partnerCode")} />
                </Stack>
                <Stack>
                    <MySelect label="Mã thoả thuận" data={["THTQT-2024-002", "THTQT-2024-001"]} {...form.getInputProps("agreementCode")} />
                    <MySelect label="Lĩnh vực" data={["Y sinh", "Trí tuệ nhân tạo"]} {...form.getInputProps("field")} />
                    <MyDateInput label="Thời gian kết thúc dự kiến" {...form.getInputProps("endDate")} />
                </Stack>

            </SimpleGrid>
            <Textarea label="Tóm tắt dự án" minRows={3} {...form.getInputProps("summary")} />
        </MyButtonCreate>
    )
}