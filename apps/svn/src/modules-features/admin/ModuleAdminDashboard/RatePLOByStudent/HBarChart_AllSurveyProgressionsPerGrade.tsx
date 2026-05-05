import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
import { XAxis } from 'recharts';

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
                    Tỷ lệ phản hồi trung bình: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

export const data = [
    { LOMGrade: 'IT-K24', totalReponsePercent: 72 },
    { LOMGrade: 'IT-K25', totalReponsePercent: 74 },
    { LOMGrade: 'IT-K26', totalReponsePercent: 71 },
    { LOMGrade: 'CS-K24', totalReponsePercent: 85 },
    { LOMGrade: 'CS-K25', totalReponsePercent: 83 },
    { LOMGrade: 'CS-K26', totalReponsePercent: 70 },
    { LOMGrade: 'BA-K24', totalReponsePercent: 95 },
    { LOMGrade: 'BA-K25', totalReponsePercent: 94 },
    { LOMGrade: 'BA-K26', totalReponsePercent: 99 },
    { LOMGrade: 'EE-K24', totalReponsePercent: 98 },
    { LOMGrade: 'EE-K25', totalReponsePercent: 80 },
    { LOMGrade: 'EE-K26', totalReponsePercent: 82 },
    { LOMGrade: 'ME-K24', totalReponsePercent: 92 },
    { LOMGrade: 'ME-K25', totalReponsePercent: 81 },
    { LOMGrade: 'ME-K26', totalReponsePercent: 63 },
    { LOMGrade: 'CE-K24', totalReponsePercent: 74 },
    { LOMGrade: 'CE-K25', totalReponsePercent: 72 },
    { LOMGrade: 'CE-K26', totalReponsePercent: 80 },
    { LOMGrade: 'ECO-K24', totalReponsePercent: 91 },
    { LOMGrade: 'ECO-K25', totalReponsePercent: 93 },
    { LOMGrade: 'ECO-K26', totalReponsePercent: 95 },
    { LOMGrade: 'LE-K24', totalReponsePercent: 90 },
    { LOMGrade: 'LE-K25', totalReponsePercent: 90 },
    { LOMGrade: 'LE-K26', totalReponsePercent: 92 },
    { LOMGrade: 'LAW-K24', totalReponsePercent: 82 },
    { LOMGrade: 'LAW-K25', totalReponsePercent: 84 },
    { LOMGrade: 'LAW-K26', totalReponsePercent: 96 },
    { LOMGrade: 'PSY-K24', totalReponsePercent: 76 },
    { LOMGrade: 'PSY-K25', totalReponsePercent: 87 },
    { LOMGrade: 'PSY-K26', totalReponsePercent: 79 },
    { LOMGrade: 'EDU-K24', totalReponsePercent: 89 },
    { LOMGrade: 'EDU-K25', totalReponsePercent: 70 },
    { LOMGrade: 'EDU-K26', totalReponsePercent: 84 }
];

export default function HBarChart_AllSurveyProgressionsPerGrade() {
    const colorTheme = useMantineColorScheme()
    return (
        <Group>
            <Text mb={"20"}>Tỷ lệ phản hồi khảo sát theo khóa</Text>
            <BarChart
                h={1000}
                w={"96%"}
                data={data}
                dataKey="LOMGrade"
                orientation="vertical"
                yAxisProps={{
                    width: 100,
                    // label: {
                    //     value: 'Khóa',
                    //     position: 'insideLeft',
                    //     fontSize: 14
                    // }
                }}
                xAxisProps={{
                    domain: [0, 100], tickMargin: 15, orientation: 'top',
                    label: {
                        value: 'Tỉ lệ phản hồi trung bình (%)',
                        position: 'top',
                        // fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        fontSize: 14
                    }
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'totalReponsePercent', color: '#59a89c', label: 'LOMGrade' }]}
                barProps={{
                    label: {
                        position: 'right',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        // content: ({ value }) => `${value}%`,
                    }
                }}
                maxBarWidth={20}
                tickLine="x"
                yAxisLabel="Khóa"
                xAxisLabel="Tỷ lệ phản hồi trung bình"
            />
        </Group>
    );
}



