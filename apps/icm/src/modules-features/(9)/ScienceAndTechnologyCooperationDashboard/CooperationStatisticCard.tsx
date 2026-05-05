import { Group, Paper, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import { IconBriefcase, IconFileLike, IconMessageDots, IconUsers } from "@tabler/icons-react";


export default function CooperationStatisticCard() {

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
                        <IconUsers size={20} />
                    </ThemeIcon>
                    <Text fz="h3" fw={600} c="blue.7">
                        Tổng số Đối tác
                    </Text>
                </Group>
                <Text fz="h1" fw={800} c="dark.6">
                    125
                </Text>
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
                    <ThemeIcon variant="gradient" size="lg" gradient={{ from: 'teal', to: 'green' }} radius="xl">
                        <IconFileLike size={20} />
                    </ThemeIcon>
                    <Text fz="h3" fw={600} c="teal.7">
                        Thỏa thuận còn hiệu lực
                    </Text>
                </Group>
                <Text fz="h1" fw={800} c="dark.6">68</Text>
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
                        <IconBriefcase size={20} />
                    </ThemeIcon>
                    <Text fz="h3" fw={600} c="orange.7">
                        Dự án đang triển khai
                    </Text>
                </Group>
                <Text fz="h1" fw={800} c="dark.6">23</Text>
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
                    <ThemeIcon variant="gradient" size="lg" gradient={{ from: 'pink', to: 'red' }} radius="xl">
                        <IconMessageDots size={20} />
                    </ThemeIcon>
                    <Text fz="h3" fw={600} c="pink.7">
                        Tổng số lượt trao đổi
                    </Text>
                </Group>
                <Text fz="h1" fw={800} c="dark.6">1598</Text>
            </Paper>

        </SimpleGrid>
    );
}