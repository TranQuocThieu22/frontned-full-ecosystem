import { Box, Grid, Paper, ScrollArea, SimpleGrid, Text } from "@mantine/core";
import BarChartAvgTimePerEvaluation from "./CompilationProgress/BarChartAvgTimePerEvaluation";
import BarChartCurriculumDraftStatus from "./CompilationProgress/BarChartCurriculumDraftStatus";
import BarChartTotalPaidByExpenseType from "./FinancialActivities/BarChartTotalPaidByExpenseType";
import { PieChartPaymentRequestStatus } from "./FinancialActivities/PieChartPaymentRequestStatus";
import BarChartAvgScoreDistribution from "./ProductQuality/BarChartAvgScoreDistribution";
import { PieChartFinalApprovalRate } from "./ProductQuality/PieChartFinalApprovalRate";
import BarChartProposalsByStatus from "./ProposalStatus/BarChartProposalsByStatus";
import { PieChartProposalStatusRatio } from "./ProposalStatus/PieChartProposalStatusRatio";
import LectureStatCard from "./StatCard/LectureStatCard";

export default function LectureDashboardLayout() {
    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }}>
                <LectureStatCard
                    title={"Đễ xuất giáo trình"}
                    value={"125"}
                />
                <LectureStatCard
                    title={"Bảng thảo đang biên soạn"}
                    value={"78"}
                />
                <LectureStatCard
                    title={"Giáo trình đã phê duyệt"}
                    value={"35"}
                />
                <LectureStatCard
                    title={"Hội đồng thẩm định"}
                    value={"42"}
                />
            </SimpleGrid>

            <Text mt={20} mb={5} w={"100%"} fw={600} fz={20}>Trình trạng Đề xuất</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea h={{ base: 380 }}>
                            <BarChartProposalsByStatus />
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <PieChartProposalStatusRatio />
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={20} mb={5} w={"100%"} fw={600} fz={20}>Tiến độ Biên soạn</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea w={{ base: '100%' }}>
                            <Box w={"1100px"}>
                                <BarChartCurriculumDraftStatus />
                            </Box>
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <ScrollArea w={{ base: '100%' }}>
                            <Box w={"650px"}>
                                <BarChartAvgTimePerEvaluation />
                            </Box>
                        </ScrollArea>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={20} mb={5} w={"100%"} fw={600} fz={20}>Chất lượng Sản phẩm</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <PieChartFinalApprovalRate />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <Box >
                            <BarChartAvgScoreDistribution />
                        </Box>
                    </Paper>
                </Grid.Col>
            </Grid>

            <Text mt={20} mb={5} w={"100%"} fw={600} fz={20}>Hoạt động Tài Chính</Text>
            <Grid >
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <PieChartPaymentRequestStatus />
                    </Paper>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Paper mt={"5"} p={'24'}>
                        <Box >
                            <BarChartTotalPaidByExpenseType />
                        </Box>
                    </Paper>
                </Grid.Col>
            </Grid>
        </>
    )
}