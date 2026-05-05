'use client'
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IInfoViewModel } from "./ReadReviewType";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
export default function ReviewTypeCreate() {
    const form = useForm<IInfoViewModel>({
    })

    return (
        <MyButtonCreate
            title="Chi tiết loại xét duyệt"
            form={form} onSubmit={() => { }}
            modalSize={"60%"}
        >
            <MyTextInput
                label="Mã quy trình"
                {...form.getInputProps("maQuyTrinh")}
            />

            <MyTextInput
                label="Tên quy trình"
                {...form.getInputProps("tenQuyTrinh")}
            />
            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("ghiChu")}
            />
        </MyButtonCreate>
    )
}