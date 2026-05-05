"use client"
import { service_COEReport } from "@/api/services/service_COEReport";
import { useSemesterStore } from "@aq-fe/core-ui/shared/features/Semester/useSemesterStore";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import '@mantine/charts/styles.css';
import { Divider, Grid, Paper, ScrollArea } from "@mantine/core";
import { HorizontalBarChartSkeleton, NumberCardsSkeleton, PieChartSkeleton } from "./ChartSkeleton";
import HBarChart_TotalActiveProgramPerUnitDepartment from "./mockCharts/HBarChart_TotalActiveProgramPerUnitDepartment";
import HBarChart_totalCOEGradeSubjectsAndPIsPerGrade from "./mockCharts/HBarChart_TotalCoreGradeSubjectPerGrade";
import HBarChart_TotalPLOsAndPIsPerGrade from "./mockCharts/HBarChart_TotalPLOsAndPIsPerGrade";
import HBarChart_TotalProgramAndGradePerUnitDepartment from "./mockCharts/HBarChart_TotalProgramAndGradePerUnitDepartment";
import { Piechart_PercentageStudentPassPLO } from "./mockCharts/Piechart_PercentageStudentPassPLO";
import { Piechart_PercentageSummarizedCoreGradeSubject } from "./mockCharts/Piechart_PercentageSummarizedCoreGradeSubject";
import ReportNumberCardSection from "./ReportNumberCardSection";


export default function MockLayout() {
    const semesterStore = useSemesterStore()
    const dashboardQuery = useCustomReactQuery({
        queryKey: [`dashboardQuery`, `BySemesterId`, semesterStore.state.semester?.id],
        axiosFn: () => service_COEReport.getDashboardReport(semesterStore.state.semester?.id || 0)
    });

    return (
        <>
            {/* Number Cards Section */}
            {dashboardQuery.isLoading ? (
                <NumberCardsSkeleton />
            ) : (
                <ReportNumberCardSection
                    facultyQuantity={dashboardQuery.data?.facultyQuantity ?? 0}
                    programQuantity={dashboardQuery.data?.programQuantity ?? 0}
                    gradeQuantity={dashboardQuery.data?.gradeQuantity ?? 0}
                    studentQuantity={dashboardQuery.data?.studentQuantity ?? 0}
                />
            )}
            <Divider />
            {/* Charts Section */}
            <Grid>
                <Grid.Col span={{ base: 12, xl: 6 }}>
                    {dashboardQuery.isLoading ?
                        <HorizontalBarChartSkeleton />
                        :
                        <Paper mt="md" p="24">
                            <ScrollArea style={{ height: 400 }}>
                                <HBarChart_TotalActiveProgramPerUnitDepartment
                                />
                            </ScrollArea>
                        </Paper>
                    }
                </Grid.Col>

                <Grid.Col span={{ base: 12, xl: 6 }}>
                    {dashboardQuery.isLoading ?
                        <HorizontalBarChartSkeleton />
                        :
                        <Paper mt="md" p="24">
                            <ScrollArea style={{ height: 400 }}>
                                <HBarChart_TotalProgramAndGradePerUnitDepartment
                                />
                            </ScrollArea>
                        </Paper>
                    }
                </Grid.Col>

                <Grid.Col span={{ base: 12, xl: 6 }}>
                    {dashboardQuery.isLoading ?
                        <HorizontalBarChartSkeleton />
                        :
                        <Paper mt="md" p="24">
                            <ScrollArea style={{ height: 400 }}>
                                <HBarChart_TotalPLOsAndPIsPerGrade
                                />
                            </ScrollArea>
                        </Paper>
                    }
                </Grid.Col>

                <Grid.Col span={{ base: 12, xl: 6 }}>
                    {dashboardQuery.isLoading ?
                        <>
                            <HorizontalBarChartSkeleton />
                        </>
                        :
                        <>
                            <Paper mt="md" p="24">
                                <ScrollArea style={{ height: 400 }}>
                                    <HBarChart_totalCOEGradeSubjectsAndPIsPerGrade
                                    />
                                </ScrollArea>
                            </Paper>
                        </>
                    }
                </Grid.Col>

                <Grid.Col span={{ base: 12, xl: 6 }}>
                    {dashboardQuery.isLoading ?
                        <>
                            <PieChartSkeleton />
                        </>
                        :
                        <>
                            <Paper mt="md" p="24">
                                <Piechart_PercentageSummarizedCoreGradeSubject
                                />
                            </Paper>
                        </>
                    }
                </Grid.Col>

                <Grid.Col span={{ base: 12, xl: 6 }}>
                    {dashboardQuery.isLoading ? <>
                        <PieChartSkeleton />
                    </>
                        :
                        <>
                            <Paper mt="md" p="24">
                                <Piechart_PercentageStudentPassPLO
                                />
                            </Paper>
                        </>}
                </Grid.Col>
            </Grid>

            <Divider my="lg" />
        </>
    );
}
