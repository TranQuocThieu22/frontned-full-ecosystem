import { ChartTooltipProps, PieChart } from "@mantine/charts";
import { Center, Grid, Group, Paper, Text } from "@mantine/core";

const data = [
    { name: 'Đề xuất được duyệt', value: 30, color: "#2a54a1" },
    { name: 'Giao nộp sản phẩm thô', value: 25, color: "#34b3e7" },
    { name: 'Đạt kiểm tra sơ bộ', value: 23, color: "#fecf16" },
    { name: 'Hoàn tất thẩm định', value: 20, color: "#f6a417" },
    { name: 'Phê duyệt cuối cùng', value: 18, color: "#f65417" },
];

export function PieChartLectureStatus() {
    return (
        <>
            <Text mb={"20"}>Tiến độ phát triển theo giai đoạn</Text>
            <Grid>
                <Grid.Col span={{ base: 8, sm: 8, md: 8 }}>
                    <Center>
                        <PieChart
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
                            style={{ height: 335, width: '100%' }}
                            pieProps={{
                                cx: '50%',
                                cy: '50%',
                                innerRadius: 0,
                                outerRadius: 105,
                                paddingAngle: 0,
                            }}
                        />
                    </Center>
                </Grid.Col>
                <Grid.Col pt={20} span={{ base: 4, sm: 4, md: 4 }}>
                    {data.map((item, index) => (
                        <Group key={index} wrap="nowrap">
                            <div style={{
                                width: 12,
                                minWidth: 12,
                                height: 12,
                                backgroundColor: item.color, borderRadius: '50%'
                            }}></div>
                            <Text>{item.name}: {item.value}</Text>
                        </Group>
                    ))}
                </Grid.Col>
            </Grid >
        </>
    )
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
                    {item.name}: {item.value} đề xuất
                </Text>
            ))}
        </Paper>
    );
}