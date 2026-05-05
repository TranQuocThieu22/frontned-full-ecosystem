"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;
    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>{label}</Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={item.color} fz="sm">Số lượng: {item.value}</Text>
            ))}
        </Paper>
    );
}

interface IProps {
    notClassifiedYetAmound?: number;
    studyingAmound?: number;
    pausedAmound?: number;
    completedAmound?: number;
    studyOutAmound?: number;
}

export default function DashboardStudentStatus30DaysChart({
    notClassifiedYetAmound = 0,
    studyingAmound = 0,
    pausedAmound = 0,
    completedAmound = 0,
    studyOutAmound = 0,
}: IProps) {
    const colorTheme = useMantineColorScheme();
    const data = [
        { student_status: 'Chưa xếp lớp', amount: notClassifiedYetAmound, color: 'orange.6' },
        { student_status: 'Đang học', amount: studyingAmound, color: 'blue.6' },
        { student_status: 'Tạm dừng', amount: pausedAmound, color: 'yellow.6' },
        { student_status: 'Hoàn thành', amount: completedAmound, color: 'green.6' },
        { student_status: 'Bỏ học', amount: studyOutAmound, color: '#96172e' },
    ];

    return (
        <Group>
            <Text mb={"50"}>Biểu đồ trạng thái học viên trong 30 ngày qua</Text>
            <BarChart
                h={200}
                w={"90%"}
                data={data}
                dataKey="student_status"
                series={[{ name: 'amount', color: 'color', label: 'Số lượng' }]}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                yAxisLabel="Tổng số học viên"
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
    );
}
