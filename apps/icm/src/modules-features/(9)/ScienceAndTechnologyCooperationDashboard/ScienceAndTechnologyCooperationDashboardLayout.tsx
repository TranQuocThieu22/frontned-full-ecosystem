import { Group, Paper, Stack, Title } from "@mantine/core";
import OutputsByTypeBarChar from "./CollabProject/OutputsByTypeBarChar";
import ProjectBudgetProgressBarChar from "./CollabProject/ProjectBudgetProgressBarChar";
import ProjectDistributionbyExpertiseBarChar from "./CollabProject/ProjectDistributionbyExpertiseBarChar";
import ProjectStatusPieChart from "./CollabProject/ProjectStatusPieChart";
import AgreementByMainAreasBarChar from "./CooperationAgreement/AgreementByMainAreasBarChar";
import AgreementStatusPieChart from "./CooperationAgreement/AgreementStatusPieChart";
import CooperationClassificationPieChart from "./CooperationRelationship/CooperationClassificationPieChart";
import DistributionByRegionBarChar from "./CooperationRelationship/DistributionByRegionBarChar";
import CooperationStatisticCard from "./CooperationStatisticCard";
import ExchangeRatePieChart from "./StaffAndStudentExchange/ExchangeRatePieChart";
import ExchangeTrendLineChart from "./StaffAndStudentExchange/ExchangeTrendLineChart";



export default function ScienceAndTechnologyCooperationDashboardLayout() {

    return (
        <>
            <style jsx global>
                {
                    `.recharts-pie path:focus {
                        outline: none;
                    }`
                }
            </style>
            <CooperationStatisticCard />
            <Paper
                p="lg"
                mt={20}
                radius="lg"
                shadow="md"
                bg="gray.0"
            >
                <Title order={2} mb={4}>
                    Quan hệ Đối tác
                </Title>

                <Group align="flex-start" mt="md" mb="xl">
                    <Stack w={{ base: '100%', md: '47.5%' }}>
                        <CooperationClassificationPieChart />
                    </Stack>
                    <Stack w={{ base: '100%', md: '47.5%' }}>
                        <DistributionByRegionBarChar />
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
                <Title order={2} mb={4}>
                    Thỏa thuận Hợp tác
                </Title>

                <Group align="flex-start" mt="md" mb="xl">
                    <Stack w={{ base: '100%', md: '47.5%' }}>
                        <AgreementStatusPieChart />
                    </Stack>
                    <Stack w={{ base: '100%', md: '47.5%' }}>
                        <AgreementByMainAreasBarChar />
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
                <Title order={2} mb={4}>Dự án Hợp tác</Title>
                <Group align="flex-start" mt="md">
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <ProjectStatusPieChart />
                    </Stack>
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <ProjectDistributionbyExpertiseBarChar />
                    </Stack>
                </Group>
                <Group align="flex-start" mt="md">
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <ProjectBudgetProgressBarChar />
                    </Stack>
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <OutputsByTypeBarChar />
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
                <Title order={2} mb={4}>Trao đổi Cán bộ & Sinh viên</Title>
                <Group align="flex-start">
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <ExchangeRatePieChart />
                    </Stack>
                    <Stack w={{ base: '100%', sm: '47.5%' }}>
                        <ExchangeTrendLineChart />
                    </Stack>
                </Group>
            </Paper>
        </>
    );
}