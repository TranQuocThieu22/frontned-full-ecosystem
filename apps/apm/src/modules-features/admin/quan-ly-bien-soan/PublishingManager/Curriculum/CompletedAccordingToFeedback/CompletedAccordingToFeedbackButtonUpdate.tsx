'use client'
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
    MyButton,
    MyButtonModal,
    MyFileInput,
    MySelect,
    MyTextArea
} from "aq-fe-framework/components";
import { UpdatedDraftProposal } from "./CompletedAccordingToFeedbackRead";


export default function CompletedAccordingToFeedbackButtonUpdate({ values }: { values: UpdatedDraftProposal }) {
    const disc = useDisclosure();

    const form = useForm<UpdatedDraftProposal>({
        initialValues: {
            ...values,
        },
    });

    return (
        <MyButtonModal
            title="Chi tiết nhiệm vụ hoàn thiện"
            variant="transparent"
            color="blue"
            modalSize={"lg"}
            disclosure={disc}
            label="Cập nhật"
        >
            <MySelect data={["Đang xử lý", "Đã hoàn thành", "Chưa bắt đầu"]} label="Trạng thái nhiệm vụ" {...form.getInputProps("completionStatus")} />
            <MyTextArea label="Ghi chú chung về nhiệm vụ hoàn thiện"  {...form.getInputProps("note")} />
            <MyFileInput label="Tài liệu/File sản phẩm đã chỉnh sửa" {...form.getInputProps("fileUrl")} />
            <MyButton onClick={() => { disc[1].close() }} crudType="save" w="100%" />
        </MyButtonModal>
    );
}
