import { service_EAQComment } from "@/shared/APIs/service_EAQComment";
import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { IEvidenceUsageHistories } from "@/shared/interfaces/selfAssessment/IEvidenceUsageHistories";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Badge, Group, Paper, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconClockCheck, IconClockX } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { SECTION_CONTENT } from "../Constants/selfAssessmentTitle";
import Form04CurrentSituationDetail from "../../ModuleSelfAssessmentForm04/Form04CurrentSituation/Form04CurrentSituationDetail";
import MyCustomTitleGroup from "../../ModuleSelfAssessmentForm04/Shared/MyCustomTitleGroup";
import LoadingSkeleton from "../../TrackingProgressSeftAssessment/ComponentShared/LoadingSkeleton";
import ContainerComment from "../Shared/ContainerComment";
import HtmlWraperComment from "../Shared/HtmlWraperComment";

interface Props {
    phaseId?: number;
    taskDetailId?: number;
}

export default function CurrentSituationLayout({ phaseId, taskDetailId }: Props) {
    const queryClient = useQueryClient();
    const selfAssessmentQuery = useCustomReactQuery({
        queryKey: ["Self_Assessment_Type1_List", phaseId, taskDetailId],
        axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
            eaqPhaseId: phaseId,
            eaqTaskDetailId: taskDetailId,
            selfAssessmentType: SelfAssessmentTypeEnum.CurrentSituation,
        })
    });

    const seflAccessmentCommentQuery = useCustomReactQuery({
        queryKey: ["SeflAccessmentCommentListById", selfAssessmentQuery.data?.[0]?.id],
        axiosFn: () => service_EAQComment.findbySelfAssessmentId(selfAssessmentQuery.data?.[0]?.id),
        options: {
            enabled: selfAssessmentQuery.data?.[0]?.id != undefined
        }
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

    const columns = useMemo<CustomColumnDef<IEvidenceUsageHistories>[]>(
        () => [
            {
                header: "Mã minh chứng báo cáo",
                accessorKey: "reportName",
            },
            {
                header: "Mã minh chứng",
                accessorKey: "code",
            },
            {
                header: "Tên minh chứng",
                accessorKey: "name",
                size: columnSizeObject.name,
            },
            {
                header: "Trạng thái",
                accessorKey: "status",
                Cell: ({ row }) => {
                    const effectiveTo = row.original.eaqEvidenceCurrentVersion?.expiredDate;
                    const currentDate = new Date();
                    const toDate = effectiveTo ? new Date(effectiveTo) : null;
                    const isLate = !toDate || currentDate > toDate;

                    return (
                        <Badge
                            w="100%"
                            h={25}
                            leftSection={
                                isLate ? <IconClockX size={16} /> : <IconClockCheck size={16} />
                            }
                            variant="light"
                            color={isLate ? "red" : "green"}
                            radius="md"
                            fw={700}
                        >
                            {isLate ? "Hết hạn" : "Còn hạn"}
                        </Badge>
                    );
                },
            },
        ],
        []
    );

    return (
        <>
            <Text fw={500} data-assessment>
                {SECTION_CONTENT.CURRENT_SITUATION.title}
            </Text>
            <Text mb="xs" size="sm">
                {SECTION_CONTENT.CURRENT_SITUATION.description}
            </Text>
            <CustomFieldset title="Nội dung báo cáo hiện tại">
                {selfAssessmentQuery.isLoading
                    ? <LoadingSkeleton />
                    : <>
                        <Paper mb="xs" p="sm">
                            <Group wrap="nowrap" align="start" h="55vh">
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
                        </Paper>
                        <CustomDataTable
                            renderTopToolbarCustomActions={() => (
                                <MyCustomTitleGroup title="Danh sách minh chứng đã sử dụng" />
                            )}
                            columns={columns}
                            data={selfAssessmentQuery.data?.[0]?.eaqEvidenceUsageHistories ?? []}
                            enableRowNumbers={false}
                            renderRowActions={({ row }) => {
                                return (
                                    <CustomCenterFull>
                                        <Form04CurrentSituationDetail
                                            evidence={row.original}
                                            evidenceId={row.original.eaqEvidenceId ?? 0}
                                        />
                                    </CustomCenterFull>
                                );
                            }}
                        />
                    </>
                }
            </CustomFieldset>
        </>
    );
}
