"use client"
import { service_COEReport } from "@/api/services/service_COEReport";
import { useSemesterStore } from "@aq-fe/core-ui/shared/features/Semester/useSemesterStore";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import '@mantine/charts/styles.css';
import { Divider, Grid, Paper, ScrollArea } from "@mantine/core";
import HBarChart_TotalActiveProgramPerUnitDepartment from "./Charts/HBarChart_TotalActiveProgramPerUnitDepartment";
import HBarChart_totalCOEGradeSubjectsAndPIsPerGrade from "./Charts/HBarChart_TotalCoreGradeSubjectPerGrade";
import HBarChart_TotalPLOsAndPIsPerGrade from "./Charts/HBarChart_TotalPLOsAndPIsPerGrade";
import HBarChart_TotalProgramAndGradePerUnitDepartment from "./Charts/HBarChart_TotalProgramAndGradePerUnitDepartment";
import { Piechart_PercentageStudentPassCLO } from "./Charts/Piechart_PercentageStudentPassCLO";
import { Piechart_PercentageSummarizedCoreGradeSubject } from "./Charts/Piechart_PercentageSummarizedCoreGradeSubject";
import { HorizontalBarChartSkeleton, NumberCardsSkeleton, PieChartSkeleton } from "./ChartSkeleton";
import ReportNumberCardSection from "./ReportNumberCardSection";


export default function DashboardLayout() {
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
                                    unitGrades={dashboardQuery.data?.unitGrades || []}
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
                                    unitGrades={dashboardQuery.data?.unitGrades || []}
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
                                    COEGradeInfo={dashboardQuery.data?.coeGradeInfos || []}
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
                                        COEGradeInfo={dashboardQuery.data?.coeGradeInfos || []}
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
                                    COEGradeInfo={dashboardQuery.data?.coeGradeInfos || []}
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
                                <Piechart_PercentageStudentPassCLO
                                    studentOfSemester={dashboardQuery.data?.studentOfSemester || 0}
                                    studentUnPassedCLO={dashboardQuery.data?.studentUnPassedCLO || 0}
                                />
                            </Paper>
                        </>}
                </Grid.Col>
            </Grid>

            <Divider my="lg" />
        </>
    );
}