import { LineChart } from '@mantine/charts';
import { Group, Paper, Text } from '@mantine/core';

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;
    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {isNaN(Date.parse(label)) ? label : new Date(label.replace(/(\d{2})\/(\d{2})/, '20$2-$1')).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            </Text>
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

interface ILast3MonthsRevenue {
    currentMonthRevenue?: number;
    firstMonthsAgoRevenue?: number;
    secondMonthsAgoRevenue?: number;
    thirdMonthsAgoRevenue?: number;
}

function formatChartData(pass3MonthData: ILast3MonthsRevenue) {
    const keys: (keyof ILast3MonthsRevenue)[] = [
        "secondMonthsAgoRevenue",
        "firstMonthsAgoRevenue",
        "currentMonthRevenue",
    ];
    const now = new Date();
    return keys.map((key, i) => {
        const date = new Date(now.getFullYear(), now.getMonth() - (2 - i), 1);
        const month = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
        return { month, Quantity: pass3MonthData[key] };
    });
}

export default function DashboardDiscountRevenue3MonthsChart({ pass12MonthData }: { pass12MonthData: ILast3MonthsRevenue }) {
    const data = formatChartData(pass12MonthData);

    return (
        <Group>
            <Text mb={"50"}>Doanh thu sử dụng chiết khấu 3 tháng qua</Text>
            <LineChart
                w={"100%"}
                h={350}
                data={data}
                dataKey="month"
                series={[{ name: 'Quantity', color: 'indigo.6' }]}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                curveType="linear"
                yAxisLabel="Tổng doanh thu"
                tickLine="y"
                yAxisProps={{ width: 100, tickFormatter: (value: number) => formatCurrencyShort(value) }}
            />
        </Group>
    );
}
