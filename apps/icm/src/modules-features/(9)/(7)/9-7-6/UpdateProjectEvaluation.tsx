'use client'
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyButtonModal, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { ProjectEvaluation } from "./ReadProjectEvaluation";
import { MyButton } from "@/components/Buttons/Button/MyButton";
export default function ProjectEvaluationUpdate({ values }: { values: ProjectEvaluation }) {
    const disclosure = useDisclosure();
    const form = useForm<ProjectEvaluation>({
        initialValues: values
    })

    return (
        <MyButtonModal
        title="Chi tiết kết quả dự án"
            modalSize={"40%"} disclosure={disclosure}  label="Đánh giá">
            <MyTextInput
                label="Dự án"
                {...form.getInputProps("name")}
            />
            <MySelect
                data={['Hoàn thành', 'Chưa hoàn thành']} label="Trạng thái"
                {...form.getInputProps("status")}            />

            <MyDateInput
                label="Ngày hoàn thành"
                rightSection={<IconCalendarWeek />}
                {...form.getInputProps("completionDate")}
            />
            <MyTextArea
                label="Kết quả đạt được"
                {...form.getInputProps("results")}
            />
            <MyTextArea
                label="Đánh giá tổng kết"
                {...form.getInputProps("assessment")}
            />
            <MyButton crudType="save" color="blue" onClick={() => disclosure[1].close()}>Lưu</MyButton>
        </MyButtonModal>
    )
}