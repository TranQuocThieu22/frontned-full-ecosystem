"use client"
import BarChart_TotalPublishedPaperByType from "@/modules-features/dashboard/Charts/BarChart_TotalPublishedPaperByType";
import HBarChart_ProgressOfResearchWorkByLecturer from "@/modules-features/dashboard/Charts/HBarChart_ProgressOfResearchWorkByLecturer";
import HBarChart_ProgressOfResearchWorkByStudent from "@/modules-features/dashboard/Charts/HBarChart_ProgressOfResearchWorkByStudent";
import MultiBarChart_TotalResearcherWorkByGroup from "@/modules-features/dashboard/Charts/MultiBarChart_TotalResearcherWorkByGroup";
import MultiBarChart_TotalResearcherWorkByLecturer from "@/modules-features/dashboard/Charts/MultiBarChart_TotalResearcherWorkByLecturer";
import MultiBarChart_TotalResearcherWorkByStudent from "@/modules-features/dashboard/Charts/MultiBarChart_TotalResearcherWorkByStudent";
import MultiLineChart_TotalPublishedPaperByYear from "@/modules-features/dashboard/Charts/MultiLineChart_TotalPublishedPaperByYear";
import { Piechart_PercentageOfAcceptedResearchByLevel } from "@/modules-features/dashboard/Charts/Piechart_PercentageOfAcceptedResearchByLevel";
import { Piechart_PercentageOfAcceptedResearchByRate } from "@/modules-features/dashboard/Charts/Piechart_PercentageOfAcceptedResearchByRate";
import { Piechart_PercentageOfPublishedPaperByType } from "@/modules-features/dashboard/Charts/Piechart_PercentageOfPublishedPaperByType";
import { FResearchTargetStatCard } from "@/modules-features/dashboard/StatView/FResearchTargetStatCard";
import { FTotalGroupNumberStatPanel } from "@/modules-features/dashboard/StatView/FTotalGroupNumberStatPanel";
import FViewSummaryStat from "@/modules-features/dashboard/StatView/FViewSummaryStat";
import '@mantine/charts/styles.css';
import { Divider, Flex, Grid, Paper, ScrollArea, Text } from "@mantine/core";
export default function Page() {
    return (
        // <MyPageContent
        //     title="Dashboard"
        // >
        //     {/* <FeatReportNumber />
        //     <FeatViewChartFacultyResearchProjects />
        //     <FeatViewResearchGroupActivities />
        //     <FeatViewStudentResearchActives />
        //     <FeatViewJournalArticleResults /> */}
        // </MyPageContent>
        <>
            <FViewSummaryStat />

            <Divider my="lg" />
            <Text fw={600} size="lg">Giảng viên thực hiện đề tài nghiên cứu khoa học</Text>
            <Grid >
                <Grid.Col span={{ base: 12, xl: 7 }}>
                    <Paper mt={"md"} p={'24'}>
                        <MultiBarChart_TotalResearcherWorkByLecturer />
                    </Paper>
                    <Paper mt={"md"} p={'24'}>
                        <ScrollArea style={{ height: 400 }}>
                            <HBarChart_ProgressOfResearchWorkByLecturer />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xl: 5 }}>
                    <Paper mt={"md"} p={'24'}>
                        <Piechart_PercentageOfAcceptedResearchByLevel />
                    </Paper>
                    <Paper mt={"md"} p={'24'}>
                        <Piechart_PercentageOfAcceptedResearchByRate />
                    </Paper>
                    <Paper mt={"md"} p={'24'}>
                        <FResearchTargetStatCard
                            title="Chỉ tiêu số lượng đề tài thực hiện năm 2024"
                            progressValue={2273}
                            targetValue={3000}
                        />
                    </Paper>
                    <Paper mt={"md"} p={'24'}>
                        <FResearchTargetStatCard
                            title="Chỉ tiêu số lượng đề tài nghiệm thu năm 2024"
                            progressValue={1281}
                            targetValue={1500}
                        />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Divider my="lg" />
            <Flex direction={"column"}>
                <Text mb={'md'} fw={600} size="lg">Nhóm nghiên cứu thực hiện đề tài nghiên cứu khoa học</Text>
                {/* <Text size="lg">Số lượng nhóm nghiên cứu: 5</Text> */}
                <FTotalGroupNumberStatPanel />
            </Flex>
            <Grid >
                <Grid.Col span={{ base: 12, xl: 7 }}>
                    <Paper mt={"md"} p={'24'}>
                        <MultiBarChart_TotalResearcherWorkByGroup />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xl: 5 }}>
                    <Paper mt={"md"} p={'24'}>
                        <Piechart_PercentageOfPublishedPaperByType />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Divider my="lg" />
            <Text fw={600} size="lg">Sinh viên thực hiện các hoạt động nghiên cứu khoa học</Text>
            <Grid >
                <Grid.Col span={{ base: 12, xl: 7 }}>
                    <Paper h={500} mt={"md"} p={'24'}>
                        <MultiBarChart_TotalResearcherWorkByStudent />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xl: 5 }}>
                    <Paper h={500} mt={"md"} p={'24'}>
                        {/* <ScrollArea h={360} flex={1}> */}
                        <HBarChart_ProgressOfResearchWorkByStudent />
                        {/* </ScrollArea> */}
                    </Paper>
                </Grid.Col>
            </Grid>

            <Divider my="lg" />
            <Flex direction={"column"}>
                <Text fw={600} size="lg">Kết quả thực hiện bài báo - tạp chí</Text>
                <Text mt={"5"} size="lg">Tổng số bài báo đã công bố: <strong>2568</strong></Text>
            </Flex>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <BarChart_TotalPublishedPaperByType />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"md"} p={'24'}>
                        <MultiLineChart_TotalPublishedPaperByYear />
                    </Paper>
                </Grid.Col>
            </Grid>
        </>

    )
}