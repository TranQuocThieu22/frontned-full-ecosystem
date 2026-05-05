'use client'
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyCheckbox, MyTextArea } from "aq-fe-framework/components";
import { MyButtonModal, MySelect } from "aq-fe-framework/core";
import { IClassInfo } from "./LessonReviewsApprovalTable";


export default function ApprovalButton({ values }: { values: IClassInfo }) {
    const dics = useDisclosure();

    const form = useForm<IClassInfo>({
        mode: "uncontrolled",
        initialValues: values
    })

    return (
        <MyButtonModal
            disclosure={dics}
            modalProps={{
                title: "Duyệt nhận xét",
                size: "30%"
            }}
            buttonProps={{
                variant: "outline",
                children: "Duyệt"
            }}
        >
            <MySelect
                label="Duyệt"
                data={[
                    "Chưa duyệt",
                    "Duyệt",
                    "Yêu cầu hiệu chỉnh"
                ]}
                {...form.getInputProps("qualityApproved")}
            />
            <MyTextArea
                label="Nhận xét"
                {...form.getInputProps("note")}
            />
            <MyCheckbox label="Gửi thông báo" />
            <MyButton crudType="save" />
        </MyButtonModal>
    )
}