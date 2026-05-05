import { Box, Grid, Paper, ScrollArea, SimpleGrid, Text } from "@mantine/core";
import { PieChartContentEvaluationQuality } from "./EvaluationQuality/PieChartContentEvaluationQuality";
import { PieChartTechnicalEvaluationQuality } from "./EvaluationQuality/PieChartTechnicalEvaluationQuality";
import BarChartLectureStatus from "./LectureStatus/BarChartLectureStatus";
import { PieChartLectureStatus } from "./LectureStatus/PieChartLectureStatus";
import BarChartAverageTimeStats from "./Performance/BarChartAverageTimeStats";
import BarChartDevelopmentTimeChart from "./Performance/BarChartDevelopmentTimeChart";
import BarChartEvaluationCount from "./ResourceAnalysis/BarChartEvaluationCount";
import BarChartLectureCount from "./ResourceAnalysis/BarChartLectureCount";
import LectureStatCard from "./StatCard/LectureStatCard";

export default function ElectronicLectureDashboardLayout() {
    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }}>
                <LectureStatCard
                    title={"Bài giảng đang phát triển"}
                    value={"22"}
                />
                <LectureStatCard
                    title={"Tỷ lệ Phê duyệt"}
                    value={"85%"}
                />
                <LectureStatCard
                    title={"Bài giảng Chờ Duyệt"}
                    value={"35"}
                />
                <LectureStatCard
                    title={"Trung bình phát triển"}
                    value={"90 ngày"}
                />
            </SimpleGrid>

            <Text mt={20} mb={5} w={"100%"} fw={600} fz={20}>Trình trạng Bài giảng</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea h={{ base: 380 }}>
                            <BarChartLectureStatus />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <PieChartLectureStatus />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={20} mb={5} w={"100%"} fw={600} fz={20}>Chất lượng Thẩm định</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <PieChartTechnicalEvaluationQuality />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <PieChartContentEvaluationQuality />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={20} mb={5} w={"100%"} fw={600} fz={20}>Hiệu suất</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea style={{ height: 400 }}>
                            <BarChartDevelopmentTimeChart />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <Box style={{ height: 400 }} >
                            <BarChartAverageTimeStats />
                        </Box>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={20} mb={5} w={"100%"} fw={600} fz={20}>Phân tích Nguồn lực</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <BarChartLectureCount />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <BarChartEvaluationCount />
                    </Paper>
                </Grid.Col>
            </Grid>
        </>
    )
}