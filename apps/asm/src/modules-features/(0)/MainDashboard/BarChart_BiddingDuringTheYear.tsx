"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { bidding_status: 'Đang mời thầu', amount: 84, color: 'orange.6' },
    { bidding_status: 'Đang chấm thầu', amount: 151, color: 'blue.6' },
    { bidding_status: 'Hoàn thành', amount: 45, color: 'green.6' }
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
                    Số gói thầu: {item.value}
                </Text>
            ))}
        </Paper>
    );
}


export default function BarChart_BiddingDuringTheYear() {
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ trạng thái gói thầu trong năm</Text>
                <BarChart
                    h={250}
                    w={"100%"}
                    data={data}
                    dataKey="bidding_status"
                    series={[
                        { name: 'amount', color: 'color', label: 'Số gói thầu' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Tổng số gói thầu"
                    yAxisProps={{ width: 64 }}
                    maxBarWidth={64}
                    tickLine="y"
                    barProps={{
                        label: {
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
