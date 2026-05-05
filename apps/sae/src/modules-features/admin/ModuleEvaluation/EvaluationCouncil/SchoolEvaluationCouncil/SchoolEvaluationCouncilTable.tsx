'use client'

import { service_ranking } from "@/api/services/service_ranking";
import { Grid, Group, Table, useMantineColorScheme } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SchoolEvaluationCouncilChart from "./SchoolEvaluationCouncilChart";
import { SchoolEvaluationCouncilFacultyInfoViewModel } from "./interfaces/ISchoolEvaluationCouncilViewModel";
import { CustomButtonPrintTablePDF } from "@aq-fe/core-ui/shared/components/button/CustomButtonPrintTablePDF";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";

export default function SchoolEvaluationCouncilTable() {
    const activityPlanStore = useS_Shared_ActivityPlan()
    const { colorScheme } = useMantineColorScheme()
    const queryRankingSchoolReport = useCustomReactQuery({
        queryKey: ["SchoolEvaluationCouncilTable_RankingSchoolReport"],
        axiosFn: () => service_ranking.getSchoolReport(activityPlanStore.state.ActivityPlan?.id),
    });

    const facultyReportColumns = useMemo<MRT_ColumnDef<SchoolEvaluationCouncilFacultyInfoViewModel>[]>(() => [
        {
            header: "Khoa", accessorKey: "facultyName",
        },
        {
            header: "Tổng số lượng SV của khoa", accessorKey: "facultTotalCount",
        },
        {
            header: "Tổng số lượng SV lớn hơn 50 điểm", accessorKey: "facultyOverFiftyPointCount",
        },
        {
            header: "Tỉ lệ", accessorKey: "rate",
            mantineTableHeadCellProps: {
                align: 'center',
            },
            mantineTableBodyCellProps: {
                align: 'center',
            },
            accessorFn: (row) =>
                row.facultTotalCount
                    ? `${(((row.facultyOverFiftyPointCount ?? 0) / row.facultTotalCount) * 100).toFixed(2)} %`
                    : "0.00 %"
        },
    ], []);

    const printConfig = {
        fields: [
            { header: "Khoa", fieldName: "facultyName" },
            { header: "Tổng số lượng SV của khoa", fieldName: "facultTotalCount" },
            { header: "Tổng số lượng SV lớn hơn 50 điểm", fieldName: "facultyOverFiftyPointCount" },
            {
                header: "Tỉ lệ",
                fieldName: "rate", // dùng 1 field nào đó làm key để match
                formatFunction: (value: any, row: any) => {
                    const total = row.facultTotalCount ?? 0;
                    const passed = row.facultyOverFiftyPointCount ?? 0;
                    return total > 0 ? `${((passed / total) * 100).toFixed(2)} %` : "0.00 %";
                }
            }
        ],
        title: `Ngày in: ${new Date().toLocaleDateString()}`,

        showRowNumbers: false,
    }

    if (queryRankingSchoolReport.isLoading) return "Đang tải dữ liệu...";
    if (queryRankingSchoolReport.isError) return "Không có dữ liệu...";

    return (
        <CustomFlexColumn >
            <CustomFieldset title="Hội đồng đánh giá kết quả rèn luyện cấp Trường" pt={20} >
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        {queryRankingSchoolReport.data && (
                            <Table highlightOnHover withTableBorder withColumnBorders >
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th
                                            bg={colorScheme === "dark" ?
                                                'var(--mantine-color-dark-4)' : "#cfe2ff"}
                                            style={{
                                                textAlign: 'center',
                                                borderColor: colorScheme === "dark" ?
                                                    'var(--mantine-color-dark-4)' :
                                                    "#a6b5cc"
                                            }}>Xếp loại</Table.Th>
                                        <Table.Th
                                            bg={colorScheme === "dark" ?
                                                'var(--mantine-color-dark-4)' : "#cfe2ff"}
                                            style={{
                                                textAlign: 'center',
                                                borderColor: colorScheme === "dark" ?
                                                    'var(--mantine-color-dark-4)' :
                                                    "#a6b5cc"
                                            }}>Số lượng</Table.Th>
                                        <Table.Th
                                            bg={colorScheme === "dark" ?
                                                'var(--mantine-color-dark-4)' : "#cfe2ff"}
                                            style={{
                                                textAlign: 'center',
                                                borderColor: colorScheme === "dark" ?
                                                    'var(--mantine-color-dark-4)' :
                                                    "#a6b5cc"
                                            }}>Tỉ lệ</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {queryRankingSchoolReport.data?.rateInfo && queryRankingSchoolReport.data?.rateInfo.map((item, index) => (
                                        <Table.Tr key={index}>
                                            <Table.Td style={{ textAlign: 'center' }}>{item.rateName}</Table.Td>
                                            <Table.Td style={{ textAlign: 'center' }}>{item.count}</Table.Td>
                                            <Table.Td style={{ textAlign: 'center' }}>
                                                {queryRankingSchoolReport.data?.totalCount
                                                    ? `${(((item.count ?? 0) / queryRankingSchoolReport.data.totalCount) * 100).toFixed(2)} %`
                                                    : '0%'}
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        )}
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        {queryRankingSchoolReport.data && <SchoolEvaluationCouncilChart rateInfo={queryRankingSchoolReport.data.rateInfo!} />}
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 12 }} mt={10}>
                        {queryRankingSchoolReport.data && <CustomDataTable
                            enableRowSelection={true}
                            enableRowNumbers={true}
                            columns={facultyReportColumns}
                            data={queryRankingSchoolReport?.data?.facultyReports || []}
                            enableBottomToolbar={true}
                            renderTopToolbarCustomActions={({ table }) => (
                                <Group>
                                    <CustomButtonPrintTablePDF
                                        printConfig={printConfig}
                                        data={queryRankingSchoolReport?.data?.facultyReports || []}
                                    />
                                </Group>
                            )}
                        />}

                    </Grid.Col>
                </Grid>
            </CustomFieldset>
        </CustomFlexColumn>

    )
}
