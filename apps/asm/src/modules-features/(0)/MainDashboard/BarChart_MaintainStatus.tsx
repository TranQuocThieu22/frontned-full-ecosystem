"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { status: 'Yêu cầu mới', amount: 35, color: 'orange.6' },
    { status: 'Đang thực hiện', amount: 67, color: 'blue.6' },
    { status: 'Hoàn thành', amount: 151, color: 'green.6' }
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
                    Số lượng: {item.value}
                </Text>
            ))}
        </Paper>
    );
}


export default function BarChart_MaintainStatus() {
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ trạng thái sử dụng bảo dưỡng</Text>
                <BarChart
                    h={269}
                    w={"100%"}
                    data={data}
                    dataKey="status"
                    series={[
                        { name: 'amount', color: 'color', label: 'Số lượng', },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Số lượng yêu cầu bảo dưỡng"
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
