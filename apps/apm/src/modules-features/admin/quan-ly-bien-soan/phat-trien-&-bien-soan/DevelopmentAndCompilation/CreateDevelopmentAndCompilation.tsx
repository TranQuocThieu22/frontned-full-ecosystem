'use client'
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput, } from "aq-fe-framework/components";
import { SimpleGrid } from "@mantine/core";
import { DevelopmentAndCompilation } from "./ReadDevelopmentAndCompilation";
import { IconCalendarWeek } from "@tabler/icons-react";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";

export enum Editorapproved {
    approved = '1',
    Pending_approval = '2',
    refuse_to_approve = '3',
}

export const EditorialBoardLabel: Record<Editorapproved, string> = {
    [Editorapproved.approved]: 'Đã duyệt',
    [Editorapproved.Pending_approval]: 'Đang chờ duyệt',
    [Editorapproved.refuse_to_approve]: 'Từ chối',
};

const roleOptions = Object.entries(EditorialBoardLabel).map(([key, value]) => ({
    value: key.toString(),
    label: value,
}))

export default function DevelopmentAndCompilationCreate() {

    const form = useForm<DevelopmentAndCompilation>({
    })
    return (
        <MyButtonCreate modalSize={"60%"} title="Chi tiết giao nộp" form={form} onSubmit={() => { }}>
            <SimpleGrid cols={2}>
                <MyTextInput
                    label="Ban Biên soạn"
                    {...form.getInputProps("editorInChief")}
                />
                <MySelect
                    label="Đề xuất"
                    data={
                        roleOptions
                    }
                />
                <MyDateInput
                    label="Ngày giao nộp thực tế"
                    rightSection={<IconCalendarWeek />}
                    {...form.getInputProps("deliveryDate")}
                />
                <MyTextInput
                    label="Phiên bản bản thảo"
                    {...form.getInputProps("manuscriptVerson")}
                />
                <MyTextArea
                    label="Mô tả bản thảo"
                    {...form.getInputProps("comments")}
                />
                <MyFileInput label="Tải lên file bản thảo" />
            </SimpleGrid>
        </MyButtonCreate>
    )
}
