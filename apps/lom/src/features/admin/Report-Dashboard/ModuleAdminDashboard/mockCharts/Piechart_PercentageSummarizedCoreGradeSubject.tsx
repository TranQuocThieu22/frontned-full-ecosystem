import { ChartTooltipProps, PieChart } from "@mantine/charts";
import { Center, Grid, Group, Paper, Text } from "@mantine/core";

const data = [
    { name: 'Môn cốt lõi đã đo', value: 134, color: "#2a54a1" },
    { name: 'Môn cốt lõi chưa đo', value: 57, color: "#34b3e7" },
    // { name: 'Cấp Bộ', value: 123, color: "#fecf16" },
    // { name: 'Cấp Quốc gia', value: 234, color: "#f6a417" },
    // { name: 'Cấp Quốc tế', value: 345, color: "#eb5f1a" }
];

function getRandomColor(seed: number): string {
    const random = Math.sin(seed) * 10000;
    const color = `#${Math.floor((random - Math.floor(random)) * 16777215).toString(16).padStart(6, '0')}`;
    return color;
}

export function Piechart_PercentageSummarizedCoreGradeSubject() {
    // const totalDisountCode = mockData.reduce((acc, cur) => acc + cur.used, 0);
    return (
        <>
            <Text mb={"20"}>Biểu đồ theo dõi tiến độ đo lường môn cốt lõi trong học kỳ hiện tại</Text>
            <Grid>
                <Grid.Col span={{ base: 8, md: 8 }}>
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
                            style={{ width: 360 }}
                        />
                    </Center>
                </Grid.Col>
                <Grid.Col pt={40} span={{ base: 4, md: 4 }}>
                    {data.map((item, index) => (
                        <Group key={index} wrap="nowrap">
                            <div style={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: '50%', marginRight: 8 }}></div>
                            <Text>{item.name}</Text>
                        </Group>
                    ))}
                </Grid.Col>
            </Grid>
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
                    {item.name}: {item.value}
                </Text>
            ))}
        </Paper>
    );
}