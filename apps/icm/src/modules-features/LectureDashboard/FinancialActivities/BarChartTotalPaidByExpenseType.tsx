import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';

export const data = [
    { scoreRange: 'Thù lao Biên soạn', count: 1500 },
    { scoreRange: 'Thù lao Thẩm định', count: 700 },
    { scoreRange: 'Chi phí Hội đồng xét duyệt', count: 300 },
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
                        {item.value} triệu VNĐ
                    </Text>
                </React.Fragment>
            ))}
        </Paper>
    );
}

export default function BarChartTotalPaidByExpenseType() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Tổng Kinh phí Đã Chi Trả theo Loại Chi Phí </Text>
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
                    { name: 'count', color: '#2ecc71', label: 'Số lượng' },
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
                yAxisLabel="Số tiền triệu"
                xAxisLabel="Loại chi phí"
                withLegend={false}
            />
        </Group>
    );
}