import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { TaskDetailReportStatusEnum } from "@/shared/constants/enum/TaskDetailReportStatusEnum";
import { IReport } from "@/shared/interfaces/report/IReport";
import { ITaskDetailReportRequestBody } from "@/shared/interfaces/task/ITaskDetailReportRequestBody";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Center, Group, Highlight, rem, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconBrowserCheck, IconQuestionMark } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";

interface Props {
    values?: IReport,
}

export default function CompletedTaskSubmitButton({ values }: Props) {
    const disc = useDisclosure();
    const queryClient = useQueryClient();
    const filterStore = useS_Shared_Filter();

    const handleSubmit = async () => {
        const payload: ITaskDetailReportRequestBody = {
            id: values?.id,
            order: values?.order,
            reportDate: values?.reportDate,
            note: values?.note,
            result: values?.result,
            reportStatus: TaskDetailReportStatusEnum.IsSubmitted
        };

        await service_EAQAnalysis.updateEAQTaskDetailReport(payload);
        queryClient.invalidateQueries({ queryKey: ["QualityReportTracking", filterStore.state.Phase?.id] });
        disc[1].close();
        notifications.show({
            color: "green",
            message: "Cập nhật kết quả công việc thành công"
        });
    }

    return (
        <CustomButtonModal
            disclosure={disc}
            modalProps={{
                withCloseButton: false,
                centered: true,
                size: "lg",
                radius: "lg",
                padding: "lg",
                styles: {
                    body: {
                        textAlign: "center"
                    },
                }
            }}
            buttonProps={{
                actionType: 'update',
                leftSection: <IconBrowserCheck />,
                color: "indigo",
                variant: "outline",
                children: "Nộp",
            }}
        >
            <Stack align="center" gap="md">

                {/* Icon cảnh báo */}
                <Center
                    py={10}
                    style={{
                        backgroundColor: "var(--mantine-color-green-light)",
                        borderRadius: "50%",
                        width: rem(80),
                        height: rem(80),
                    }}
                >
                    <IconQuestionMark
                        style={{ width: rem(45), height: rem(45) }}
                        color="var(--mantine-color-green-7)"
                    />
                </Center>

                <Highlight
                    ta="center"
                    pt={5}
                    highlight={values?.eaqTaskDetail?.code || []}
                    color="red.6"
                    highlightStyles={{
                        fontWeight: 700,
                        fontSize: "20px",
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                    style={{
                        fontSize: "20px",
                    }}
                >
                    {
                        values?.code
                            ? `Bạn sắp nộp báo cáo thực hiện đảm bảo chất lượng của ${values?.eaqTaskDetail?.code || ""}. Bạn có chắc chắn không?`
                            : "Bạn sắp nộp báo cáo thực hiện đảm bảo chất lượng. Bạn có chắc chắn không?"
                    }
                </Highlight>

                <Group gap="lg" w="100%" align="center" mt={20}>
                    <CustomButton
                        variant="outline"
                        flex={1}
                        actionType="cancel"
                        onClick={disc[1].close}
                    />
                    <CustomButton
                        flex={1}
                        color="green"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Có
                    </CustomButton>
                </Group>
            </Stack>
        </CustomButtonModal >
    )
};
