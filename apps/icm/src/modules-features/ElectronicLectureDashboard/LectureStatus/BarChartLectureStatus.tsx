import { BarChart } from "@mantine/charts";
import { Group, Paper, Text, useMantineColorScheme } from "@mantine/core";

export const data = [
    { lecture_type: 'Lý thuyết', drafting: 56, pending_review: 234, need_revision: 45, approved: 78, rejected: 12 },
    { lecture_type: 'Thảo luận', drafting: 89, pending_review: 167, need_revision: 34, approved: 156, rejected: 8 },
];

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    const getStatusLabel = (name: string) => {
        switch (name) {
            case 'drafting': return 'Đang biên soạn';
            case 'pending_review': return 'Chờ thẩm định';
            case 'need_revision': return 'Yêu cầu chỉnh sửa';
            case 'approved': return 'Đã phê duyệt';
            case 'rejected': return 'Từ chối';
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

export default function BarChartLectureStatus() {
    const colorTheme = useMantineColorScheme()

    return (
        <>
            <Group>
                <Text>Số lượng đề xuất theo trạng thái</Text>
                <BarChart
                    h={300}
                    data={data}
                    dataKey="lecture_type"
                    withLegend
                    legendProps={{ verticalAlign: 'bottom', height: 50 }}
                    series={[
                        { name: 'drafting', color: 'blue.6', label: 'Đang biên soạn' },
                        { name: 'pending_review', color: 'yellow.6', label: 'Chờ thẩm định' },
                        { name: 'need_revision', color: 'orange.6', label: 'Yêu cầu chỉnh sửa' },
                        { name: 'approved', color: 'green.6', label: 'Đã phê duyệt' },
                        { name: 'rejected', color: 'red.6', label: 'Từ chối' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Số lượng"
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