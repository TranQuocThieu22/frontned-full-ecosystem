"use client";

import { service_EAQSelfAssessment } from "@/shared/APIs/service_EAQSelfAssessment";
import { SelfAssessmentTypeEnum } from "@/shared/constants/enum/SelfAssessmentTypeEnum";
import { IAction } from "@/shared/interfaces/action/IAction";
import { Accordion, Box, Skeleton, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import HistoryAccordionItem from "../ComponentShared/HistoryAccordionItem";
import LoadingSkeleton from "../ComponentShared/LoadingSkeleton";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

interface Props {
    phaseId?: number;
    trainingProgramId?: number;
    taskDetailId?: number;
}

export default function ActionPlanLayout({ trainingProgramId, phaseId, taskDetailId }: Props) {

    const SelfAssessmentQuery = useCustomReactQuery({
        queryKey: ["SelfAssessment_Detail_Type_ActionPlan", trainingProgramId, phaseId, taskDetailId],
        axiosFn: () => service_EAQSelfAssessment.getSelfAssessmentsByPhaseId({
            eaqPhaseId: phaseId,
            selfAssessmentType: SelfAssessmentTypeEnum.ActionPlan,
            eaqTaskDetailId: taskDetailId,
        })
    });

    const columns = useMemo<MRT_ColumnDef<IAction>[]>(() => [
        {
            header: "Mục tiêu",
            accessorKey: "target",
            size: 200
        },
        {
            header: "Nội dung chi tiết",
            accessorKey: "detail",
            size: 350
        },
        {
            header: "Đơn vị; Người thực hiện",
            accessorKey: "unit"
        },
        {
            header: "Thời gian thực hiện hoặc hoàn thành",
            accessorKey: "actionTime",
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
            size: 120
        },
    ], []);

    const renderTableActionPlan = (actions: IAction[]) => {
        return (
            <CustomDataTable
                data={actions}
                columns={columns}
                initialState={{
                    columnSizing: {
                        "mrt-row-numbers": 60,
                    },
                    columnVisibility: {
                        modifiedFullName: false,
                        modifiedWhen: false
                    },
                }}
                mantineTableContainerProps={{
                    style: {
                        height: "250px",
                        overflowY: "auto"
                    },
                }}
            />
        )
    }

    return (<>
        <Text mt="md" fw={500} data-assessment>
            4. Kế hoạch hành động
        </Text>
        <Text mb="xs" size="sm">
            (Phân tích những điểm tồn tại của CTĐT trong đáp ứng yêu cầu của tiêu chí và các khuyến
            nghị cải tiến cần thiết)
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
                                        <HistoryAccordionItem key={item.id} data={item}>
                                            {renderTableActionPlan(item?.eaqActions || [])}
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
            {SelfAssessmentQuery.isFetching
                ? <LoadingSkeleton />
                : renderTableActionPlan(SelfAssessmentQuery.data?.[0]?.eaqActions || [])
            }
        </CustomFieldset>

    </>);
}
