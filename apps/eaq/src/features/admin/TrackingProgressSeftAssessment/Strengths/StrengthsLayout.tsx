import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { Accordion, Box, Skeleton, Text } from "@mantine/core";
import HistoryAccordionItem from "../ComponentShared/HistoryAccordionItem";
import LoadingSkeleton from "../ComponentShared/LoadingSkeleton";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";

interface Props {
    phaseId?: number
    trainingProgramId?: number;
    taskDetailId?: number;
}

export default function StrengthsLayout({ trainingProgramId, phaseId, taskDetailId }: Props) {

    const SelfAssessmentQuery = useCustomReactQuery({
        queryKey: ["SelfAssessment_Detail_Type_Strength", trainingProgramId, phaseId, taskDetailId],
        axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
            eaqPhaseId: phaseId,
            selfAssessmentType: SelfAssessmentTypeEnum.Strength,
            eaqTaskDetailId: taskDetailId,
        })
    });

    return (<>
        <Text mt="md" fw={500} data-assessment>
            2. Điểm mạnh
        </Text>
        <Text mb="xs" size="sm">
            (Phân tích, so sánh, lý giải và rút ra những điểm mạnh nổi bật của
            CTĐT trong việc đáp ứng các yêu cầu tiêu chí)
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
                                        <HistoryAccordionItem key={item.id} data={item} >
                                            <Box
                                                mih="20vh"
                                                mah="40vh"
                                                p="sm"
                                                style={{ overflow: "auto", border: "1px solid #ccc", borderRadius: "5px" }}
                                            >
                                                <CustomHtmlWrapper html={item?.description ?? ""} />
                                            </Box>
                                        </HistoryAccordionItem>
                                    ))}
                                </Accordion>
                            }
                        </Box>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </CustomFieldset>

        <CustomFieldset mt="xs" title="Nội dung báo cáo hiện tại">
            {SelfAssessmentQuery.isLoading
                ? <LoadingSkeleton />
                : <Box
                    mih="30vh"
                    p="sm"
                    style={{ overflow: "auto", border: "1px solid #ccc", borderRadius: "5px" }}
                >
                    <CustomHtmlWrapper html={SelfAssessmentQuery.data?.[0]?.description ?? ""} />
                </Box>
            }
        </CustomFieldset>
    </>);
}

