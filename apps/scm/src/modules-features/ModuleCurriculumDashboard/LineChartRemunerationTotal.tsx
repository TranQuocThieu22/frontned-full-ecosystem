import { ChartTooltipProps, LineChart } from "@mantine/charts";
import { Group, Paper, Text } from "@mantine/core";

export default function LineChart_remunerationTotal(
    { chartTitle, chartData, chartSeries, chartDataKey, yAxisLabel, w, h }:
        { chartTitle: string, 
            chartData: any[], 
            chartSeries: any[], 
            chartDataKey: string,
            yAxisLabel?: string,
            w?: string|number,
            h?: number,
        }) {
    return (
        <Group align="center" justify="center" >
            <Text mb={"20"} size="md" fw={650}>{chartTitle}</Text>
            <LineChart
                w={w?? '100%'}
                h={h ?? 360}
                data={chartData}
                dataKey={chartDataKey}
                series={chartSeries}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                curveType="linear"
                yAxisLabel={yAxisLabel}
                tickLine="y"
                lineProps={{
                    isAnimationActive: true,
                }}
            />
        </Group>
    );
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            {/* <Text fw={500} mb={5}>
                {isNaN(Date.parse(label)) ? label : new Date(label.replace(/(\d{2})\/(\d{2})/, '20$2-$1')).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            </Text> */}
            {payload.map((item: any) => (
                <Text key={item.name} fz="sm" c={item.color} fw={700}>
                    Số tiền: {item.value} (triệu đồng)
                </Text>
            ))}
        </Paper>
    );
}