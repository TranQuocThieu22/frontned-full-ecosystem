import { ChartTooltipProps, PieChart } from "@mantine/charts";
import { Center, Grid, Group, Paper, Text } from "@mantine/core";

const data = [
    { name: 'IT', value: 330, color: "#2a54a1" },
    { name: 'BA', value: 328, color: "#34b3e7" },
    { name: 'CS', value: 252, color: "#fecf16" },
    { name: 'EE', value: 298, color: "#f6a417" },
    { name: 'ME', value: 120, color: "#eb5f1a" },
    { name: 'CE', value: 152, color: "#7a2aa0" },
    { name: 'ECO', value: 120, color: "#e74c3c" },
    { name: 'LE', value: 67, color: "#2ecc71" },
    { name: 'LAW', value: 90, color: "#f01879" },
    { name: 'PSY', value: 45, color: "#5d1cae" },
    { name: 'EDU', value: 78, color: "#e39500" },
    { name: 'Khác', value: 62, color: "#9b59b6" }
];

function getRandomColor(seed: number): string {
    const random = Math.sin(seed) * 10000;
    const color = `#${Math.floor((random - Math.floor(random)) * 16777215).toString(16).padStart(6, '0')}`;
    return color;
}

export function Piechart_TotalInstructorRatingByStudentPerGrade() {

    const totalRates = data.reduce((acc, cur) => acc + cur.value, 0);

    return (
        <>
            <Text mb={"20"}>Biểu đồ theo dõi tỷ lệ phiếu khảo sát theo khoa</Text>
            <Grid>
                <Grid.Col span={{ base: 8 }}>
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
                <Grid.Col pt={20} span={{ base: 4 }}>
                    {data.map((item, index) => (
                        <Group key={index} wrap="nowrap">
                            <div style={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: '50%', marginRight: 8 }}></div>
                            <Text>{item.name}</Text>
                            <Text c="dimmed" fz="sm">({item.value} - {((item.value / totalRates) * 100).toFixed(2)} %)</Text>
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