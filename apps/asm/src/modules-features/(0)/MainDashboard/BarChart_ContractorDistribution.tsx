"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { unit: 'Tài sản cố định', totalValue: 720000000, color: "rgba(45, 59, 110, 1)" },
    { unit: 'Công cụ dụng cụ', totalValue: 330000000, color: 'cyan' },
    { unit: 'Vật tư tiêu hao', totalValue: 1005000000, color: 'yellow' },
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
            {payload.map((item: any) => (
                <Text key={item.name} c={item.color} fz="sm">
                    Tổng giá trị: {formatCurrency(item.value)}
                </Text>
            ))}
        </Paper>
    );
}

let formatCurrency = (value: number): string => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

let formatCurrency2 = (value: number): string => {
    if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(1)} tỉ`;
    } else if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)} tr`;
    }
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default function BarChart_RevenueByAcademicYear() {
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ phân bổ nhà thầu</Text>
                <BarChart
                    h={250}
                    w={"100%"}
                    data={data}
                    dataKey="unit"
                    series={[
                        { name: 'totalValue', color: 'color', label: 'Tổng giá trị' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Tổng giá trị"
                    yAxisProps={{ width: 64, tickFormatter: (value: number) => formatCurrency2(value) }}
                    maxBarWidth={64}
                    tickLine="y"
                    barProps={{
                        label: {
                            formatter: (value: number) => formatCurrency2(value),
                            position: 'top',
                            value: 'amount',
                            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        }
                    }}
                />
            </Group>
        </>
    );
}
