
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { Group, SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButtonModal, MyCheckbox, MyFieldset, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { I_CurriculumApprovalTable } from "./CurriculumApprovalTable";

export default function CurriculumApprovalValidation({ data }: { data: I_CurriculumApprovalTable }) {
    const discolusre = useDisclosure(false);

    const form = useForm<I_CurriculumApprovalValidation>({
        initialValues: {
            approvalStatus: data.viewerStatus,
            approvalDate: data.approvalDate,
            finalDecision: data.finalDecision,
            notification: false,
            reviewerFeedback: data.reviewerFeedback,
            editRequestDetail: data.editRequest,
        },
    });

    return (

        <MyButtonModal
            label="Duyệt"
            title="Chi tiết đề xuất"
            onSubmit={() => { }} crudType="default" w={'100%'}
            disclosure={discolusre}
            modalSize="80%">

                <SimpleGrid cols={2}>
                    <Stack>
                        <MySelect
                            data={approvalStatusMock.map((item) => ({ value: item.value, label: item.label }))}
                            defaultValue={data.viewerStatus}
                            label="Trạng thái xét duyệt" >

                        </MySelect>
                        <MyTextInput label="Quyết định cuối cùng" {...form.getInputProps("finalDecision")} />
                        <MyTextArea label="Ý kiến/ Góp ý của người xét duyệt" {...form.getInputProps("reviewerFeedback")}></MyTextArea>
                    </Stack>
                    <Stack>
                        <Stack>
                            <MyDateInput label="Ngày xét duyệt" {...form.getInputProps("approvalDate")} />
                            <MyCheckbox label="Gửi thông báo" pt={20} pb={20} {...form.getInputProps("notification")} />
                            <MyTextArea label="Yêu cầu chỉnh sửa cụ thể" {...form.getInputProps("editRequestDetail")} />
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <Group justify="end" pt={20}>
                    <MyButton crudType="save" onClick={() => discolusre[1].close()}>Lưu</MyButton>
                </Group>

        </MyButtonModal>);
}

export interface I_ApprovalStatus {
    label: string,
    value: string
}

export interface I_CurriculumApprovalValidation {
    approvalStatus: string,
    approvalDate: Date,
    finalDecision: string,
    notification: Boolean,
    reviewerFeedback: string,
    editRequestDetail: string,
}

const approvalStatusMock = [
    {
        value: "1",
        label: "Chờ xử lý"
    },
    {
        value: "2",
        label: "Đã đánh giá"
    }
]