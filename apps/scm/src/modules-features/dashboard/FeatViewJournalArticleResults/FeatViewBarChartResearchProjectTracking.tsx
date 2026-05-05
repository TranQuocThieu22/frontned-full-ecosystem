"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { topic_status: 'SCIE', amount: 70, color: 'orange.6' },
    { topic_status: 'SSCI', amount: 80, color: 'yellow.6' },
    { topic_status: 'Scopus', amount: 10, color: 'green.6' },
    { topic_status: 'Quốc gia', amount: 90, color: 'red.6' }
]

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}


function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={item.color} fz="sm">
                    Số lượng: {item.value}
                </Text>
            ))}
        </Paper>
    );
}

export default function FeatViewBarChartResearchProjectTracking() {
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ theo dõi thực hiện đề tài nghiên cứu khoa học </Text>
                <BarChart
                    h={200}
                    w={400}
                    data={data}
                    dataKey="topic_status"
                    series={[
                        { name: 'amount', color: 'color', label: 'Số lượng' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Số lượng"
                    yAxisProps={{ width: 64 }}
                    maxBarWidth={64}
                    tickLine="y"
                    barProps={{
                        label: {
                            position: 'top',
                            value: 'amount',
                            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        }
                    }}
                />
            </Group>
        </>
    )
}