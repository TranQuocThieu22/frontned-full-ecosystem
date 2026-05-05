"use client";
import HBarChart_AllSurveyProgressionsCurrentSemester from "@/modules-features/admin/ModuleAdminDashboard/OverallCharts/HBarChart_AllSurveyProgressionsCurrentSemester";
import { Piechart_TotalPLORateByIndustryPerCurriculum } from "@/modules-features/admin/ModuleAdminDashboard/RateByIndustry/Piechart_TotalPLORateByIndustryPerCurriculum";
import AQStatCard2 from "@/modules-features/admin/ModuleAdminDashboard/StatCard/AQStatCard2";
import { Box, Grid, Paper, ScrollArea, SimpleGrid, Text } from "@mantine/core";
import { IconBook, IconClipboardCheck, IconReportMoney, IconUserPlus } from "@tabler/icons-react";
import { MyPageContent } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { utils_currency_formatWithSuffix } from "aq-fe-framework/utils";
import HBarChart_AllSurveyProgressionsPerGrade from "@/modules-features/admin/ModuleAdminDashboard/RatePLOByStudent/HBarChart_AllSurveyProgressionsPerGrade";
import HBarChart_CLOPassedPerCourseSection from "@/modules-features/admin/ModuleAdminDashboard/RateCLOByStudent/HBarChart_CLOPassedPerCourseSection";
import HBarChart_PLOPassedPerGrade from "@/modules-features/admin/ModuleAdminDashboard/RatePLOByStudent/HBarChart_PLOPassedPerGrade";
import HBarChart_TotalCourseSectionHasCLOSurveyPerGrade from "@/modules-features/admin/ModuleAdminDashboard/RateCLOByStudent/HBarChart_TotalCourseSectionHasCLOSurveyPerGrade";
import HBarChart_PLOPassedPerGradeByIndustry from "@/modules-features/admin/ModuleAdminDashboard/RateByIndustry/HBarChart_PLOPassedPerGradeByIndustry";
import { Piechart_TotalInstructorRatingByStudentPerGrade } from "@/modules-features/admin/ModuleAdminDashboard/RateInstructorByStudent/Piechart_TotalInstructorRatingByStudentPerGrade";
import HBarChart_PleasurementRateForUnitDepartmentByStudent from "@/modules-features/admin/ModuleAdminDashboard/RateInstructorByStudent/HBarChart_PleasurementRateForUnitDepartmentByStudent";
import HBarChart_SurveyProgressionsByInstructorPerUnitDepartment from "@/modules-features/admin/ModuleAdminDashboard/RateByInstructor/HBarChart_SurveyProgressionsByInstructorPerUnitDepartment";
import HBarChart_PleasurementRateByInstructorPerUnitDepartment from "@/modules-features/admin/ModuleAdminDashboard/RateByInstructor/HBarChart_PleasurementRateByInstructorPerUnitDepartment";

export default function Page() {
    return (
        <MyPageContent>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }}>
                <AQStatCard2
                    title={"Tổng số chiến dịch"}
                    value={"263"}
                // unit="VNĐ"
                // description={"So với tháng trước"}
                // icons={<IconReportMoney opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} 
                />
                <AQStatCard2
                    title={"Chiến dịch học kỳ"}
                    value={"23"}
                // description={"So với tháng trước"}
                // icons={<IconTargetArrow opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} 
                />
                <AQStatCard2
                    title={"Chiến dịch học kỳ đang chạy"}
                    value={"17/23"}
                    description={"So với tháng trước"}
                // icons={<IconFlagCheck opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />} 
                />
                <AQStatCard2
                    title={"Chiến dịch học kỳ đã đóng"}
                    value={"4/23"}
                // description={"So với tháng trước"}
                // icons={<IconFlagX opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
                />
            </SimpleGrid>


            <Text mt={28} mb={5} w={"100%"} fw={700} fz={20}>Tổng quan Hoạt động khảo sát</Text>
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    <Paper p={'24'}>
                        <ScrollArea style={{ height: 360 }}>
                            <HBarChart_AllSurveyProgressionsCurrentSemester />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={32} mb={5} w={"100%"} fw={700} fz={20}>Người học đánh giá CLO Môn học</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 7 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea w={{ base: '100%' }}>
                            <Box w={"280%"}>
                                <HBarChart_TotalCourseSectionHasCLOSurveyPerGrade />
                            </Box>
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 5 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea h={{ base: 465 }} w={{ base: '100%' }}>
                            <HBarChart_CLOPassedPerCourseSection />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={32} mb={5} w={"100%"} fw={700} fz={20}>Người học đánh giá PLO Chương trình đào tạo</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea h={{ base: 380 }}>
                            <HBarChart_AllSurveyProgressionsPerGrade />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea h={{ base: 380 }}>
                            <HBarChart_PLOPassedPerGrade />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={32} mb={5} w={"100%"} fw={700} fz={20}>Nhà tuyển dụng đánh giá PLO Chương trình đào tạo</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <Piechart_TotalPLORateByIndustryPerCurriculum />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea h={{ base: 380 }}>
                            <HBarChart_PLOPassedPerGradeByIndustry />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={32} mb={5} w={"100%"} fw={700} fz={20}>Sinh viên đánh giá Cán bộ giảng dạy & Môn học</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 7, xl: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <Piechart_TotalInstructorRatingByStudentPerGrade />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea h={{ base: 380 }}>
                            <HBarChart_PleasurementRateForUnitDepartmentByStudent />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={32} mb={5} w={"100%"} fw={700} fz={20}>Giảng viên - Môn học đánh giá sinh viên</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea h={{ base: 380 }}>
                            <HBarChart_SurveyProgressionsByInstructorPerUnitDepartment />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea h={{ base: 380 }}>
                            <HBarChart_PleasurementRateByInstructorPerUnitDepartment />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>
        </MyPageContent>
    )
}
