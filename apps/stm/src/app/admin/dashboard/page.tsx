// 'use client'
// import { service_userDashboard } from "@/api/services/service_userDashboard";
// import AQStatCard2 from "@/components/DataDisplay/StatCard/AQStatCard2";
// import BarChart_CourseStatus from "@/modules-features/(0)/MainDashboard/BarChart_CourseStatus";
// import BarChart_ExamStatus from "@/modules-features/(0)/MainDashboard/BarChart_ExamStatus";
// import BarChart_RevenueByAcademicYear from "@/modules-features/(0)/MainDashboard/BarChart_RevenueByAcademicYear";
// import BarChart_StudentStatusIn30Days from "@/modules-features/(0)/MainDashboard/BarChart_StudentStatusIn30Days";
// import HBarChart_CourseDropOutPercentage from "@/modules-features/(0)/MainDashboard/HBarChart_CourseDropOutPercentage";
// import HBarChart_CourseProgressPercentage from "@/modules-features/(0)/MainDashboard/HBarChart_CourseProgressPercentage";
// import LineChart_RevenueIn12Months from "@/modules-features/(0)/MainDashboard/LineChart_RevenueIn12Months";
// import LineChart_TotalRevenueByDiscountIn3Months from "@/modules-features/(0)/MainDashboard/LineChart_TotalRevenueByDiscountIn3Months";
// import LineChart_TotalRevenueByVoucherIn3Months from "@/modules-features/(0)/MainDashboard/LineChart_TotalRevenueByVoucherIn3Months";
// import LineChart_TotalStudentIn12Months from "@/modules-features/(0)/MainDashboard/LineChart_TotalStudentIn12Months";
// import { PieChart_DiscountUsedPercentage } from "@/modules-features/(0)/MainDashboard/PieChart_DiscountUsedPercentage";
// import { PieChart_VoucherUsedPercentage } from "@/modules-features/(0)/MainDashboard/PieChart_VoucherUsedPercentage";
// import { Grid, Paper, ScrollArea, SimpleGrid } from "@mantine/core";
// import { IconBook, IconClipboardCheck, IconReportMoney, IconUserPlus } from "@tabler/icons-react";
// import { MyPageContent } from "aq-fe-framework/components";
// import { useMyReactQuery } from "aq-fe-framework/hooks";
// import { utils_currency_formatWithSuffix } from "aq-fe-framework/utils";

// export default function Page() {
//     const getAdminDashBoard_query = useMyReactQuery({
//         queryKey: ["getAdminDashBoard"],
//         axiosFn: () => service_userDashboard.getAdminDashBoard()
//     })
//     if (getAdminDashBoard_query.isLoading) return "Đang tải dữ liệu"
//     return (
//         <MyPageContent>
//             <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }}>
//                 <AQStatCard2
//                     title={"Doanh thu"}
//                     value={utils_currency_formatWithSuffix(getAdminDashBoard_query.data?.revenue.total!)}
//                     unit="VNĐ"
//                     // description={"So với tháng trước"}
//                     icons={<IconReportMoney opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} />
//                 <AQStatCard2
//                     title={"Tổng số khóa học"}
//                     value={getAdminDashBoard_query.data?.course?.totalCourses?.toString()!}
//                     // description={"So với tháng trước"}
//                     icons={<IconBook opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} />
//                 <AQStatCard2
//                     title={"Tổng số khóa thi"}
//                     value={getAdminDashBoard_query.data?.exam?.totalExams?.toString()!}
//                     description={"So với tháng trước"}
//                     icons={<IconClipboardCheck opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} />
//                 <AQStatCard2
//                     title={"Tổng số học viên"}
//                     value={getAdminDashBoard_query.data?.studentQuantity.totalStudentQuantity.toString()!}
//                     // description={"So với tháng trước"}
//                     icons={<IconUserPlus opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} />
//             </SimpleGrid>

