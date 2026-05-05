import { Group, Paper, Stack, Title } from "@mantine/core";
import IPsByLegalStatusBarChar from "./LegalStatus&ProcessingProgress/IPsByLegalStatusBarChar";
import ProcessingProgressIPProfileLineChart from "./LegalStatus&ProcessingProgress/ProcessingProgressIPProfileLineChart";
import NumberOfMiningContractsLineChart from "./MiningEfficiency/NumberOfMiningContractsLineChart";
import RevenueFromIPExploitationBarChart from "./MiningEfficiency/RevenueFromIPExploitationBarChart";
import StatisticCard from "./StatisticCard";
import IPClassificationPieChart from "./TrackingAssessmentResults/IPClassificationPieChart";
import IPsByDepartmentBarChar from "./TrackingAssessmentResults/IPsByDepartmentBarChar";
import IPsByFieldBarChar from "./TrackingAssessmentResults/IPsByFieldBarChar";
import NewIPRegistrationTrendLineChart from "./TrackingAssessmentResults/NewIPRegistrationTrendLineChart";



export default function IntellectualPropertyDasboardLayout() {

    return (
        <>
            <style jsx global>
                {
                    `.recharts-pie path:focus {
                        outline: none;
                    }`
                }
            </style>
            <StatisticCard />
            <Paper
                p="lg"
                mt={20}
                radius="lg"
                shadow="md"
                bg="gray.0"
            >
                <Title order={2} mb={4}>
                    Biểu đồ theo dõi kết quả đánh giá
                </Title>

                <Group align="flex-start" mt="md" mb="xl">
                    <Stack w={{ base: '100%', md: '47.5%' }}>
                        <IPClassificationPieChart />
                    </Stack>
                    <Stack w={{ base: '100%', md: '47.5%' }}>
                        <IPsByDepartmentBarChar />
                    </Stack>
                </Group>
                <Group align="flex-start">
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <IPsByFieldBarChar />
                    </Stack>
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <NewIPRegistrationTrendLineChart />
                    </Stack>
                </Group>
            </Paper>
            <Paper
                p="lg"
                mt={20}
                radius="lg"
                shadow="md"
                bg="gray.0"
            >
                <Title order={2} mb={4}>Tình trạng Pháp lý & Tiến độ Xử lý</Title>
                <Group align="flex-start">
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <IPsByLegalStatusBarChar />
                    </Stack>
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <ProcessingProgressIPProfileLineChart />
                    </Stack>
                </Group>
            </Paper>
            <Paper
                p="lg"
                mt={20}
                radius="lg"
                shadow="md"
                bg="gray.0"
            >
                <Title order={2} mb={4}>Hiệu quả Khai thác</Title>
                <Group align="flex-start">
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <RevenueFromIPExploitationBarChart />
                    </Stack>
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <NumberOfMiningContractsLineChart />
                    </Stack>
                </Group>
            </Paper>
        </>
    );
}