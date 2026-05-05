import { ChartTooltipProps, PieChart } from "@mantine/charts";
import { Center, Grid, Group, Paper, Text } from "@mantine/core";

interface IStudentPLOChartProps {
    studentOfSemester: number;
    studentUnPassedCLO: number;
}

export function Piechart_PercentageStudentPassCLO({
    studentOfSemester,
    studentUnPassedCLO,
}: IStudentPLOChartProps) {
    const totalPassed = Math.max(0, studentOfSemester - studentUnPassedCLO);
    const totalFailed = Math.max(0, studentUnPassedCLO);

    const data = [
        { name: 'Đạt CLO', value: totalPassed, color: "#fecf16" },
        { name: 'Không đạt CLO', value: totalFailed, color: "#eb5f1a" },
    ];

    return (
        <>
            <Text mb={"20"}>
                Biểu đồ theo dõi tỷ lệ sinh viên đạt chuẩn đầu ra môn học cốt lõi trong học kỳ hiện tại
            </Text>
            <Grid>
                <Grid.Col span={{ base: 8, md: 8 }}>
                    <Center>
                        <PieChart
                            startAngle={90}
                            endAngle={-270}
                            strokeWidth={0}
                            withLabelsLine
                            labelsPosition="outside"
                            withLabels
                            labelsType="percent"
                            data={data}
                            tooltipDataSource="segment"
                            tooltipProps={{
                                content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                            }}
                            withTooltip
                            style={{ width: 360 }}
                        />
                    </Center>
                </Grid.Col>
                <Grid.Col pt={40} span={{ base: 4, md: 4 }}>
                    {data.map((item, index) => (
                        <Group key={index} wrap="nowrap">
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    backgroundColor: item.color,
                                    borderRadius: "50%",
                                    marginRight: 8,
                                }}
                            ></div>
                            <Text>{item.name}</Text>
                        </Group>
                    ))}
                </Grid.Col>
            </Grid>
        </>
    );
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {label}
            </Text>
            {payload.map((item: any) => (
                <Text key={item.name} c={item.color} fw={500} fz="sm">
                    {item.name}: {item.value}
                </Text>
            ))}
        </Paper>
    );
}