//             <Grid >
//                 <Grid.Col span={{ base: 12, lg: 5 }}>
//                     <Paper mt={"md"} p={'24'}>
//                         <BarChart_CourseStatus
//                             openCourseAmount={getAdminDashBoard_query.data?.course?.startedCourses}
//                             completedCourseAmound={getAdminDashBoard_query.data?.course?.completedCourses}
//                             closedCourseAmound={getAdminDashBoard_query.data?.course?.cancelledCourses}
//                         />
//                     </Paper>
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, lg: 7 }}>
//                     <Paper mt={"md"} p={'24'}>
//                         <BarChart_ExamStatus
//                             openCourseAmount={getAdminDashBoard_query.data?.exam?.startedExams}
//                             completedCourseAmound={getAdminDashBoard_query.data?.exam?.completedExams}
//                             closedCourseAmound={getAdminDashBoard_query.data?.exam?.cancelledExams}
//                             isCertificatedAmound={getAdminDashBoard_query.data?.exam?.certificateExams}
//                         />
//                     </Paper>
//                 </Grid.Col>
//             </Grid>

//             <Grid >
//                 <Grid.Col span={{ base: 12, lg: 5 }}>
//                     <Paper mt={"md"} p={'24'}>
//                         <BarChart_RevenueByAcademicYear
//                             data={getAdminDashBoard_query.data?.revenue.courseRevenues?.map(item => ({
//                                 courseCode: item.courseCode,
//                                 courseName: item.courseName,
//                                 revenue: item.revenue
//                             })) || []}
//                         />
//                     </Paper>
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, lg: 7 }}>
//                     <Paper mt={"md"} p={'24'}>
//                         <LineChart_RevenueIn12Months
//                             pass12MonthData={getAdminDashBoard_query.data?.revenue.past12MonthsAgoRevenue!}
//                         />
//                     </Paper>
//                 </Grid.Col>
//             </Grid>

//             <Grid >
//                 <Grid.Col span={{ base: 12, lg: 5 }}>
//                     <Paper mt={"md"} p={'24'}>
//                         <BarChart_StudentStatusIn30Days
//                             studyingAmound={getAdminDashBoard_query.data?.studentQuantity.totalStudentQuantity}
//                         />
//                     </Paper>
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, lg: 7 }}>
//                     <Paper mt={"md"} p={'24'}>
//                         <LineChart_TotalStudentIn12Months
//                             pass12MonthData={getAdminDashBoard_query.data?.studentQuantity.past12MonthsAgoStudentQuantity!}
//                         />
//                     </Paper>
//                 </Grid.Col>
//             </Grid>

//             <Grid >
//                 <Grid.Col span={{ base: 12, lg: 5 }}>
//                     <Paper p={'24'}>
//                         <PieChart_DiscountUsedPercentage
//                             total={getAdminDashBoard_query.data?.discount.totalUsed || 0}
//                             usedDiscount={getAdminDashBoard_query.data?.discount.discounts?.map(item => ({
//                                 amount: item.inUsed,
//                                 code: item.discountCode,
//                                 total: item.maxCount
//                             }))}
//                         />
//                     </Paper>
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, lg: 7 }}>
//                     <Paper h={'100%'} p={'24'}>
//                         <LineChart_TotalRevenueByDiscountIn3Months
//                             pass12MonthData={getAdminDashBoard_query.data?.last3MonthsDiscountRevenue!}
//                         />
//                     </Paper>
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, lg: 5 }}>
//                     <Paper p={'24'}>
//                         <PieChart_VoucherUsedPercentage
//                             total={getAdminDashBoard_query.data?.promotionCode?.totalUsed || 0}
//                             usedDiscount={getAdminDashBoard_query.data?.promotionCode?.promotionCodes?.map(item => ({
//                                 amount: item.inUsed,
//                                 code: item.discountCode,
//                                 total: item.maxCount
//                             }))}
//                         />
//                     </Paper>

//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, lg: 7 }} >
//                     <Paper p={'24'} h={'100%'}>
//                         <LineChart_TotalRevenueByVoucherIn3Months
//                             pass12MonthData={getAdminDashBoard_query.data?.last3MonthsPromotionCodeRevenue!}
//                         />
//                     </Paper>
//                 </Grid.Col>
//             </Grid>

//             <Grid >
//                 <Grid.Col span={{ base: 12, lg: 6 }}>
//                     <Paper mt={"md"} p={'24'}>
//                         <ScrollArea style={{ height: 400 }}>
//                             <HBarChart_CourseProgressPercentage
//                                 courseProcessData={getAdminDashBoard_query.data?.teachingProgress.map((item, idx) => {
//                                     const completed = item.completedCourseSectionSchedule ?? 0;
//                                     const total = item.totalCourseSectionSchedule ?? 0;
//                                     const progress = total === 0 ? 0 : ((completed / total) * 100);

