'use client'
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
                <Text key={item.name} c={item.color} fz="sm">
                    Tiến độ: {item.value} %
                </Text>
            ))}
        </Paper>
    )
}
export default function FeatViewOngoingProjectsTrackingChartByYear() {
    const data = [
        { topic_name: 'Đề tài A', process: 80, color: 'blue.6' },
        { topic_name: 'Đề tài B', process: 30, color: 'yellow.6' },
        { topic_name: 'Đề tài C', process: 50, color: 'red.6' },
        { topic_name: 'Đề tài D', process: 70, color: 'greenn.6' }
    ]
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Text fz="xs" mb="sm" ta="center">
                Biểu đồ theo dõi đề tài đang triển khai trong năm
            </Text>
            <Group>

                <div >
                    <BarChart
                        h={400}
                        data={data}
                        w={600}
                        orientation="vertical"
                        dataKey="topic_name" // Trục X
                        xAxisLabel="Phần trăm hoàn thành tiến độ %/100%"
                        yAxisProps={{ width: 64 }}
                        withLegend
                        legendProps={{ verticalAlign: 'bottom', height: 50 }}
                        series={[
                            { name: 'process', color: 'color', label: 'Tiến độ' },

                        ]}
                        tooltipProps={{
                            content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />
                        }}
                        maxBarWidth={64}
                        tickLine="y"

                    />
                </div>

            </Group>

        </>
    )
} 