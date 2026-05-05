import { Group, Paper, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import { IconAlertTriangle, IconClockHour4, IconDeviceAnalytics, IconWorld } from "@tabler/icons-react";


export default function StatisticCard() {

    return (
        <SimpleGrid
            type="container"
            cols={{ base: 1, '400px': 2, '1000px': 4 }}
            spacing={{ base: 10, '300px': 'xl' }}
        >
            <Paper
                p="lg"
                withBorder
                shadow="lg"
                radius="lg"
                bg="blue.0"
                style={{
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                }}
            >
                <Group gap="xs" align="center" mb={8} wrap="nowrap">
                    <ThemeIcon variant="gradient" size="lg" gradient={{ from: 'blue', to: 'indigo' }} radius="xl">
                        <IconWorld size={20} />
                    </ThemeIcon>
                    <Text fz="h3" fw={600} c="blue.7">
                        Tổng số IP
                    </Text>
                </Group>
                <Text fz="h1" fw={800} c="dark.6">
                    235
                </Text>
            </Paper>


            <Paper
                p="lg"
                withBorder
                shadow="lg"
                radius="lg"
                bg="orange.0"
                style={{
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                }}
            >
                <Group gap="xs" align="center" mb={8} wrap="nowrap">
                    <ThemeIcon variant="gradient" size="lg" gradient={{ from: 'orange', to: 'yellow' }} radius="xl">
                        <IconClockHour4 size={20} />
                    </ThemeIcon>
                    <Text fz="h3" fw={600} c="orange.7">
                        IP Đang xử lý
                    </Text>
                </Group>
                <Text fz="h1" fw={800} c="dark.6">58</Text>
            </Paper>

            <Paper
                p="lg"
                withBorder
                shadow="lg"
                radius="lg"
                bg="red.0"
                style={{
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                }}
            >
                <Group gap="xs" align="center" mb={8} wrap="nowrap">
                    <ThemeIcon variant="gradient" size="lg" gradient={{ from: 'red', to: 'pink' }} radius="xl">
                        <IconAlertTriangle size={20} />
                    </ThemeIcon>
                    <Text fz="h3" fw={600} c="red.7">
                        IP Sắp hết hiệu lực
                    </Text>
                </Group>
                <Text fz="h1" fw={800} c="dark.6">15</Text>
            </Paper>

            <Paper
                p="lg"
                withBorder
                shadow="lg"
                radius="lg"
                bg="green.0"
                style={{
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                }}
            >
                <Group gap="xs" align="center" mb={8} wrap="nowrap">
                    <ThemeIcon variant="gradient" size="lg" gradient={{ from: 'green', to: 'teal' }} radius="xl">
                        <IconDeviceAnalytics size={20} />
                    </ThemeIcon>
                    <Text fz="h3" fw={600} c="green.7">
                        IP Đang được khai thác
                    </Text>
                </Group>
                <Text fz="h1" fw={800} c="dark.6">12</Text>
            </Paper>

        </SimpleGrid>
    );
}