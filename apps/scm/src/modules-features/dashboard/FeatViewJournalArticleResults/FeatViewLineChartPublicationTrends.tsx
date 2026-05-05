
import { LineChart } from '@mantine/charts';
import { Group, Paper, Text } from '@mantine/core';
interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}
const data = [
    { year: 2020, scientificArticle: 100, researchArticle: 90 },
    { year: 2021, scientificArticle: 120, researchArticle: 140 },
    { year: 2022, scientificArticle: 90, researchArticle: 110 }
]
function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;
    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} fz="sm">
                    Số lượng: {item.value}
                </Text>
            ))}
        </Paper>
    )
}
export default function ViewLineChartPublicationTrends() {
    return (
        <>
            <Group>
                <Text mb={"50"} style={{ maxWidth: '300px', whiteSpace: 'normal', wordWrap: 'break-word', margin: '0 auto' }}>Xu hướng bài báo công bố qua các năm</Text>
                <LineChart
                    w={"80%"}
                    h={200}
                    data={data}
                    dataKey="year"
                    series={[
                        { name: 'scientificArticle', color: 'indigo.6' },
                        { name: 'researchArticle', color: 'teal.6' }
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    curveType="linear"
                    yAxisLabel="Số lượng"
                    tickLine="y"
                />
            </Group>
        </>
    );
}