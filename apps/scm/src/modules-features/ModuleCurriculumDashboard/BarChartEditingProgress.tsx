import { BarChart, ChartTooltipProps } from "@mantine/charts";
import { Group, Paper, Text, useMantineColorScheme } from "@mantine/core";

export default function BarChart_EditingProgress(
    { chartTitle, chartData, chartSeries, chartDataKey }:
        { chartTitle: string, chartData: any[], chartSeries: any[], chartDataKey: string }) {
    const colorTheme = useMantineColorScheme()
    return (
        <Group align="center" justify="center" >
            <Text mb={"20"} size="md" fw={650}>{chartTitle}</Text>
            <BarChart
                h={360}
                maxBarWidth={96}
                withTooltip mx="auto"
                yAxisLabel="Số lượng (1-5)"
                data={chartData}
                
                series={chartSeries}
                dataKey={chartDataKey}
                tickLine="x"
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                barProps={{
                    isAnimationActive: true,
                    label: {
                        formatter: (value: number) =>
                            // formatCurrency2(value)
                            value
                        ,
                        position: 'top',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        
                    }
                }}
            />
        </Group>
    );
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text
                    key={item.name}
                    c={item.color}
                    fw={500}
                    fz="sm">
                    {/* {item.name}: {item.value} */}
                    Số lượng: {item.value}
                </Text>
            ))}
        </Paper>
    );
}