//                                     return {
//                                         courseId: idx,
//                                         courseName: item.courseName,
//                                         progress: parseInt(progress.toFixed(0))
//                                     };
//                                 })}
//                             />
//                         </ScrollArea>
//                     </Paper>
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, lg: 6 }}>
//                     <Paper mt={"md"} p={'24'}>
//                         <ScrollArea style={{ height: 400 }}>
//                             <HBarChart_CourseDropOutPercentage />
//                         </ScrollArea>
//                     </Paper>
//                 </Grid.Col>
//             </Grid>
//         </MyPageContent>
//     )
// }



//prototype 
'use client'
import AQStatCard1 from "@/components/DataDisplay/StatCard/AQStatCard1";
import BarChart_CourseStatus from "@/modules-features/(0)/PrototypeMainDashboard/BarChart_CourseStatus";
import BarChart_ExamStatus from "@/modules-features/(0)/PrototypeMainDashboard/BarChart_ExamStatus";
import BarChart_RevenueByAcademicYear from "@/modules-features/(0)/PrototypeMainDashboard/BarChart_RevenueByAcademicYear";
import BarChart_StudentStatusIn30Days from "@/modules-features/(0)/PrototypeMainDashboard/BarChart_StudentStatusIn30Days";
import HBarChart_CourseDropOutPercentage from "@/modules-features/(0)/PrototypeMainDashboard/HBarChart_CourseDropOutPercentage";
import HBarChart_CourseProgressPercentage from "@/modules-features/(0)/PrototypeMainDashboard/HBarChart_CourseProgressPercentage";
import LineChart_RevenueIn12Months from "@/modules-features/(0)/PrototypeMainDashboard/LineChart_RevenueIn12Months";
import LineChart_TotalRevenueByDiscountIn3Months from "@/modules-features/(0)/PrototypeMainDashboard/LineChart_TotalRevenueByDiscountIn3Months";
import LineChart_TotalRevenueByVoucherIn3Months from "@/modules-features/(0)/PrototypeMainDashboard/LineChart_TotalRevenueByVoucherIn3Months";
import LineChart_TotalStudentIn12Months from "@/modules-features/(0)/PrototypeMainDashboard/LineChart_TotalStudentIn12Months";
import ViewDiscountStat from "@/modules-features/(0)/PrototypeMainDashboard/ViewDiscountStat";
import ViewVoucherStat from "@/modules-features/(0)/PrototypeMainDashboard/ViewVoucherStat";
import { Grid, Paper, ScrollArea, SimpleGrid } from "@mantine/core";
import { IconBook, IconClipboardCheck, IconReportMoney, IconUserPlus } from "@tabler/icons-react";

export default function Page() {
    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }}>
                <AQStatCard1
                    title={"Doanh thu"} value={'4.653.425'}
                    unit="Triệu VNĐ" description={"So với tháng trước"}
                    icons={<IconReportMoney opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={34} />
                <AQStatCard1
                    title={"Tổng số khóa học"} value={'152'}
                    description={"So với tháng trước"}
                    icons={<IconBook opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={18} />
                <AQStatCard1
                    title={"Tổng số khóa thi"} value={'36'}
                    description={"So với tháng trước"}
                    icons={<IconClipboardCheck opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={60} />
                <AQStatCard1
                    title={"Tổng số học viên"} value={'3.042'}
                    description={"So với tháng trước"}
                    icons={<IconUserPlus opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} diff={-30} />
            </SimpleGrid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 5 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_CourseStatus />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 7 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_ExamStatus />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_RevenueByAcademicYear />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <LineChart_RevenueIn12Months />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_StudentStatusIn30Days />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <LineChart_TotalStudentIn12Months />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ViewDiscountStat />
                    </Paper>
                    <Paper mt={"md"} p={'24'}>
                        <LineChart_TotalRevenueByDiscountIn3Months />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ViewVoucherStat />
                    </Paper>
                    <Paper mt={"md"} p={'24'}>
                        <LineChart_TotalRevenueByVoucherIn3Months />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ScrollArea style={{ height: 400 }}>
                            <HBarChart_CourseProgressPercentage />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <ScrollArea style={{ height: 400 }}>
                            <HBarChart_CourseDropOutPercentage />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>
        </>
    )
}
