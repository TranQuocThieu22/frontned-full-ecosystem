import { Box, Flex, Group, Paper, Progress, SimpleGrid, Text } from '@mantine/core';

const data = [
    { label: 'Công nghệ thông tin', count: 15, color: getRandomColor(33) },
    { label: 'Quản trị kinh doanh', count: 7, color: getRandomColor(22) },
    { label: 'Ngôn ngữ học', count: 5, color: getRandomColor(23) },
    { label: 'Điện tử', count: 5, color: getRandomColor(59) },
    { label: 'Tự động hóa', count: 20, color: getRandomColor(90) },
    { label: 'Hóa sinh', count: 1, color: getRandomColor(63) },
    { label: 'Mỹ thuật', count: 1, color: getRandomColor(123) },
    { label: 'Kinh tế', count: 1, color: getRandomColor(45) },
    { label: 'Luật', count: 1, color: getRandomColor(67) },
    { label: 'Y học', count: 1, color: getRandomColor(89) },
    { label: 'Dược', count: 1, color: getRandomColor(12) },
    { label: 'Kiến trúc', count: 1, color: getRandomColor(34) },
    { label: 'Xây dựng', count: 1, color: getRandomColor(56) },
    { label: 'Môi trường', count: 1, color: getRandomColor(78) },
    { label: 'Nông nghiệp', count: 1, color: getRandomColor(92) },
    { label: 'Thủy sản', count: 1, color: getRandomColor(839) },
    { label: 'Thú y', count: 1, color: getRandomColor(43) }
];

function getRandomColor(seed: number): string {
    const random = Math.sin(seed) * 10000;
    const color = `#${Math.floor((random - Math.floor(random)) * 16777215).toString(16).padStart(6, '0')}`;
    return color;
}

export function FTotalGroupNumberStatPanel() {

    const total = data.reduce((acc, segment) => acc + segment.count, 0);

    const segments = data.map((item) => (
        <Progress.Section value={parseFloat(((item.count / total) * 100).toFixed(1))} color={item.color} key={item.color}>
            {parseFloat(((item.count / total) * 100).toFixed(1)) > 5 && <Progress.Label>{((item.count / total) * 100).toFixed(1)}%</Progress.Label>}
        </Progress.Section>
    ));

    const descriptions = data.map((item) => (
        <Box key={item.label}
            style={{ borderBottom: `2px solid ${item.color}`, padding: '8px 0' }}
        >
            <Text tt="uppercase" fz="xs"
                // c="dimmed"
                c={item.color}
                fw={700}>
                {item.label}
            </Text>

            <Group justify='space-between'>
                <Text fw={700}>{item.count}</Text>
                <Text c={item.color} fw={700} size="sm">
                    {parseFloat(((item.count / total) * 100).toFixed(1))}%
                </Text>
            </Group>
        </Box>
    ));

    return (
        <Paper withBorder p="md" radius="md">
            <Flex direction="column">
                <Text fz="lg" fw={600}>
                    Số lượng nhóm nghiên cứu
                </Text>
                <Group >
                    <Text fz="xl" fw={700}>
                        {total}
                    </Text>
                </Group>
            </Flex>

            <Progress.Root size="20">
                {segments}
            </Progress.Root>
            <SimpleGrid cols={{ base: 2, xs: 4, md: 5, lg: 6 }} mt="xl">
                {descriptions}
            </SimpleGrid>
        </Paper>
    );
}