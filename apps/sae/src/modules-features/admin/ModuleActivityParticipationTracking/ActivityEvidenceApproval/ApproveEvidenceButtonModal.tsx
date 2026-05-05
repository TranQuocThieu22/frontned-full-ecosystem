"use client"
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { Checkbox, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

interface IProps {
    eventId: number;
    isApprove: boolean;
}

interface IFormValues {
    isApprove: boolean;
    feedback: string;
    sendEmail: boolean;
}

export default function ApproveEvidenceButtonModal({ eventId, isApprove }: IProps) {
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm<IFormValues>({
        initialValues: {
            isApprove,
            feedback: '',
            sendEmail: false
        },
        validate: {
        }
    });

    const handleApproveEvent = async (values: IFormValues) => {

        close();
    };

    return (
        <CustomButtonModal
            buttonProps={{
                actionType: "default",
                variant: "transparent",
                children: "Duyệt",
                color: "blue"
            }}
            modalProps={{
                title: "Duyệt minh chứng hoạt động",
            }}
            disclosure={[opened, { open, close, toggle: () => open() }]}
        >
            <form onSubmit={form.onSubmit(handleApproveEvent)}>
                <Switch
                    label="Duyệt"
                    checked={form.values.isApprove}
                    onChange={(event) => form.setFieldValue('isApprove', event.currentTarget.checked)}
                    mb="md"
                />
                <CustomTextArea
                    label="Nội dung phản hồi"
                    {...form.getInputProps('feedback')}
                    mb="md"
                />
                <Checkbox
                    label="Gửi mail thông báo"
                    checked={form.values.sendEmail}
                    onChange={(event) => form.setFieldValue('sendEmail', event.currentTarget.checked)}
                    mb="md"
                />
                <CustomButton fullWidth type="submit" actionType="create">
                    Lưu
                </CustomButton>
            </form>
        </CustomButtonModal>
    );
}
