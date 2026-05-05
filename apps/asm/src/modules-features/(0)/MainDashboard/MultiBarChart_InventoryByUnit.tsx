"use client"
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';

const data = [
    { unit: 'Phòng đào tạo', tool: 90, asset: 100, supplies: 50 },
    { unit: 'Phòng kế toán', tool: 80, asset: 43, supplies: 20 },
    { unit: 'Phòng hành chính', tool: 60, asset: 70, supplies: 40 },
    { unit: 'Phòng kinh doanh', tool: 50, asset: 80, supplies: 50 },
    { unit: 'Phòng nhân sự', tool: 30, asset: 100, supplies: 70 },
    { unit: 'Khoa CNTT', tool: 45, asset: 100, supplies: 100 },
    { unit: 'Khoa Kế toán', tool: 60, asset: 100, supplies: 100 },
    { unit: 'Khoa Kinh tế', tool: 70, asset: 100, supplies: 100 },
    { unit: 'Khoa Quản trị', tool: 80, asset: 100, supplies: 100 },
];
interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    const getItemLabel = (name: string) => {
        switch (name) {
            case 'asset':
                return 'Tài sản cố định';
            case 'tool':
                return 'Công cụ dụng cụ';
            case 'supplies':
                return 'Vật tư tiêu hao';
            default:
                return name;
        }
    };

    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={item.color} fz="sm">
                    {getItemLabel(item.name)}: {item.value}%
                </Text>
            ))}
        </Paper>
    );
}

export default function MultiBarChart_InventoryProgressByUnit() {
    const colorTheme = useMantineColorScheme()
    return (
        <>
            <Group style={{ position: 'relative' }}>
                <Text mb={"50"}>Biểu đồ phần trăm tiến độ kiểm kê theo đơn vị</Text>
                <Text
                    style={{
                        position: 'absolute',
                        right: '25%',
                        top: 0
                    }}
                >
                </Text>
                <BarChart
                    h={300}
                    w={"100%"}
                    withLegend
                    legendProps={{ verticalAlign: 'bottom', height: 50 }}
                    data={data}
                    dataKey="unit"
                    series={[
                        { name: 'asset', color: 'orange', label: 'Tài sản cố định', stackId: 'a' },
                        { name: 'tool', color: 'grape', label: 'Công cụ dụng cụ', stackId: 'b' },
                        { name: 'supplies', color: 'indigo', label: 'Vật tư tiêu hao', stackId: 'c' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    yAxisLabel="Tiến độ kiểm kê (%)"
                    yAxisProps={{ width: 64, domain: [0, 100] }}
                    maxBarWidth={32}
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
