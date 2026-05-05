import { RadialBarChart } from '@mantine/charts';
import { Badge, Box, Center, Divider, Flex, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { IUserDashboardData } from './interfaces/StudentDashBoard';

interface ChartProps {
    studentData: IUserDashboardData;
}

// Function to generate random color
const getRandomColor = (index: number) => {
    const colors = [
        '#FF6384', // Pink
        '#36A2EB', // Blue
        '#FFCE56', // Yellow
        '#4BC0C0', // Teal
        '#FF9F40', // Orange
        '#7BC043', // Green
        '#F37736', // Coral
        '#0392CF', // Sky Blue
        '#D4145A', // Raspberry
    ];
    return colors[index % colors.length];
};

export default function F_vmz23lu0tk_RadiaChart({ studentData }: ChartProps) {
    // Calculate average progress
    const averageProgress = studentData.course?.courses?.reduce((acc, course) => {
        const [attended, total] = (course.attendance || '0/0').split('/').map(Number);
        const progressValue = total ? Math.floor(((attended ?? 0) / total) * 100) : 0;
        return acc + progressValue;
    }, 0) || 0;

    const finalAverageProgress = studentData.course?.courses?.length
        ? Math.floor(averageProgress / studentData.course.courses.length)
        : 0;

    // Transform course data for radial bar chart
    const chartData = studentData.course?.courses?.map((course, index) => {
        const [attended, total] = (course.attendance || '0/0').split('/').map(Number);
        const progressValue = total ? Math.floor(((attended ?? 0) / total) * 100) : 0;

        return {
            label: course.courseName,
            name: `${course.courseName} (${progressValue}%)`,
            value: progressValue,
            color: getRandomColor(index),
        };
    }) || [];

    return (
        <Box h={'65vh'} mt={20}>
            <Flex
                justify={'space-between'}
                align={'center'}
            >
                <Text tt="uppercase" size="md" fw={600}>
                    Tiến độ hoàn thành khóa học
                </Text>
                <Badge variant="light" color="blue" size="lg" radius="sm">
                    <IconPlus stroke={2} style={{ marginBottom: '3px', width: "15px", height: '15px' }} />
                    {finalAverageProgress}%
                </Badge>
            </Flex>
            <Divider variant="dashed" w="100%" mt="sm" />
            <Box h="calc(100% - 100px)">
                <Center h="100%">
                    <RadialBarChart
                        data={chartData}
                        dataKey="value"
                        h={280}
                        w={280}
                        withLabels
                        withTooltip
                    />
                </Center>
            </Box>
        </Box>
    );
}