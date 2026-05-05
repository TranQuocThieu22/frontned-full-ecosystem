import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { Accordion, Box, Skeleton, Text } from "@mantine/core";
import LoadingSkeleton from "../ComponentShared/LoadingSkeleton";
import CurrentSituationContent from "./CurrentSituationContent";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

interface Props {
    phaseId?: number;
    trainingProgramId?: number;
    taskDetailId?: number;
}

export default function CurrentSituationLayout({ trainingProgramId, phaseId, taskDetailId }: Props) {

    const SelfAssessmentQuery = useCustomReactQuery({
        queryKey: ["SelfAssessment_Detail_Type_CurrentSituation", trainingProgramId, phaseId, taskDetailId],
        axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
            eaqPhaseId: phaseId,
            selfAssessmentType: SelfAssessmentTypeEnum.CurrentSituation,
            eaqTaskDetailId: taskDetailId,
        })
    });

    return (
        <>
            <Text fw={500} data-assessment>
                1. Mô tả hiện trạng
            </Text>
            <Text mb="xs" size="sm">
                (Căn cứ yêu cầu của tiêu chí, mô tả hoạt động của cơ sở đào tạo có
                CTĐT được đánh giá kèm theo các thông tin minh chứng để chứng minh mức
                độ đạt được của tiêu chí)
            </Text>

            <CustomFieldset title="Lịch sử báo cáo">
                <Accordion variant="unstyled" chevronSize={25}>
                    <Accordion.Item value="history">
                        <Accordion.Control styles={{ label: { padding: 0 } }}>
                            {SelfAssessmentQuery.isFetching
                                ? <Skeleton height={15} radius="xl" />
                                : <>
                                    {SelfAssessmentQuery.data
                                        ? SelfAssessmentQuery.data?.length
                                        : 0
                                    } lịch sử báo cáo
                                </>
                            }
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Box
                                h="40vh"
                                style={{
                                    maxHeight: "40vh",
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                }}
                            >
                                {SelfAssessmentQuery.isFetching
                                    ? <LoadingSkeleton />
                                    : <Accordion style={{ overflow: "auto" }} defaultValue="1">
                                        {SelfAssessmentQuery.data?.map((item) => (
                                            <CurrentSituationContent key={item.id} data={item} isAccordionItem={true} />
                                        ))}
                                    </Accordion>
                                }
                            </Box>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </CustomFieldset>

            <CustomFieldset mt="sm" title="Nội dung báo cáo hiện tại">
                <CurrentSituationContent
                    data={SelfAssessmentQuery.data?.[0]}
                    isAccordionItem={false}
                    isLoading={SelfAssessmentQuery.isFetching}
                />
            </CustomFieldset>
        </>
    );
}
