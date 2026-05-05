import { LineChart } from '@mantine/charts';
import { Group, Paper, Text } from '@mantine/core';

const data = [
    { month: '01/24', revenue: 2500000000 },
    { month: '02/24', revenue: 1780000000 },
    { month: '03/24', revenue: 1500000000 },
    { month: '04/24', revenue: 957000000 },
    { month: '05/24', revenue: 957000000 },
    { month: '06/24', revenue: 957000000 },
    { month: '07/24', revenue: 957000000 },
    { month: '08/24', revenue: 516000000 },
    { month: '09/24', revenue: 225000000 },
    { month: '10/24', revenue: 130000000 },
    { month: '11/24', revenue: 56000000 },
    { month: '12/24', revenue: 56000000 },
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
                {isNaN(Date.parse(label)) ? label : new Date(label.replace(/(\d{2})\/(\d{2})/, '20$2-$1')).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} fz="sm">
                    Ngân sách: {formatCurrency(item.value)}
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

export default function LineChart_TotalBudgetIn12Months() {
    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ phân bổ ngân sách</Text>
                <LineChart
                    w={"100%"}
                    h={195}
                    data={data}
                    dataKey="month"
                    series={[
                        { name: 'revenue', color: 'indigo.6' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    curveType="linear"
                    yAxisLabel="Tổng ngân sách"
                    tickLine="y"
                    yAxisProps={{ width: 64, tickFormatter: (value: number) => formatCurrency2(value) }}
                />
            </Group>
        </>
    );
}