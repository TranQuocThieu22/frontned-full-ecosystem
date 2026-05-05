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
                    Tỷ lệ đạt PLO: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

export const data = [
    { LOMGrade: 'IT-K24', PLOPassedPercentage: 72 },
    { LOMGrade: 'IT-K25', PLOPassedPercentage: 64 },
    { LOMGrade: 'IT-K26', PLOPassedPercentage: 68 },
    { LOMGrade: 'CS-K24', PLOPassedPercentage: 67 },
    { LOMGrade: 'CS-K25', PLOPassedPercentage: 70 },
    { LOMGrade: 'CS-K26', PLOPassedPercentage: 80 },
    { LOMGrade: 'BA-K24', PLOPassedPercentage: 85 },
    { LOMGrade: 'BA-K25', PLOPassedPercentage: 86 },
    { LOMGrade: 'BA-K26', PLOPassedPercentage: 90 },
    { LOMGrade: 'EE-K24', PLOPassedPercentage: 67 },
    { LOMGrade: 'EE-K25', PLOPassedPercentage: 71 },
    { LOMGrade: 'EE-K26', PLOPassedPercentage: 56 },
    { LOMGrade: 'ME-K24', PLOPassedPercentage: 68 },
    { LOMGrade: 'ME-K25', PLOPassedPercentage: 71 },
    { LOMGrade: 'ME-K26', PLOPassedPercentage: 78 },
    { LOMGrade: 'CE-K24', PLOPassedPercentage: 79 },
    { LOMGrade: 'CE-K25', PLOPassedPercentage: 77 },
    { LOMGrade: 'CE-K26', PLOPassedPercentage: 69 },
    { LOMGrade: 'ECO-K24', PLOPassedPercentage: 87 },
    { LOMGrade: 'ECO-K25', PLOPassedPercentage: 88 },
    { LOMGrade: 'ECO-K26', PLOPassedPercentage: 95 },
    { LOMGrade: 'LE-K24', PLOPassedPercentage: 78 },
    { LOMGrade: 'LE-K25', PLOPassedPercentage: 80 },
    { LOMGrade: 'LE-K26', PLOPassedPercentage: 80 },
    { LOMGrade: 'LAW-K24', PLOPassedPercentage: 69 },
    { LOMGrade: 'LAW-K25', PLOPassedPercentage: 68 },
    { LOMGrade: 'LAW-K26', PLOPassedPercentage: 65 },
    { LOMGrade: 'PSY-K24', PLOPassedPercentage: 78 },
    { LOMGrade: 'PSY-K25', PLOPassedPercentage: 67 },
    { LOMGrade: 'PSY-K26', PLOPassedPercentage: 65 },
    { LOMGrade: 'EDU-K24', PLOPassedPercentage: 80 },
    { LOMGrade: 'EDU-K25', PLOPassedPercentage: 86 },
    { LOMGrade: 'EDU-K26', PLOPassedPercentage: 78 }
];

export default function HBarChart_PLOPassedPerGradeByIndustry() {
    const colorTheme = useMantineColorScheme()
    return (
        <Group>
            <Text mb={"20"}>Theo dõi tỷ lệ đạt PLO theo từng khóa</Text>
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
                        value: 'Tỉ lệ đạt PLO (%)',
                        position: 'top',
                        // fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        fontSize: 14
                    }
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'PLOPassedPercentage', color: '#0079cd', label: 'LOMGrade' }]}
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
            // xAxisLabel="Tỷ lệ đạt PLO (%)"
            />
        </Group>
    );
}



