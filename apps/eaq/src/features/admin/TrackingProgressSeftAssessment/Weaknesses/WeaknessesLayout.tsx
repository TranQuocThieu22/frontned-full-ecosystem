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
    trainingProgramId?: number
    taskDetailId?: number;
}

export default function WeaknessesLayout({ trainingProgramId, phaseId, taskDetailId }: Props) {

    const SelfAssessmentQuery = useCustomReactQuery({
        queryKey: ["SelfAssessment_Detail_Type_Weakness", trainingProgramId, phaseId, taskDetailId],
        axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
            eaqPhaseId: phaseId,
            selfAssessmentType: SelfAssessmentTypeEnum.Weakness,
            eaqTaskDetailId: taskDetailId,
        })
    });

    return (<>
        <Text mt="md" fw={500} data-assessment>
            3. Điểm tồn tại và khuyến nghị
        </Text>
        <Text mb="xs" size="sm">
            (Phân tích những điểm tồn tại của CTĐT trong đáp ứng yêu cầu của tiêu
            chí và các khuyến nghị cải tiến cần thiết)
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
                            h="30vh"
                            style={{
                                maxHeight: "300px",
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
                                                mih="30vh"
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
                    mah="40vh"
                    p="sm"
                    style={{ overflow: "auto", border: "1px solid #ccc", borderRadius: "5px" }}
                >
                    <CustomHtmlWrapper html={SelfAssessmentQuery.data?.[0]?.description ?? ""} />
                </Box>
            }
        </CustomFieldset>
    </>);
}
