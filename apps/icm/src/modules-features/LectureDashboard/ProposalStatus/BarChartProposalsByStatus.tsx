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
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={"black"} fz="sm">
                    Số lượng: {item.value}
                </Text>
            ))}
        </Paper>
    );
}

export const data = [
    { key: 'Khoa CNTT', value: 30 },
    { key: 'Khoa Kinh tế', value: 25 },
    { key: 'Khoa Dược', value: 20 },
    { key: 'Khoa Luật', value: 18 },
    { key: 'Khoa Xã hội', value: 15 },
];

export default function BarChartProposalsByStatus() {
    const colorTheme = useMantineColorScheme()
    return (
        <Group>
            <Text mb={"20"}>Số lượng Đề xuất theo Trạng thái</Text>
            <BarChart
                h={"300"}
                w={"96%"}
                data={data}
                dataKey="key"
                orientation="vertical"
                yAxisProps={{
                    width: 100,
                }}
                xAxisProps={{
                    orientation: 'bottom',
                    label: {
                        value: 'Số lượng',
                        position: 'bottom',
                        fontSize: 12
                    }
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'value', color: '#0079cd', label: 'value' }]}
                barProps={{
                    label: {
                        position: 'right',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                    }
                }}
                maxBarWidth={20}
                tickLine="x"
                yAxisLabel="Đơn vị"
            />
        </Group>
    );
}