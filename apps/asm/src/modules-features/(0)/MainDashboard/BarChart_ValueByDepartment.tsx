"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { unit: 'Phòng đào tạo', totalValue: 120000000 },
    { unit: 'Phòng kế toán', totalValue: 430000000 },
    { unit: 'Phòng hành chính', totalValue: 3005000000 },
    { unit: 'Phòng nhân sự', totalValue: 253000000 },
    { unit: 'Khoa CNTT', totalValue: 1820000000 },
    { unit: 'Khoa Kế toán', totalValue: 1500000000 },
    { unit: 'Khoa Kinh tế', totalValue: 2000000000 },
    { unit: 'Khoa Quản trị', totalValue: 100000000 }
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
                <Text mb={"50"}>Biểu đồ phân bổ giá trị tài sản theo phòng ban</Text>
                <BarChart
                    h={250}
                    w={"100%"}
                    data={data}
                    dataKey="unit"
                    series={[
                        { name: 'totalValue', color: "teal", label: 'Tổng giá trị' },
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
