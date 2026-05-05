'use client'
import { service_account } from "@/api/services/service_account";
import { service_ranking } from "@/api/services/service_ranking";
import { Group, Paper, Table, Text } from "@mantine/core";
import SummaryScoreBoardButtonViewModal from "./SummaryScoreBoardButtonViewModal";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function SummaryScoreBoardTable() {
    // get information of current student
    const queryStudentInfo = useCustomReactQuery({
        queryKey: ["studentInfo"],
        axiosFn: () => service_account.getCurrentUser()
    });

    const QueryHistoryByStudent = useCustomReactQuery({
        queryKey: ["SummaryScoreBoardTable_RankingHistoryByStudent", queryStudentInfo.data?.id,],
        axiosFn: () => service_ranking.getHistoryByStudent({
            studentId: queryStudentInfo.data?.id ?? 0,
        }),
        options: {
            enabled: !!queryStudentInfo.data?.id,
            refetchOnWindowFocus: false,
            refetchInterval: 0,
        },
    });

    if (queryStudentInfo.isLoading || QueryHistoryByStudent.isLoading) return "Đang tải dữ liệu...";
    if (queryStudentInfo.isError || QueryHistoryByStudent.isError) return "không có dữ liệu";

    // Find all standard orders in the data
    const allStandardOrders = [
        ...new Set(
            (QueryHistoryByStudent.data ?? [])
                .flatMap(category =>
                    (category.standardPoints ?? []).map(point => point.standardOrder)
                )
        )
    ].sort((a, b) => a - b);

    // data for rows of table
    const rows = QueryHistoryByStudent.data?.flatMap((category, idx) => [

        <Table.Tr key={category.activityPlanId} >
            <Table.Td ta="center" px="xs" >
                <Text >{idx + 1}</Text>
            </Table.Td>
            <Table.Td px="xs"  >
                <CustomHtmlWrapper html={`${category.activityPlanName}`} />
            </Table.Td>
            <Table.Td ta="center" px="xs" >
                <Text >{category.studentRankingPoint}</Text>
            </Table.Td>
            <Table.Td ta="center" px="xs"  >
                <Text >{category.rateName}</Text>
            </Table.Td>
            {

                allStandardOrders.map((standardOrder) => {
                    // find standard point which has standard order corresponding to each category
                    const standardPoint = category.standardPoints.find(item => item.standardOrder === standardOrder);
                    return (
                        <Table.Td key={standardOrder} ta="center" px="xs">
                            <Text>{standardPoint ? standardPoint.standardPoint : ""}</Text>
                        </Table.Td>
                    );
                })
            }
            <Table.Td ta="center" px="xs"  >
                {/* button view */}
                <SummaryScoreBoardButtonViewModal activityPlanId={category.activityPlanId} rateName={category.rateName} totalPoint={category.studentRankingPoint} />
            </Table.Td>
        </Table.Tr>,
    ]);

    const renderContent = () => (
        <Group p="md">
            <Table withColumnBorders highlightOnHover style={{ border: "1px solid lightgray" }}>
                <Table.Thead>
                    <Table.Tr>
                        {/* the title of the table */}
                        <Table.Th style={{ border: "1px solid lightgray", whiteSpace: "nowrap" }} ta="center" px="xs">STT</Table.Th>
                        <Table.Th style={{ border: "1px solid lightgray", whiteSpace: "nowrap" }} ta="center" px="xs">Đợt đánh giá</Table.Th>
                        <Table.Th style={{ border: "1px solid lightgray", }} ta="center" px="xs">Tổng điểm</Table.Th>
                        <Table.Th style={{ border: "1px solid lightgray", }} ta="center" px="xs">Xếp loại</Table.Th>
                        {allStandardOrders.map((order) => (
                            <Table.Th
                                key={order}
                                style={{ border: "1px solid lightgray", whiteSpace: "nowrap" }}
                                ta="center"
                                px="xs"
                            >
                                Điều {order}
                            </Table.Th>
                        ))}
                        <Table.Th ta="center" px="xs">Xem bảng điểm</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows}
                </Table.Tbody>
            </Table>
        </Group>
    );

    return (
        <Paper shadow="xs" p="md" style={{ overflowY: "scroll" }}>
            {renderContent()}
        </Paper>
    );
}
