'use client'

import { Select, SimpleGrid, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyDateInput } from "aq-fe-framework/components";
import { I_EvaluationSuggestion } from "./Read_EvaluationSuggestion";

export default function Update_EvaluationSuggestion({ row }: { row: I_EvaluationSuggestion | null }) {
    const disc = useDisclosure()
    const form = useForm<I_EvaluationSuggestion>({
        initialValues: row || {} as I_EvaluationSuggestion
    });
    return (
        <MyButtonModal label="Cập nhật" color="blue.4" disclosure={disc} modalSize="70%" title="Chi tiết tổng hợp" onSubmit={() => { }}>
            <SimpleGrid cols={2} spacing="md">
                <Stack>
                    <MyDateInput
                        label="Ngày tổng hợp"
                        value={form.values.date ? new Date(form.values.date) : null}
                        onChange={d => form.setFieldValue("date", (typeof d === 'object' && d !== null) ? (d as Date).toISOString().slice(0, 10) : "")}
                        required
                    />
                    <Textarea label="Nhận xét tổng hợp & Yêu cầu chỉnh" minRows={4} {...form.getInputProps("summary")} />
                </Stack>
                <Stack>
                    <Select
                        label="Người tổng hợp"
                        data={["Cán bộ Nguyễn Y"]}
                        value={form.values.summarizer}
                        onChange={value => form.setFieldValue("summarizer", value || "")}
                        searchable
                        required
                    />
                    <Textarea label="Kết luận chất lượng tổng thể" minRows={4} {...form.getInputProps("conclusion")} />
                </Stack>
            </SimpleGrid>


            <MyButton type="submit" crudType="update" color="green">Lưu</MyButton>
        </MyButtonModal>
    );
}