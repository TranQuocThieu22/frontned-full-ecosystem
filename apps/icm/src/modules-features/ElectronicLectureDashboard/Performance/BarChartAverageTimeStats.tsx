import { BarChart } from "@mantine/charts";
import { Group, Paper, Text, useMantineColorScheme } from "@mantine/core";

export const data = [
    { lecture_type: 'Lý thuyết', proposal_approval: 56, drafting: 234, content_evaluation: 45, technical_review: 78, revision: 12 },
    { lecture_type: 'Thảo luận', proposal_approval: 89, drafting: 167, content_evaluation: 34, technical_review: 156, revision: 8 },
];

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    const getStatusLabel = (name: string) => {
        switch (name) {
            case 'proposal_approval': return 'Xét duyệt đề xuất';
            case 'drafting': return 'Biên soạn';
            case 'content_evaluation': return 'Thẩm định nội dung';
            case 'technical_review': return 'Kiểm tra kỹ thuật';
            case 'revision': return 'Hoàn thiện theo góp ý';
            default: return name;
        }
    };

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
                    {getStatusLabel(item.name)}: {item.value}
                </Text>
            ))}
        </Paper>
    );
}

export default function BarChartAverageTimeStats() {
    const colorTheme = useMantineColorScheme()

    return (
        <>
            <Group>
                <Text>Thời gian Trung bình theo giai đoạn</Text>
                <BarChart
                    h={300}
                    data={data}
                    dataKey="lecture_type"
                    withLegend
                    legendProps={{ verticalAlign: 'bottom', height: 50 }}
                    series={[
                        { name: 'proposal_approval', color: 'blue.6', label: 'Xét duyệt đề xuất' },
                        { name: 'drafting', color: 'yellow.6', label: 'Biên soạn' },
                        { name: 'content_evaluation', color: 'orange.6', label: 'Thẩm định nội dung' },
                        { name: 'technical_review', color: 'green.6', label: 'Kiểm tra kỹ thuật' },
                        { name: 'revision', color: 'red.6', label: 'Hoàn thiện theo góp ý' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Số ngày"
                    maxBarWidth={36}
                    tickLine="y"
                    barProps={{
                        label: {
                            formatter: (value: number) => value,
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