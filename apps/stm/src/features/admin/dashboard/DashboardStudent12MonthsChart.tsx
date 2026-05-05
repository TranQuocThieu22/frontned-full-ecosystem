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
                <Text key={item.name} fz="sm">Số lượng: {item.value}</Text>
            ))}
        </Paper>
    );
}

interface IPast12MonthsAgoStudentQuantity {
    twelfthMonthAgoQuantity?: number;
    evelenthMonthAgoQuantity?: number;
    tenthMonthAgoQuantity?: number;
    ninthMonthAgoQuantity?: number;
    eighthMonthAgoQuantity?: number;
    seventhMonthAgoQuantity?: number;
    sixthMonthAgoQuantity?: number;
    fifthMonthAgoQuantity?: number;
    fourthMonthAgoQuantity?: number;
    thirdMonthAgoQuantity?: number;
    secondMonthAgoQuantity?: number;
    firstMonthAgoQuantity?: number;
    currentMonthQuantity?: number;
}

function formatChartData(pass12MonthData: IPast12MonthsAgoStudentQuantity) {
    const keys: (keyof IPast12MonthsAgoStudentQuantity)[] = [
        "twelfthMonthAgoQuantity", "evelenthMonthAgoQuantity", "tenthMonthAgoQuantity",
        "ninthMonthAgoQuantity", "eighthMonthAgoQuantity", "seventhMonthAgoQuantity",
        "sixthMonthAgoQuantity", "fifthMonthAgoQuantity", "fourthMonthAgoQuantity",
        "thirdMonthAgoQuantity", "secondMonthAgoQuantity", "firstMonthAgoQuantity",
        "currentMonthQuantity",
    ];
    const now = new Date();
    return keys.map((key, i) => {
        const date = new Date(now.getFullYear(), now.getMonth() - (12 - i), 1);
        const month = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
        return { month, Quantity: pass12MonthData[key] };
    });
}

export default function DashboardStudent12MonthsChart({ pass12MonthData }: { pass12MonthData: IPast12MonthsAgoStudentQuantity }) {
    const data = formatChartData(pass12MonthData);

    return (
        <Group>
            <Text mb={"50"}>Biểu đồ số lượng học viên 12 tháng qua</Text>
            <LineChart
                w={"100%"}
                h={200}
                data={data}
                dataKey="month"
                series={[{ name: 'Quantity', color: 'rgba(64, 65, 135, 1)' }]}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                curveType="linear"
                yAxisLabel="Tổng số học viên"
                tickLine="y"
            />
        </Group>
    );
}
