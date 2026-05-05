'use client'
import AQStatCard2 from "@/components/DataDisplay/StatCard/AQStatCard2";
import DashboardCourseDropoutRiskChart from "@/features/admin/dashboard/DashboardCourseDropoutRiskChart";
import DashboardCourseProgressChart from "@/features/admin/dashboard/DashboardCourseProgressChart";
import DashboardCourseRevenueChart from "@/features/admin/dashboard/DashboardCourseRevenueChart";
import DashboardCourseStatusChart from "@/features/admin/dashboard/DashboardCourseStatusChart";
import DashboardDiscountRevenue3MonthsChart from "@/features/admin/dashboard/DashboardDiscountRevenue3MonthsChart";
import { DashboardDiscountUsedChart } from "@/features/admin/dashboard/DashboardDiscountUsedChart";
import DashboardExamStatusChart from "@/features/admin/dashboard/DashboardExamStatusChart";
import DashboardRevenue12MonthsChart from "@/features/admin/dashboard/DashboardRevenue12MonthsChart";
import DashboardStudent12MonthsChart from "@/features/admin/dashboard/DashboardStudent12MonthsChart";
import DashboardStudentStatus30DaysChart from "@/features/admin/dashboard/DashboardStudentStatus30DaysChart";
import DashboardVoucherRevenue3MonthsChart from "@/features/admin/dashboard/DashboardVoucherRevenue3MonthsChart";
import { DashboardVoucherUsedChart } from "@/features/admin/dashboard/DashboardVoucherUsedChart";
import { userDashboardService } from "@/shared/APIs/userDashboardService";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";
import { Grid, Paper, ScrollArea, SimpleGrid } from "@mantine/core";
import { IconBook, IconClipboardCheck, IconReportMoney, IconUserPlus } from "@tabler/icons-react";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_currency_formatWithSuffix } from "aq-fe-framework/utils";

export default function Page() {
    const getAdminDashBoard_query = useMyReactQuery({
        queryKey: ["getAdminDashBoard"],
        axiosFn: () => userDashboardService.getAdminDashBoard()
    });

    if (getAdminDashBoard_query.isLoading) return "Đang tải dữ liệu";

    return (
        <CustomPageContent>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }}>
                <AQStatCard2
                    title={"Doanh thu"}
                    value={utils_currency_formatWithSuffix(getAdminDashBoard_query.data?.revenue.total!)}
                    unit="VNĐ"
                    icons={<IconReportMoney opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <AQStatCard2
                    title={"Tổng số khóa học"}
                    value={getAdminDashBoard_query.data?.course?.totalCourses?.toString()!}
                    icons={<IconBook opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <AQStatCard2
                    title={"Tổng số khóa thi"}
                    value={getAdminDashBoard_query.data?.exam?.totalExams?.toString()!}
                    description={"So với tháng trước"}
                    icons={<IconClipboardCheck opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
                <AQStatCard2
                    title={"Tổng số học viên"}
                    value={getAdminDashBoard_query.data?.studentQuantity.totalStudentQuantity.toString()!}
                    icons={<IconUserPlus opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
            </SimpleGrid>

            <Grid>
                <Grid.Col span={{ base: 12, lg: 5 }}>
                    <Paper mt={"md"} p={'24'}>
                        <DashboardCourseStatusChart
                            openCourseAmount={getAdminDashBoard_query.data?.course?.startedCourses}
                            completedCourseAmound={getAdminDashBoard_query.data?.course?.completedCourses}
                            closedCourseAmound={getAdminDashBoard_query.data?.course?.cancelledCourses}
                        />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 7 }}>
                    <Paper mt={"md"} p={'24'}>
                        <DashboardExamStatusChart
                            openCourseAmount={getAdminDashBoard_query.data?.exam?.startedExams}
                            completedCourseAmound={getAdminDashBoard_query.data?.exam?.completedExams}
                            closedCourseAmound={getAdminDashBoard_query.data?.exam?.cancelledExams}
                            isCertificatedAmound={getAdminDashBoard_query.data?.exam?.certificateExams}
                        />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={{ base: 12, lg: 5 }}>
                    <Paper mt={"md"} p={'24'}>
                        <DashboardCourseRevenueChart
                            data={getAdminDashBoard_query.data?.revenue.courseRevenues?.map(item => ({
                                courseCode: item.courseCode,
                                courseName: item.courseName,
                                revenue: item.revenue
                            })) || []}
                        />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 7 }}>
                    <Paper mt={"md"} p={'24'}>
                        <DashboardRevenue12MonthsChart
                            pass12MonthData={getAdminDashBoard_query.data?.revenue.past12MonthsAgoRevenue!}
                        />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={{ base: 12, lg: 5 }}>
                    <Paper mt={"md"} p={'24'}>
                        <DashboardStudentStatus30DaysChart
                            studyingAmound={getAdminDashBoard_query.data?.studentQuantity.totalStudentQuantity}
                        />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 7 }}>
                    <Paper mt={"md"} p={'24'}>
                        <DashboardStudent12MonthsChart
                            pass12MonthData={getAdminDashBoard_query.data?.studentQuantity.past12MonthsAgoStudentQuantity!}
                        />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={{ base: 12, lg: 5 }}>
                    <Paper p={'24'}>
                        <DashboardDiscountUsedChart
                            total={getAdminDashBoard_query.data?.discount?.totalUsed || 0}
                            usedDiscount={getAdminDashBoard_query.data?.discount?.discounts?.map(item => ({
                                amount: item.inUsed,
                                code: item.discountCode,
                                total: item.maxCount
                            }))}
                        />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 7 }}>
                    <Paper h={'100%'} p={'24'}>
                        <DashboardDiscountRevenue3MonthsChart
                            pass12MonthData={getAdminDashBoard_query.data?.last3MonthsDiscountRevenue!}
                        />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 5 }}>
                    <Paper p={'24'}>
                        <DashboardVoucherUsedChart
                            total={getAdminDashBoard_query.data?.promotionCode?.totalUsed || 0}
                            usedDiscount={getAdminDashBoard_query.data?.promotionCode?.promotionCodes?.map(item => ({
                                amount: (item as any).inUsed,
                                code: (item as any).discountCode,
                                total: (item as any).maxCount
                            }))}
                        />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 7 }}>
                    <Paper p={'24'} h={'100%'}>
                        <DashboardVoucherRevenue3MonthsChart
                            pass12MonthData={getAdminDashBoard_query.data?.last3MonthsPromotionCodeRevenue!}
                        />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ScrollArea style={{ height: 400 }}>
                            <DashboardCourseProgressChart
                                courseProcessData={getAdminDashBoard_query.data?.teachingProgress?.map((item, idx) => {
                                    const completed = item.completedCourseSectionSchedule ?? 0;
                                    const total = item.totalCourseSectionSchedule ?? 0;
                                    const progress = total === 0 ? 0 : (completed / total) * 100;
                                    return {
                                        courseId: idx,
                                        courseName: item.courseName,
                                        progress: parseInt(progress.toFixed(0))
                                    };
                                })}
                            />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ScrollArea style={{ height: 400 }}>
                            <DashboardCourseDropoutRiskChart />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>
        </CustomPageContent>
    );
}
