import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSkeleton from "../../TrackingProgressSeftAssessment/ComponentShared/LoadingSkeleton";
import { SECTION_CONTENT } from "../Constants/selfAssessmentTitle";
import ContainerComment from "../Shared/ContainerComment";
import HtmlWraperComment from "../Shared/HtmlWraperComment";

interface Props {
    phaseId?: number
    taskDetailId?: number;
}

export default function StrengthsLayout({ phaseId, taskDetailId }: Props) {
    const queryClient = useQueryClient();

    const selfAssessmentQuery = useCustomReactQuery({
        queryKey: ["Q_SelfAssessment_Form04StrengthsLayout", phaseId, taskDetailId],
        axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
            eaqPhaseId: phaseId,
            eaqTaskDetailId: taskDetailId,
            selfAssessmentType: SelfAssessmentTypeEnum.Strength,
        })
    });

    const mutation = useMutation({
        mutationFn: (commentData: any) => service_EAQComment.create(commentData),
        onSuccess: () => {
            notifications.show({
                color: 'green',
                message: 'Lưu bình luận thành công',
            });

            // Làm mới lại danh sách comment
            queryClient.invalidateQueries({
                queryKey: ['SeflAccessmentCommentListById', selfAssessmentQuery.data?.[0]?.id],
            });
        },
        onError: () => {
            // Hiển thị thông báo lỗi
            notifications.show({
                color: 'red',
                message: 'Đã có lỗi xảy ra',
            });
        },
    });

    const seflAccessmentCommentQuery = useCustomReactQuery({
        queryKey: ["SeflAccessmentCommentListById", selfAssessmentQuery.data?.[0]?.id],
        axiosFn: () => service_EAQComment.findbySelfAssessmentId(selfAssessmentQuery.data?.[0]?.id),
        options: {
            enabled: selfAssessmentQuery.data?.[0]?.id != undefined
        }
    });

    return (
        <>
            <Text mt="md" fw={500} data-assessment>
                {SECTION_CONTENT.STRENGTHS.title}
            </Text>
            <Text mb="xs" size="sm">
                {SECTION_CONTENT.STRENGTHS.description}
            </Text>
            <CustomFieldset mt="xs" title="Nội dung báo cáo hiện tại">
                {selfAssessmentQuery.isLoading
                    ? <LoadingSkeleton />
                    : <Group wrap="nowrap" align="start" h="55vh">
                        <HtmlWraperComment
                            htmlContent={selfAssessmentQuery.data?.[0]?.description ?? ""}
                            onSubmit={async (value) => {
                                const body = {
                                    commentDetail: value.commentDetail,
                                    content: value.content,
                                    eaqSelfAssessmentId: selfAssessmentQuery.data?.[0]?.id,
                                    isEnabled: true
                                }
                                await mutation.mutateAsync(body);
                            }}
                            containerProps={{
                                h: "100%",
                                w: "100%"
                            }}
                        />
                        <ContainerComment
                            widthOnOpen={350}
                            comments={seflAccessmentCommentQuery.data}
                            onDelete={async (id) => {
                                await service_EAQComment.delete(id || 0);
                                queryClient.invalidateQueries({ queryKey: ["SeflAccessmentCommentListById", selfAssessmentQuery.data?.[0]?.id] });
                            }}
                        />
                    </Group>
                }
            </CustomFieldset>
        </>
    );
}
