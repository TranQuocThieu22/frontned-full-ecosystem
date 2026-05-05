"use client";

import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconMailFast } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";

export default function SendNotificationButton({ taskDetailId }: { taskDetailId: number }) {
    const dics = useDisclosure();
    const queryClient = useQueryClient();

    const form = useForm<any>({
        initialValues: {
            review: "",
            taskDetailId: taskDetailId
        },
        validate: {
            review: (value) => (value ?? "").trim() === "" ? "Nội dung thông báo không được để trống" : null,
        },
    });

    // mutation
    const mutation = useMutation({
        mutationFn: async (data: any) => {
            return await service_EAQEvaluationPlan.sendMailEAQTaskDetailNotification(taskDetailId, data.review);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Task_Detail_List"] });
            notifications.show({
                color: "green",
                message: "Gửi thông báo thành công",
            });
            dics[1].close();
            form.reset();
        },
        onError: () => {
            notifications.show({
                color: "red",
                title: "Thiếu thông tin",
                message: "Gửi thông báo thất bại!",
            });
        },
    });

    const handleSubmit = form.onSubmit((values) => {
        if (form.validate().hasErrors) return;
        mutation.mutate(values);
    });

    return (
        <CustomButtonModal
            modalProps={{
                title: "Chi tiết thông báo",
                size: "40%"
            }}
            buttonProps={{
                variant: "light",
                children: "Gửi thông báo",
                leftSection: <IconMailFast />
            }}
            disclosure={dics}
        >
            <form onSubmit={handleSubmit}>
                <CustomTextArea
                    label="Nội dung thông báo"
                    minRows={10}
                    {...form.getInputProps("review")}
                />
                <CustomButton mt="md" type="submit" w="100%" loading={mutation.isPending}>
                    Gửi
                </CustomButton>
            </form>
        </CustomButtonModal>
    );
}
