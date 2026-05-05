import { BarChart } from '@mantine/charts';
import { Badge, Card, Divider, Flex, rem, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface Course {
    id: number;
    title: string;
    subjectCode: string;
    lecturer: string;
    value: number;
    maximum: number;
}

const CourseProgressChart = () => {
    const courseList: Course[] = [
        {
            id: 1,
            title: "Lập trình web",
            subjectCode: "WE001",
            lecturer: "Nguyễn Anh Khôi",
            value: 11,
            maximum: 24
        },
        {
            id: 2,
            title: "Tiếng anh III",
            subjectCode: "TA001",
            lecturer: "Nguyễn Anh Hai",
            value: 5,
            maximum: 24
        },
        {
            id: 3,
            title: "Tiếng anh I",
            subjectCode: "TA002",
            lecturer: "Nguyễn Quang Anh",
            value: 10,
            maximum: 24
        },
        {
            id: 4,
            title: "Lập trình Java",
            subjectCode: "TA003",
            lecturer: "Nguyễn Quang Anh",
            value: 8,
            maximum: 24
        },
        {
            id: 5,
            title: "OOP",
            subjectCode: "TA004",
            lecturer: "Nguyễn Quang Anh",
            value: 12,
            maximum: 24
        },
        {
            id: 6,
            title: "C#",
            subjectCode: "TA004",
            lecturer: "Nguyễn Quang Anh",
            value: 12,
            maximum: 24
        },
    ];
    const barColors = [
        '#FF6384', // Pink
        '#36A2EB', // Blue
        '#FFCE56', // Yellow
        '#4BC0C0', // Teal
        '#9966FF', // Purple
        '#FF9F40', // Orange
        '#7BC043', // Green
        '#F37736', // Coral
        '#0392CF', // Sky Blue
        '#D4145A', // Raspberry
    ];

    const chartData = courseList.map((course, index) => ({
        course: `${course.title} (${course.subjectCode})`,
        progress: Math.floor((course.value / course.maximum) * 100),
        value: `${course.value}/ ${course.maximum}`,
        color: barColors[index % barColors.length],
    }));
    // Tính trung bình phần trăm hoàn thành
    const averageProgress = chartData.length > 0
        ? Math.floor(chartData.reduce((sum, item) => sum + item.progress, 0) / chartData.length)
        : 0;

    return (
        <Card h={435}>
            <Flex
                justify={'space-between'}
                align={'center'}
            >
                <Text tt="uppercase" size="md" fw={600}>
                    Tiến độ hoàn thành khóa học
                </Text>
                <Badge variant="light" color="blue" size="lg" radius="sm"><IconPlus stroke={2} style={{ marginBottom: '3px', width: "15px", height: '15px' }} />  {averageProgress} %</Badge>
            </Flex>
            <Divider variant="dashed" w="100%" mt="sm" />

            {chartData.length > 0 ? (
                <BarChart
                    h={350}
                    data={chartData}
                    dataKey="course"
                    orientation="vertical"
                    withLegend={false}
                    yAxisProps={{
                        width: 160,
                        tickFormatter: (value) => value.length > 20 ? `${value.slice(0, 20)}...` : value
                    }}
                    xAxisProps={{
                        tickFormatter: (value) => `${value}%`,
                        domain: [0, 100]
                    }}
                    barProps={{
                        radius: 4,
                        label: {
                            position: "right",
                            color: "white",
                            fontSize: rem(10),
                            formatter: (value: unknown) => value + "%",
                        },
                    }}
                    valueFormatter={(value) => new Intl.NumberFormat('en-US').format(value)}
                    series={[{ name: 'progress', label: "hoàn thành", color: 'blue.6' }]}
                    strokeDasharray={5}
                    maxBarWidth={25}
                    tooltipProps={{
                        content: ({ payload }) => {
                            if (!payload || payload.length === 0) return null;
                            const data = payload[0]?.payload;
                            return (
                                <Card withBorder p="xs">
                                    <Text fw={500}>{data.course}</Text>
                                    <Text size="sm" c='dimmed'>Hoàn thành: {data.progress}%</Text>
                                    <Text size="sm" c='dimmed'>Số buổi: {data.value}</Text>
                                </Card>
                            );
                        }
                    }}

                />
            ) : (
                <Stack align="center" justify="center" h="calc(435px - 60px)">
                    <Text c="dimmed" ta="center">
                        Không có dữ liệu để hiển thị.
                    </Text>
                </Stack>
            )}
        </Card>
    );
};

export default CourseProgressChart;