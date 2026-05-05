"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;
    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>{label}</Text>
            {payload.map((item: any) => (
                <Text key={item.name} fz="sm">Doanh thu: {formatCurrency(item.value)}</Text>
            ))}
        </Paper>
    );
}

function formatCurrency(value: number): string {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

function formatCurrencyShort(value: number): string {
    if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)} tỷ`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)} tr`;
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

interface ICourseRevenue {
    courseCode?: string;
    courseName?: string;
    revenue?: string;
}

export default function DashboardCourseRevenueChart({ data }: { data: ICourseRevenue[] }) {
    const colorTheme = useMantineColorScheme();

    return (
        <Group>
            <Text mb={"50"}>Biểu đồ phân tích doanh thu khóa học</Text>
            <BarChart
                h={200}
                w={"90%"}
                data={data}
                dataKey="courseCode"
                series={[{ name: 'revenue', color: 'teal', label: 'Doanh thu' }]}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                yAxisLabel="Tổng doanh thu"
                yAxisProps={{ width: 64, tickFormatter: (value: number) => formatCurrencyShort(value) }}
                maxBarWidth={36}
                tickLine="y"
                barProps={{
                    label: {
                        formatter: (value: number) => formatCurrencyShort(value),
                        position: 'top',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                    }
                }}
            />
        </Group>
    );
}
