import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyCheckbox, MySelect, MyTextArea } from "aq-fe-framework/components";
import { IStudentEvaluationInfo } from "./StudentTableModalButton";

export default function StudentApproveButtonModal({ data }: { data: IStudentEvaluationInfo }) {
    const disclosure = useDisclosure();
    const form = useForm({
        initialValues: {
            ...data,
            approvalStatus: data.approvalStatus.toString(),
        }
    })
    return (
        <MyButtonModal
            title="Duyệt nhận xét tháng"
            label="Duyệt"
            modalSize="40vw"
            disclosure={disclosure}>
            <MySelect
                label="Duyệt"
                data={
                    [
                        { label: "Duyệt", value: "1" },
                        { label: "Yêu cầu hiệu chỉnh", value: "2" },
                        { label: "Chưa duyệt", value: "3" }
                    ]
                }
                clearable={false}
                {...form.getInputProps('approvalStatus')}
            />
            <MyTextArea
                label="Nhận xét"
                {...form.getInputProps('monthlyComment')}
                minRows={8}
                maxRows={8}
                
            />
            <Group justify="space-between">
                <MyCheckbox
                    label="Gửi thông báo"
                />
                <MyButton>Lưu</MyButton>
            </Group>
        </MyButtonModal>
    );
}

