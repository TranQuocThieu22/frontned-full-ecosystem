'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { CooperationProposalResearch } from "./ReadCooperationProposal";

export default function CooperationProposalCreate() {

    const form = useForm<CooperationProposalResearch>({

    })

    return (
        <MyButtonCreate
            title="Chi tiết đề xuất hợp tác"
            modalSize={"60%"}
            form={form} onSubmit={() => { }}
        >
            <SimpleGrid cols={2}>
                <MyTextInput
                    label="Mã đề xuất"
                    {...form.getInputProps("coreProposal")}
                />
                <MyDateInput
                    label="Ngày gửi"
                    rightSection={<IconCalendarWeek />}
                    {...form.getInputProps("date")}
                />

                <MyTextInput
                    label="Tên đề xuất"
                    {...form.getInputProps("name")}
                />

                <MySelect
                    label="Trạng thái duyệt"
                    defaultValue={"Trao đổi sinh viên"}
                    data={[
                        "Đã chấp nhận",
                        "Đang chờ duyệt",
                        "Không chấp nhận",
                    ]}
                    {...form.getInputProps("proposalStatus")}
                />

                <MySelect
                    label="Cơ hội"
                    defaultValue={""}
                    data={[
                        "CH-2025-001",
                        "CH-2025-002",
                    ]}
                    {...form.getInputProps("codeOpportunity")}
                />

                <MyTextInput
                    label="Kinh phí đề xuất"
                    {...form.getInputProps("price")}
                />

                <MyTextInput
                    label="Chủ nhiệm"
                    {...form.getInputProps("internalManager")}
                />

                <MyFileInput label="File đính kèm"
                    {...form.getInputProps("link")} />
            </SimpleGrid>

            <MyTextArea
                label="Kết quả"
                {...form.getInputProps("results")}
            />
        </MyButtonCreate>
    )
}
