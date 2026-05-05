"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { paper_type: 'SCIE', amount: 1020, color: '#59a89c' },
    { paper_type: 'SSCI', amount: 823, color: '#f0c571' },
    { paper_type: 'Scopus', amount: 557, color: '#e02b35' },
    { paper_type: 'Quốc gia', amount: 168, color: '#082a54' },
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
                <Text key={item.name} c={item.color} fz="sm">
                    Số lượng: {item.value}
                </Text>
            ))}
        </Paper>
    );
}


export default function BarChart_TotalPublishedPaperByType() {
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ số lượng bài báo - tạp chí nghiên cứu khoa học</Text>
                <BarChart
                    h={280}
                    w={"90%"}
                    data={data}
                    dataKey="paper_type"
                    series={[
                        { name: 'amount', color: 'color', label: 'Số lượng' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Số lượng"
                    yAxisProps={{ width: 64 }}
                    maxBarWidth={64}
                    tickLine="y"
                    barProps={{
                        label: {
                            position: 'top',
                            value: 'amount',
                            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        }
                    }}
                />
            </Group>
        </>
    );
}
