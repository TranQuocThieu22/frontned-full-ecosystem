import { BarChart } from '@mantine/charts';
import { Badge, Box, Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
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
                <Text key={item.name} c={item.color} fz="sm">
                    Số lượng: {item.value}
                </Text>
            ))}
        </Paper>
    );
}
export default function FeatViewChartResearchProgress() {
    const colorTheme = useMantineColorScheme()
    const data = [
        { name1: 'Cấp trường', DangThucHien: 5, DaNghiemThu: 3, PhaHuy: 1 },
        { name1: 'Cấp tỉnh', DangThucHien: 8, DaNghiemThu: 5, PhaHuy: 2 },
        { name1: 'Cấp bộ', DangThucHien: 12, DaNghiemThu: 9, PhaHuy: 3 },
        { name1: 'Cấp quốc gia', DangThucHien: 15, DaNghiemThu: 13, PhaHuy: 4 },
        { name1: 'Cấp quốc tế', DangThucHien: 10, DaNghiemThu: 8, PhaHuy: 2 },
    ];
    return (
        <>
            <Text fz="xs" mb="sm" ta="center">
                Biểu đồ theo dõi thực hiện đề tài nghiên cứu khoa học
            </Text>
            {/* Biểu đồ cột */}
            <div>
                <BarChart
                    h={400}
                    w={"90%"}
                    data={data}
                    dataKey="name1" // Trục X
                    xAxisLabel="Cấp đề tài"
                    yAxisLabel="Số lượng"
                    series={[
                        { name: 'DangThucHien', color: 'red' },
                        { name: 'DaNghiemThu', color: 'blue' },
                        { name: 'PhaHuy', color: 'gray' },
                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    barProps={{
                        label: {
                            position: 'top',
                            value: 'amount',
                            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                        }
                    }}
                />
            </div>


            {/* Chú thích tự tạo */}
            <Box mt="md" ta="center">
                <Group justify="center">
                    <Badge color="red" radius="sm">Đang thực hiện</Badge>
                    <Badge color="blue" radius="sm">Đã nghiệm thu</Badge>
                    <Badge color="gray" radius="sm">Bị hủy</Badge>
                </Group>
            </Box>

        </>
    )
}