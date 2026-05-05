import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';

export const data = [
    { scoreRange: 'Dưới 70', count: 2 },
    { scoreRange: '70-79', count: 10 },
    { scoreRange: '80-89', count: 25 },
    { scoreRange: '90-100', count: 8 },
];

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
            {payload.map((item: any, index) => (
                <React.Fragment key={index}>
                    <Text key={index} c={"black"} fz="sm">
                        Số lượng: {item.value}
                    </Text>
                </React.Fragment>
            ))}
        </Paper>
    );
}

export default function BarChartAvgScoreDistribution() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Phân bố Điểm Thẩm định Trung bình</Text>
            <BarChart
                pb={"md"}
                h={"319"}
                w={"100%"}
                data={data}
                dataKey="scoreRange"
                orientation="horizontal"
                xAxisProps={{
                    orientation: 'bottom',
                    tickCount: 4,
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[
                    { name: 'count', color: '#9b59b6', label: 'Số lượng' },
                ]}
                barProps={{
                    label: {
                        position: 'top',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                    }
                }}
                barChartProps={{
                    barSize: 32,
                    barGap: 8,
                }}
                tickLine="x"
                yAxisLabel="Số lượng"
                xAxisLabel="Khoảng điểm"
                withLegend={false}
            />
        </Group>
    );
}