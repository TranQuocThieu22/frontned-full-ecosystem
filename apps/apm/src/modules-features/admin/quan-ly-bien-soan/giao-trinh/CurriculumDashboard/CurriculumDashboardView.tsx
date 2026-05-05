import { Grid, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import BarChart_EditingProgress from "./BarChartEditingProgress";
import BarChart_ProposalCount from "./BarChartProposalCount";
import CurriculumDashboardCard from "./CurriculumDashboardCard";
import LineChart_issuedDocuments from "./LineChartIssuedDocuments";
import LineChart_remunerationTotal from "./LineChartRemunerationTotal";
import MyPieChart from "./PieChartGeneral";

export default function CurriculumDashboardView() {
    return (
        <Stack>
            <SimpleGrid cols={4} spacing="lg" >
                <CurriculumDashboardCard label="Tổng số CTĐT" value={35} />
                <CurriculumDashboardCard label="Số CTĐT đang biên soạn" value={12} />
                <CurriculumDashboardCard label="Số CTĐT chờ thẩm định" value={5} />
                <CurriculumDashboardCard label="Đề nghị chờ quyết toán" value={3} />
            </SimpleGrid>
            {/* Divider */}
            <Paper my={10} />

            {/* First Row */}
            <Text mb={"20"} fw={650} size="xl">Biểu đồ tổng quan về chương trình đào tạo</Text>
            <Grid>
                {/* Left Column */}
                <Grid.Col span={7}>
                    <Paper p={"24"}>
                        <BarChart_ProposalCount
                            chartTitle={"Số lượng đề xuất theo trạng thái"}
                            chartData={[
                                { proposal_status: 'Chờ sơ duyệt', amount: 5, color: 'rgb(254, 207, 22)' },
                                { proposal_status: 'Đã phê duyệt', amount: 15, color: '#2ca02c' },
                                { proposal_status: 'Đã từ chối', amount: 2, color: '#d62728' },

                            ]}
                            chartSeries={[
                                { name: 'amount', label: 'Số lượng' },
                            ]}
                            chartDataKey="proposal_status" />
                    </Paper>
                </Grid.Col>
                {/* Right Column */}
                <Grid.Col span={5}>
                    <Paper p={"24"}>
                        <MyPieChart
                            title={"Tỷ lệ đề xuất CTĐT so với ĐCCTHP"}
                            data={[{
                                value: 60,
                                name: "CTĐT",
                                color: "#fda31b"
                            }, {
                                value: 40,
                                name: "ĐCCTHP",
                                color: "#228be6"
                            }]}
                        />
                    </Paper>
                </Grid.Col>
            </Grid>

            {/* Divider */}
            <Paper my={10} />

            {/* Second Row */}
            <Text mb={"20"} fw={650} size="xl">Tình hình biên soạn</Text>
            <Grid>
                {/* Left Column */}
                <Grid.Col span={5}>
                    <Paper p={"24"}>
                        <MyPieChart
                            title={"Các giai đoạn của quá trình biên soạn"}
                            data={[{
                                value: 12,
                                name: "Đang biên soạn",
                                color: "#4ECDC4"
                            }, {
                                value: 3,
                                name: "Chờ giao nộp",
                                color: "#FFE66D"
                            }, {
                                value: 7,
                                name: "Đã giao nộp",
                                color: "#FF6B6B"
                            }]}
                        />
                    </Paper>
                </Grid.Col>
                {/* Right Column */}
                <Grid.Col span={7}>
                    <Paper p={"24"}>
                        <BarChart_EditingProgress
                            chartTitle={"Tiến độ biên soạn theo CTĐT/ĐCCTHP"}
                            chartData={[
                                { proposal_status: 'CTĐT Logistic', amount: 65, color: '#17becf' },
                                { proposal_status: 'ĐCCTHP QLCL', amount: 80, color: '#9467bd' },
                                { proposal_status: 'CTĐT Kế toán', amount: 40, color: '#1f77b4' },

                            ]}
                            chartSeries={[
                                { name: 'amount', label: 'Số lượng' },
                            ]}
                            chartDataKey="proposal_status" />
                    </Paper>
                </Grid.Col>
            </Grid>

            {/* Divider */}
            <Paper my={10} />

            {/* Third Row */}
            <Text mb={"20"} fw={650} size="xl">Trạng thái phê duyệt</Text>
            <Grid>
                {/* Left Column */}
                <Grid.Col span={5}>
                    <Paper p={"24"}>
                        <MyPieChart
                            title={"Trạng thái thẩm định"}
                            data={[{
                                value: 30,
                                name: "Chờ thẩm định",
                                color: "rgb(245, 232, 201)"
                            }, {
                                value: 40,
                                name: "Yêu cầu chỉnh sửa",
                                color: "rgb(0, 23, 83)"
                            }, {
                                value: 30,
                                name: "Đã phê duyệt",
                                color: "rgb(225, 31, 85)"
                            }]}
                        />
                    </Paper>
                </Grid.Col>
                {/* Right Column */}
                <Grid.Col span={7}>
                    <Paper p={"24"}>
                        <LineChart_issuedDocuments
                            chartTitle={"Số lượng văn bản ban hành theo năm/quý"}
                            chartData={[
                                { quarter: 'Quý 3/2024', props1: 37 },
                                { quarter: 'Quý 4/2024', props1: 125 },
                                { quarter: 'Quý 1/2025', props1: 88 },
                                { quarter: 'Quý 2/2025', props1: 150 },

                            ]}
                            chartSeries={[
                                { name: 'props1', color: "#59a89c" }, /**/
                            ]}
                            chartDataKey={"quarter"}
                            yAxisLabel="Số lượng"
                        />
                    </Paper>
                </Grid.Col>
            </Grid>

            {/* Divider */}
            <Paper my={10} />

            {/* Fourth Row */}
            <Text mb={"20"} fw={650} size="xl">Hoạt động tài chính</Text>
            <Grid>
                {/* Left Column */}
                <Grid.Col span={5}>
                    <Paper p={"24"}>
                        <MyPieChart
                            title={"Trạng thái đề nghị thanh toán thù lao"}
                            data={[{
                                value: 13,
                                name: "Chờ duyệt",
                                color: "#f4a460"
                            }, {
                                value: 2,
                                name: "Đã phê duyệt",
                                color: "#ff6347"
                            }]}
                        />
                    </Paper>
                </Grid.Col>
                {/* Right Column */}
                <Grid.Col span={7}>
                    <Paper p={"24"}>
                        <LineChart_remunerationTotal
                            chartTitle={"tổng quyết toán thù lao theo quý"}
                            chartData={[
                                { quarter: 'Quý 3/2024', props1: 26 },
                                { quarter: 'Quý 4/2024', props1: 40 },
                                { quarter: 'Quý 1/2025', props1: 79 },
                                { quarter: 'Quý 2/2025', props1: 57 },

                            ]}
                            chartSeries={[
                                { name: 'props1', color: "#f08080" }, /**/
                            ]}
                            chartDataKey={"quarter"}
                            yAxisLabel="Số Tiền (triệu đồng)"
                        />
                    </Paper>
                </Grid.Col>
            </Grid>
        </Stack>

    )
}