import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { PieChart } from '@mantine/charts';
import { Box, Card, Center, Flex, Text } from "@mantine/core";
import { useMemo } from 'react';


type F_iynoujfptk_PieChartProps = {
    totalCompletedCourseSection?: number;
    totalOngoingCourseSection?: number;
    totalUpcomingCourseSection?: number;
};

export default function F_iynoujfptk_PieChart(props: F_iynoujfptk_PieChartProps) {


    const pieData = useMemo(() => {
        return [
            { name: 'Đã dạy', value: props.totalCompletedCourseSection ?? 0, color: '#40c057' },
            { name: 'Đang dạy', value: props.totalOngoingCourseSection ?? 0, color: '#35b3e6' },
            { name: 'Sắp dạy', value: props.totalUpcomingCourseSection ?? 0, color: '#fdd01d' },
        ];
    }, [props.totalCompletedCourseSection, props.totalOngoingCourseSection, props.totalUpcomingCourseSection]);


    return (
        <MyFlexColumn>
            <Text fw={600} tt="uppercase" fz={{ base: 'sm', sm: 'md', md: 'lg' }} c="dimmed">Tổng số khóa</Text>
            <Center>
                <Box w="100%" h="100%">
                    <Flex
                        direction={'row'}
                        justify={{ base: 'center', sm: 'center' }}
                        align={{ base: 'center', sm: 'flex-start' }}
                        mah={950}
                        w="100%"
                    >
                        <Flex
                            justify="center"
                            align="center"
                            flex={{ base: 1, sm: 0.6 }}
                            p="md"
                            w="100%"
                            style={{ minHeight: '250px' }}
                        >
                            <PieChart
                                tooltipAnimationDuration={200}
                                strokeWidth={1}
                                withTooltip
                                withLabelsLine
                                labelsPosition="outside"
                                pieProps={{
                                    isAnimationActive: true,
                                }}
                                withLabels
                                labelsType="percent"
                                data={pieData}
                                style={{ maxWidth: '100%', minHeight: '200px' }}
                            />
                        </Flex>
                        <Flex
                            justify="center"
                            align={{ base: 'center', sm: 'flex-start' }}
                            w="100%"
                        >
                            <Card >
                                {pieData.map((entry, index) => (
                                    <Flex key={index} align="center" gap="xs" mb="xs">
                                        <Box w={10} h={10} bg={entry.color} style={{ borderRadius: '50%' }} />
                                        <Text fz={{ base: 'xs', sm: 'sm' }} truncate>
                                            {entry.name}
                                        </Text>
                                    </Flex>
                                ))}
                            </Card>
                        </Flex>
                    </Flex>
                </Box>
            </Center>
        </MyFlexColumn>
    );
} 