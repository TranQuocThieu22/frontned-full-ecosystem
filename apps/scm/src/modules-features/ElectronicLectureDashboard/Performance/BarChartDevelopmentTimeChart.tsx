import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { researchWorkId: 1, researchName: 'Bài giảng Python', progress: 90 },
    { researchWorkId: 2, researchName: 'Bài giảng AI Y học', progress: 105 },
    { researchWorkId: 3, researchName: 'Bài giảng Văn học', progress: 102 },
    { researchWorkId: 4, researchName: 'Bài giảng Toán cao cấp', progress: 100 },
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
                <Text key={item.name} c={"black"} fz="sm">
                    Số ngày: {item.value}
                </Text>
            ))}
        </Paper>
    );
}

export default function BarChartDevelopmentTimeChart() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group pr={"20"}>
            <Text mb={"20"}>Thời gian phát triển theo từng bài giảng</Text>
            <BarChart
                h={300}
                w={"96%"}
                data={data}
                dataKey="researchName"
                orientation="vertical"
                yAxisProps={{ width: 150 }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'progress', color: 'blue.6', label: 'researchName' }]}
                barProps={{
                    label: {
                        position: 'right',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                    }
                }}
                maxBarWidth={20}
                tickLine="x"
                yAxisLabel="Danh sách bài giảng"
                xAxisLabel="Số ngày hoàn thành"
            />
             <Text c="black" fz="sm">
                {data.map((item, idx) => (
                    `${item.researchName}: ${item.progress} ngày${idx < data.length - 1 ? ', ' : ''}`
                )).join('')}
            </Text>
        </Group>
    );
}