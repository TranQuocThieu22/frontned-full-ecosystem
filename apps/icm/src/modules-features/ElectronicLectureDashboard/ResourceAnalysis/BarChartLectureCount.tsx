import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { researchWorkId: 1, researchName: 'TS. Nguyễn Văn A', progress: 5 },
    { researchWorkId: 2, researchName: 'PGS.TS Trần Thị D', progress: 3 },
    { researchWorkId: 3, researchName: 'TS. Mai Thị K', progress: 2 },
    { researchWorkId: 4, researchName: 'TS. Nguyễn Thị E', progress: 1 },
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

export default function BarChartLectureCount() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group pr={"20"}>
            <Text mb={"20"}>Số lượng bài giảng theo trưởng ban biên soạn</Text>
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
                yAxisLabel="Số lượng"
            />
            <Text c="black" fz="sm">
                {data.map((item, idx) => (
                    `${item.researchName}: ${item.progress} bài giảng${idx < data.length - 1 ? ', ' : ''}`
                )).join('')}
            </Text>
        </Group>
    );
}