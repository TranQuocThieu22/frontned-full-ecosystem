"use client";

import { TaskDetailVerificationStatusEnum, TaskDetailVerificationStatusEnumLabel } from "@/shared/constants/enum/TaskDetailVerificationStatusEnum";
import { IReviewSelfAssessment } from "@/shared/interfaces/selfAssessment/IReviewSelfAssessment";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { Checkbox, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { IconChecklist } from "@tabler/icons-react";

interface Props {
    taskDetail: ITaskDetail
}

export default function TaskDetailVerificationButton({ taskDetail }: Props) {
    const permisionStore = usePermissionStore();
    const dics = useDisclosure();
    const queryClient = useQueryClient();

    const form = useForm<IReviewSelfAssessment>({
        initialValues: {
            id: taskDetail.id,
            selfAssessmentTrackingStatus: taskDetail.selfAssessmentTrackingStatus,
            selfAssessmentReview: taskDetail.selfAssessmentReview || '',
            isSendMailSelfAssessment: false,
        }
    });

    useEffect(() => {
        form.setValues({
            id: taskDetail.id,
            selfAssessmentTrackingStatus: taskDetail.selfAssessmentTrackingStatus,
            selfAssessmentReview: taskDetail.selfAssessmentReview || '',
            isSendMailSelfAssessment: false,
        });
    }, [taskDetail])

    // mutation
    const mutation = useMutation({
        mutationFn: async (data: IReviewSelfAssessment) => {
            return await service_EAQSelfAssessment.reviewEAQTaskDetailSelfAssessment(data);
        },
        onSuccess: () => {
            notifications.show({
                color: "green",
                message: "Lưu dữ liệu thành công",
            });
            dics[1].close();
            queryClient.invalidateQueries({ queryKey: ["Task_Detail_List"] });
            form.reset();
        },
        onError: () => {
            notifications.show({
                color: "red",
                title: "Thiếu thông tin",
                message: "Lưu dữ liệu thất bại!",
            });
        },
    });

    const handleSubmit = form.onSubmit((values) => {
        if (form.validate().hasErrors) return;
        mutation.mutate(values);
    });

    if (!permisionStore.state.currentPermissionPage?.isUpdate) return <></>

    return (
        <CustomButtonModal

            isActionIcon
            actionIconProps={{
                actionType: "update",
                children: <IconChecklist />,
                color: "blue",
                toolTipProps: {
                    label: 'kiểm tra'
                }
            }}
            modalProps={{
                title: "Chi tiết kết quả kiểm tra",
                size: "50%"
            }}
            disclosure={dics}
        >
            <form onSubmit={handleSubmit}>
                <Stack gap={5}>
                    <CustomSelect
                        data={converterUtils.mapEnumToSelectData(TaskDetailVerificationStatusEnum, TaskDetailVerificationStatusEnumLabel)}
                        label="Trạng thái kiểm tra"
                        {...form.getInputProps("selfAssessmentTrackingStatus")}
                        value={String(form.values.selfAssessmentTrackingStatus || 1)}
                        onChange={val => {
                            return form.setFieldValue("selfAssessmentTrackingStatus", val !== "" ? Number(val) : undefined)
                        }}
                    />
                    <CustomTextArea
                        label="Nhận xét chung"
                        minRows={10}
                        {...form.getInputProps("selfAssessmentReview")}
                    />
                    <Checkbox
                        label="Gửi thông báo"
                        checked={form.getValues().isSendMailSelfAssessment}
                        onChange={(event) => form.setFieldValue("isSendMailSelfAssessment", event.currentTarget.checked)}
                    />

                    <CustomButton
                        mt="md"
                        type="submit"
                        w="100%"
                        loading={mutation.isPending}
                    >
                        Lưu
                    </CustomButton>
                </Stack>
            </form>
        </CustomButtonModal>
    );
}
