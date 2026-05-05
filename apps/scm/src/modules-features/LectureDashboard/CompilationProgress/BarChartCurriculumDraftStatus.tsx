import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';

export const data = [
    { scoreRange: 'Đang biên soạn', count: 30 },
    { scoreRange: 'Đã gửi bản thảo', count: 15 },
    { scoreRange: 'Đang chờ sơ duyệt', count: 10 },
    { scoreRange: 'Yêu cầu chỉnh sửa (sau sơ bộ)', count: 8 },
    { scoreRange: 'Chờ thẩm định', count: 7 },
    { scoreRange: 'Yêu cầu chỉnh sửa (sau thẩm định)', count: 5 },
    { scoreRange: 'Đã hoàn thành', count: 3 },
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

export default function BarChartCurriculumDraftStatus() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Trạng thái Bản thảo Giáo Trình</Text>
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
                    { name: 'count', color: '#59a89c', label: 'Số lượng' },
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
                xAxisLabel="Trạng thái"
                withLegend={false}
            />
        </Group>
    );
}