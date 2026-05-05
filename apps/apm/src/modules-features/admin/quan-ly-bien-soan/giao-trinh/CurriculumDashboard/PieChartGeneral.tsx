import { ChartTooltipProps, PieChart } from "@mantine/charts";
import { Grid, Group, Paper, Text } from "@mantine/core";

export default function MyPieChart(
    { title, data, h, size }: { title: string, data: any[], h?: number, size?: number }) {
    return (
        <Group align="center" justify="center" >
            <Text mb={"20"} size="md" fw={650}>{title}</Text>
            <Grid>
                <Grid.Col span={8}>
                    <PieChart
                        h={h??360}
                        size={size??200}
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                        withLabelsLine
                        labelsPosition="outside"
                        withLabels
                        labelsType="percent"
                        data={data}
                        tooltipDataSource="segment"
                        tooltipProps={{
                            content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                        }}
                        withTooltip
                        style={{ width: 360 }}
                        pieProps={{ isAnimationActive: true}}
                    />
                </Grid.Col>
                <Grid.Col pt={40} span={4}>
                    {data.map((item, index) => (
                        <Group key={index} wrap="nowrap">
                            <div style={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: '50%', marginRight: 8 }}></div>
                            <Text>{item.name}</Text>
                        </Group>
                    ))}
                </Grid.Col>
            </Grid>
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
                    {item.name}: {item.value}
                </Text>
            ))}
        </Paper>
    );
}