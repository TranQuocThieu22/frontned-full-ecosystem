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
                    Tỷ lệ hài lòng: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

export const data = [
    { UnitDepartment: 'IT', value: 65 },
    { UnitDepartment: 'BA', value: 98 },
    { UnitDepartment: 'CS', value: 78 },
    { UnitDepartment: 'EE', value: 76 },
    { UnitDepartment: 'ME', value: 99 },
    { UnitDepartment: 'CE', value: 56 },
    { UnitDepartment: 'ECO', value: 67 },
    { UnitDepartment: 'LE', value: 78 },
    { UnitDepartment: 'LAW', value: 79 },
    { UnitDepartment: 'PSY', value: 74 },
    { UnitDepartment: 'EDU', value: 89 },
    { UnitDepartment: 'MKT', value: 81 },
    { UnitDepartment: 'FIN', value: 85 },
    { UnitDepartment: 'BIO', value: 72 },
    { UnitDepartment: 'CHE', value: 68 },
    { UnitDepartment: 'ART', value: 92 },
];

export default function HBarChart_PleasurementRateForUnitDepartmentByStudent() {
    const colorTheme = useMantineColorScheme()
    return (
        <Group>
            <Text mb={"20"}>Theo dõi tỷ lệ hài lòng của người học theo Khoa quản lý môn học</Text>
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
                        value: 'Tỉ lệ hài lòng (%)',
                        position: 'top',
                        // fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        fontSize: 14
                    }
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[{ name: 'value', color: '#59be23', label: 'UnitDepartment' }]}
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



