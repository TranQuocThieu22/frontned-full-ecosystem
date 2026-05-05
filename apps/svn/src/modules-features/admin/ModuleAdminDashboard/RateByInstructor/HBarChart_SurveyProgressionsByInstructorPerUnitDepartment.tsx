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
                    Tỷ hoàn thành khảo sát: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

export const data = [
    { UnitDepartment: 'IT', value: 100 },
    { UnitDepartment: 'BA', value: 100 },
    { UnitDepartment: 'CS', value: 45 },
    { UnitDepartment: 'EE', value: 90 },
    { UnitDepartment: 'ME', value: 75 },
    { UnitDepartment: 'CE', value: 100 },
    { UnitDepartment: 'ECO', value: 90 },
    { UnitDepartment: 'LE', value: 50 },
    { UnitDepartment: 'LAW', value: 35 },
    { UnitDepartment: 'PSY', value: 100 },
    { UnitDepartment: 'EDU', value: 100 },
    { UnitDepartment: 'MKT', value: 30 },
    { UnitDepartment: 'FIN', value: 100 },
    { UnitDepartment: 'BIO', value: 65 },
    { UnitDepartment: 'CHE', value: 90 },
    { UnitDepartment: 'ART', value: 100 },
];

export default function HBarChart_SurveyProgressionsByInstructorPerUnitDepartment() {
    const colorTheme = useMantineColorScheme()
    return (
        <Group>
            <Text mb={"20"}>Theo dõi tỷ lệ hoàn thành khảo sát của giảng viên theo khoa</Text>
            <BarChart
                h={500}
                w={"94%"}
                data={data}
                dataKey="UnitDepartment"
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
                        value: 'Tỉ lệ hoàn thành khảo sát (%)',
                        position: 'top',
                        // fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        fontSize: 14
                    }
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'value', color: '#e39500', label: 'UnitDepartment' }]}
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
                yAxisLabel="Khoa"
            // xAxisLabel="Tỷ lệ đạt PLO (%)"
            />
        </Group>
    );
}



