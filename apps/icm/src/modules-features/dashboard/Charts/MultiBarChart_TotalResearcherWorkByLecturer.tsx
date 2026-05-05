import { BarChart } from "@mantine/charts";
import { Group, Paper, Text, useMantineColorScheme } from "@mantine/core";

export const data = [
    { research_level: 'Cấp Trường', inprogress: 56, accepted: 234, cancel: 78 },
    { research_level: 'Cấp Tỉnh', inprogress: 123, accepted: 345, cancel: 67 },
    { research_level: 'Cấp Bộ', inprogress: 234, accepted: 123, cancel: 89 },
    { research_level: 'Cấp Quốc Gia', inprogress: 345, accepted: 234, cancel: 56 },
    { research_level: 'Cấp Quốc Tế', inprogress: 234, accepted: 345, cancel: 123 },
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
                <Text
                    key={item.name}
                    c={item.color}
                    fw={500}
                    fz="sm">
                    {/* {item.name}: {item.value} */}
                    {item.name === 'inprogress' ? 'Đang thực hiện' : item.name === 'accepted' ? 'Đã nghiệm thu' : 'Bị Hủy'}: {item.value}
                </Text>
            ))}
        </Paper>
    );
}

export default function MultiBarChart_TotalResearcherWorkByLecturer() {
    const colorTheme = useMantineColorScheme()

    return (
        <>
            <Group>
                <Text mb={"50"}>Biểu đồ phân bổ cấp đề tài</Text>
                <BarChart
                    h={360}
                    data={data}
                    dataKey="research_level"
                    withLegend
                    legendProps={{ verticalAlign: 'bottom', height: 50 }}
                    series={[
                        { name: 'inprogress', color: 'blue.6', label: 'Đang thực hiện' },
                        { name: 'accepted', color: 'green.6', label: 'Đã nghiệm thu' },
                        { name: 'cancel', color: 'orange.8', label: 'Bị Hủy' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Số lượng"
                    maxBarWidth={36}
                    tickLine="y"
                    barProps={{
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
        </>
    )
}