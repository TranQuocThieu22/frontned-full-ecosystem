import { topicService } from "@/shared/APIs/topicService";
import { EnumLabelProposalReviewStatus, EnumProposalReviewStatus } from "@/shared/consts/enum/EnumProposalReviewStatus";
import { EnumReviewType } from "@/shared/consts/enum/EnumReviewType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { ITopicReviewPreliminary, SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Button, Checkbox, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPencilCheck } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface Props {
    data: SRMTopic,
    loadingButton?: boolean
}

export default function ApproveButton({ data, loadingButton }: Props) {
    const disc = useDisclosure()
    const queryClient = useQueryClient();
    const academicStore = useAcademicYearStore();

    const form = useForm<ITopicReviewPreliminary>({
        initialValues: {
            id: data.id,
            code: data.code,
            name: data.registerName,
            concurrencyStamp: data.concurrencyStamp,
            isEnabled: data.isEnabled,
            status: data.completeStatus,
            review: data.completeReview || "",
            isSentMail: false,
            type: EnumReviewType.CompleteProposalReview
        }
    })

    const mutation = useMutation({
        mutationFn: () => topicService.ReviewSRMTopic(form.getValues()),
        onSuccess: (data) => {
            if (data.data.isSuccess === 0) {
                notifications.show({
                    color: "red",
                    title: "Thao tác không thành công",
                    message: (data.data as any)?.message
                });
            } else {
                disc[1].close();
                form.reset();
                notifications.show({
                    color: "green",
                    message: "Thao tác thành công",
                });
                queryClient.invalidateQueries({ queryKey: ['topic_list', academicStore.state.academicYear?.id] })
            }
        },
        onError: (error) => {
            notifications.show({
                color: "red",
                title: "Thao tác không thành công",
                message: error.message
            });
        }
    });

    useEffect(() => {
        if (data) {
            form.setValues({
                id: data.id,
                code: data.code,
                name: data.registerName,
                concurrencyStamp: data.concurrencyStamp,
                isEnabled: data.isEnabled,
                status: data.completeStatus,
                review: data.completeReview || "",
                isSentMail: false,
                type: EnumReviewType.CompleteProposalReview
            });
        }

        if (!disc[0]) {
            form.reset();
            form.clearErrors();
        }
    }, [data, disc[0]]);

    return (
        <CustomButtonModal
            buttonProps={{
                children: "Kiểm tra",
                leftSection: <IconPencilCheck />,
                loading: loadingButton
            }}
            modalProps={{
                title: "Chi tiết kiểm tra hoàn thiện",
                size: "40%"
            }}
            disclosure={disc}>
            <Select
                data={converterUtils.mapEnumToSelectData(EnumProposalReviewStatus, EnumLabelProposalReviewStatus)}
                label="Trạng thái kiểm tra"
                placeholder="Chọn trạng thái kiểm tra"
                defaultValue={String(data.completeStatus)}
                onChange={(value) => {
                    form.setFieldValue("status", value ? Number(value) : undefined)
                }}
            />
            <CustomTextArea
                label="Nhận xét"
                placeholder="Thông tin nhận xét"
                minRows={10}
                {...form.getInputProps("review")}
            />
            <Checkbox
                mt={10}
                label="Gửi thông báo"
                onChange={(e) => {
                    form.setFieldValue("isSentMail", e.target.checked)
                }}
            />
            <Group grow mt={10}>
                <Button onClick={() => mutation.mutate()} loading={mutation.isPending}>Lưu</Button>
            </Group>
        </CustomButtonModal>
    )
}
