        'use client'
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyActionIconUpdate, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { CooperationProposalResearch } from "./ReadCooperationProposal";

export default function CooperationProposalUpdate({ values }: { values: CooperationProposalResearch }) {
    const form = useForm<CooperationProposalResearch>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Chi tiết đề xuất hợp tác" form={form} onSubmit={() => { }} modalSize={"60%"}>
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
        </MyActionIconUpdate>
    )
}
