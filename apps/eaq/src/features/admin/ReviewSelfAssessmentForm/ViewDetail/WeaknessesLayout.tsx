import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SECTION_CONTENT } from "../Constants/selfAssessmentTitle";
import LoadingSkeleton from "../../TrackingProgressSeftAssessment/ComponentShared/LoadingSkeleton";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import ContainerComment from "@/features/admin/ReviewSelfAssessmentForm/Shared/ContainerComment";
import HtmlWraperComment from "@/features/admin/ReviewSelfAssessmentForm/Shared/HtmlWraperComment";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
    phaseId?: number
    taskDetailId?: number;
}

export default function WeaknessesLayout({ phaseId, taskDetailId }: Props) {
    const queryClient = useQueryClient();

    const selfAssessmentQuery = useCustomReactQuery({
        queryKey: ["Self_Assessment_Type3_List", phaseId, taskDetailId],
        axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
            eaqPhaseId: phaseId,
            eaqTaskDetailId: taskDetailId,
            selfAssessmentType: SelfAssessmentTypeEnum.Weakness,
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
                {SECTION_CONTENT.WEAKNESSES.title}
            </Text>
            <Text mb="xs" size="sm">
                {SECTION_CONTENT.WEAKNESSES.description}
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
