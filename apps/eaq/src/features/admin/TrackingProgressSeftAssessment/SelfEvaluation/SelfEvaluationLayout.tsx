"use client";

import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { Accordion, Box, Group, Skeleton, Text } from "@mantine/core";
import HistoryAccordionItem from "../ComponentShared/HistoryAccordionItem";
import LoadingSkeleton from "../ComponentShared/LoadingSkeleton";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

interface Props {
    phaseId?: number;
    trainingProgramId?: number;
    taskDetailId?: number;
}

export default function SelfEvaluationLayout({ trainingProgramId, phaseId, taskDetailId }: Props) {

    const SelfAssessmentQuery = useCustomReactQuery({
        queryKey: ["SelfAssessment_Detail_Type_SelfEvaluation", trainingProgramId, phaseId, taskDetailId],
        axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
            eaqPhaseId: phaseId,
            selfAssessmentType: SelfAssessmentTypeEnum.SelfEvaluation,
            eaqTaskDetailId: taskDetailId,
        })
    });

    return (<>
        <Text mt="md" fw={500} data-assessment>
            5. Tự đánh giá
        </Text>
        <Text mb="xs" size="sm">
            (Phân tích những điểm tồn tại của CTĐT trong đáp ứng yêu cầu của tiêu
            chí và các khuyến nghị cải tiến cần thiết)
        </Text>

        <CustomFieldset title="Lịch sử báo cáo">
            <Accordion variant="unstyled" chevronSize={25}>
                <Accordion.Item value="history">
                    <Accordion.Control styles={{ label: { padding: 0 } }}>
                        {SelfAssessmentQuery.isFetching ? (
                            <Skeleton height={15} radius="xl" />
                        ) : (
                            <>
                                {SelfAssessmentQuery.data
                                    ? SelfAssessmentQuery.data?.length
                                    : 0
                                } lịch sử báo cáo
                            </>
                        )}
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
                            {SelfAssessmentQuery.isFetching ? (
                                <LoadingSkeleton />
                            ) : (
                                <Accordion style={{ overflow: "auto" }} defaultValue="1">
                                    {SelfAssessmentQuery.data?.map((item) => (
                                        <HistoryAccordionItem
                                            key={item.id}
                                            data={item}
                                        >
                                            <Group>
                                                <Text fw={500}>Tự đánh giá</Text>
                                                <CustomCheckbox label="Đạt" checked={item?.status == 1} readOnly />
                                                <CustomCheckbox
                                                    ml={20}
                                                    label="Không đạt"
                                                    checked={item?.status == 2}
                                                    readOnly
                                                />
                                            </Group>
                                        </HistoryAccordionItem>
                                    ))}
                                </Accordion>
                            )}
                        </Box>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </CustomFieldset>

        <CustomFieldset mt="xs" title="Nội dung báo cáo hiện tại">
            {SelfAssessmentQuery.isFetching ? (
                <LoadingSkeleton />
            ) : (
                <Group>
                    <Text fw={500}>Tự đánh giá</Text>
                    <CustomCheckbox
                        label="Đạt"
                        checked={SelfAssessmentQuery.data?.[0]?.status === 1}
                        readOnly
                    />
                    <CustomCheckbox
                        ml={20}
                        label="Không đạt"
                        checked={SelfAssessmentQuery.data?.[0]?.status === 2}
                        readOnly
                    />
                </Group>
            )}
        </CustomFieldset>
    </>);
}
