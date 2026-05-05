"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { unit: 'Phòng đào tạo', funding: 120000000, revenue: 167000000 },
    { unit: 'Phòng kế toán', funding: 130000000, revenue: 132000000 },
    { unit: 'Phòng hành chính', funding: 1005000000, revenue: 690000000 },
    { unit: 'Phòng nhân sự', funding: 240000000, revenue: 850000000 },
    { unit: 'Khoa CNTT', funding: 190000000, revenue: 920000000 },
    { unit: 'Khoa QTKD', funding: 190000000, revenue: 920000000 },
    { unit: 'Khoa Điện ĐT', funding: 190000000, revenue: 920000000 },
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
                    {item.name === 'revenue' ? 'Kinh phí đề nghị' : 'Ngân sách được chi'}: {formatCurrency(item.value)}
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

export default function MultiBarChart_BuyRequestAndBudgetByUnit() {
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ xử lý yêu cầu mua sắm theo đơn vị</Text>
                <BarChart
                    h={360}
                    w={"100%"}
                    withLegend
                    legendProps={{ verticalAlign: 'bottom', height: 50 }}
                    data={data}
                    dataKey="unit"
                    series={[
                        { name: 'revenue', color: 'teal', label: 'Kinh phí đề nghị', stackId: 'a' },
                        { name: 'funding', color: 'yellow', label: 'Ngân sách được chi', stackId: 'b' }
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Tổng kinh phí yêu cầu mua mới"
                    yAxisProps={{ width: 100, tickFormatter: (value: number) => formatCurrency2(value), offset: -100 }}
                    maxBarWidth={90}
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
