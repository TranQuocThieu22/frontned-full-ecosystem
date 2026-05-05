'use client'
import { SimpleGrid, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyDateInput, MySelect } from "aq-fe-framework/components";
import { I_InteractionTable } from "./PartnerTable";
export default function PartnerCreate() {
    const form = useForm<I_InteractionTable>({
        initialValues: {
            code: "",
            partnerCode: "",
            interactionDate: undefined,
            type: "",
            content: "",
            performer: "",
            note: ""
        }
    })
    return (
        <MyButtonCreate modalSize="70%" title="Chi tiết tương tác" form={form} onSubmit={() => { }} >
            <SimpleGrid cols={2} spacing="md">
                <Stack>
                    <MyDateInput label="Ngày tương tác" {...form.getInputProps("interactionDate")} />
                    <MySelect data={["DTQT-002", "DTQT-003"]} label="Đối tác" {...form.getInputProps("partnerCode")} />
                    <Textarea label="Nội dung tương tác" minRows={3}  {...form.getInputProps("content")} />
                </Stack>
                <Stack>
                    <MySelect label="Loại tương tác" data={["Gặp mặt trực tiếp", "Email", "Điện thoại", "Họp trực tuyến", "Công văn"]} {...form.getInputProps("type")} />
                    <MySelect label="Người thực hiện (Nội bộ)" data={["GV005 - TS. Trần Bình", "CB010 - ThS. Lê Hoa"]} {...form.getInputProps("performer")} />
                    <Textarea label="Ghi chú/Kết quả" minRows={3} {...form.getInputProps("note")} />
                </Stack>
            </SimpleGrid >
        </MyButtonCreate>
    )
}