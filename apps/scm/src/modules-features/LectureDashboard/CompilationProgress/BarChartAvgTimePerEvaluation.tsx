import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';

export const data = [
    { scoreRange: 'Kiểm tra sơ bộ', count: 5 },
    { scoreRange: 'Thẩm định chuyên môn', count: 15 },
    { scoreRange: 'Hoàn thiện theo góp ý', count: 20 },
    { scoreRange: 'Kiểm tra lại bản hoàn thiện', count: 7 },
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
                        Số ngày: {item.value} ngày
                    </Text>
                </React.Fragment>
            ))}
        </Paper>
    );
}

export default function BarChartAvgTimePerEvaluation() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Thời gian Trung bình cho từng Giai đoạn Thẩm định</Text>
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
                    { name: 'count', color: 'blue.6', label: 'Số lượng' },
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
                yAxisLabel="Số ngày"
                xAxisLabel="Giai đoạn"
                withLegend={false}
            />
        </Group>
    );
}