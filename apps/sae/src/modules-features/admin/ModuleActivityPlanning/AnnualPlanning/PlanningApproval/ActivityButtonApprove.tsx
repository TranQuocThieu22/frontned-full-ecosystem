"use client"
import { service_event } from "@/api/services/service_event";
import { EnumEventApprovalStatus, EnumLabelEventApprovalStatus } from "@/enum/EnumEventApprovalStatus";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPencilCheck } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IPlanningApproval {
    approvalStatus: number
    feedback: string;
    sendEmail: boolean;
}

interface IProps {
    eventId: number;
    approvalStatus: number,
    loading?: boolean
}

export default function ActivityButtonApprove({ eventId, approvalStatus, loading }: IProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const queryClient = useQueryClient();

    const form = useForm<IPlanningApproval>({
        initialValues: {
            approvalStatus: approvalStatus,
            feedback: '',
            sendEmail: false
        },
        validate: {
        }
    });

    const approvalMutation = useMutation({
        mutationFn: async (values: IPlanningApproval) => {
            return await service_event.UpdateExternalFuturePlan({
                eventId: eventId,
                approvalStatus: values.approvalStatus,
                message: values.feedback,
                isSentMail: values.sendEmail
            });
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["FuturePlan_WaitingForApproval"] });
            notifications.show({
                color: 'green',
                message: 'Dữ liệu đã được lưu thành công',
                autoClose: 3000,
            });
            // if (form.values.sendEmail) {
            //     const mailParam: IMailParam = {
            //         userName: "",
            //         EmailModule: 0,
            //         Title: "",
            //         Body: ""
            //     }
            //     await sendMailMutation.mutateAsync(mailParam);
            // }
            close();
        },
        onError: () => {
            notifications.show({
                color: 'red',
                message: 'Lỗi, lưu dữ liệu thất bại',
                autoClose: 3000,
            });
        }
    })

    // const sendMailMutation = useMutation({
    //     mutationFn: async (mailParam: IMailParam) => {
    //         return await service_emailConfig.sendEmail(mailParam);
    //     },
    //     onSuccess: () => {
    //         notifications.show({
    //             color: 'green',
    //             message: "Gửi mail thông báo thành công",
    //             autoClose: 3000,
    //         });
    //     },
    //     onError: () => {
    //         notifications.show({
    //             color: 'red',
    //             message: 'Lỗi, gửi mail thông báo thất bại',
    //             autoClose: 3000,
    //         });
    //     }
    // })

    return (
        <CustomButtonModal
            buttonProps={{
                variant: "outline",
                children: "Duyệt",
                loading: loading,
                leftSection: <IconPencilCheck />
            }}
            modalProps={{
                title: "Duyệt hoạt động đăng ký tổ chức"
            }}
            disclosure={[opened, { open, close, toggle: () => open() }]}
        >
            <form onSubmit={form.onSubmit((values) => approvalMutation.mutate(values))}>
                <CustomSelect
                    clearable={false}
                    label="Trạng thái duyệt"
                    data={converterUtils.mapEnumToSelectData(EnumEventApprovalStatus, EnumLabelEventApprovalStatus)}
                    {...form.getInputProps('approvalStatus')}
                    value={form.values.approvalStatus.toString()}
                    onChange={val => form.setFieldValue("approvalStatus", Number(val))}
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
                <CustomButton loading={approvalMutation.isPending} fullWidth type="submit" actionType="create">
                    Lưu
                </CustomButton>
            </form>
        </CustomButtonModal>
    );
}
