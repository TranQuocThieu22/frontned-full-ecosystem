import { IUnitGrade } from '@/api/services/service_COEReport';
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';

interface ITotalActiveProgramPerUnitDepartment {
    unitGrades: IUnitGrade[]
}
export const data = [
    { COEUnitDepartment: 'Khoa Công nghệ thông tin', totalProgram: 12, totalGrade: 18 },
    { COEUnitDepartment: 'Khoa quản trị kinh doanh', totalProgram: 15, totalGrade: 18 },
    { COEUnitDepartment: 'Khoa Điện tử viễn thông', totalProgram: 8, totalGrade: 10 },
    { COEUnitDepartment: 'Khoa Cơ khí', totalProgram: 10, totalGrade: 40 },
    { COEUnitDepartment: 'Khoa Xây dựng', totalProgram: 14, totalGrade: 14 },
    { COEUnitDepartment: 'Khoa Kinh tế', totalProgram: 11, totalGrade: 4 },
    { COEUnitDepartment: 'Khoa Ngoại ngữ', totalProgram: 9, totalGrade: 9 },
    { COEUnitDepartment: 'Khoa Môi trường', totalProgram: 7, totalGrade: 4 },
    { COEUnitDepartment: 'Khoa Y dược', totalProgram: 16, totalGrade: 4 },
    { COEUnitDepartment: 'Khoa Luật', totalProgram: 12, totalGrade: 4 },
    { COEUnitDepartment: 'Khoa Sư phạm', totalProgram: 13, totalGrade: 4 },
    { COEUnitDepartment: 'Khoa Khoa học cơ bản', totalProgram: 6, totalGrade: 4 }
];

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
            {payload.map((item: any, index) => (
                <React.Fragment key={index}>
                    <Text
                        c={"black"} fz="sm">
                        {item.name === 'totalProgram' ? 'Số lượng chương trình' : 'Số lượng khóa'}
                    </Text>
                </React.Fragment>
            ))}
        </Paper>
    );
}

export default function HBarChart_TotalProgramAndGradePerUnitDepartment(
    { unitGrades }: ITotalActiveProgramPerUnitDepartment
) {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Biểu đồ theo dõi chương trình và khóa</Text>
            <BarChart
                h={800}
                w={"96%"}
                data={unitGrades}
                dataKey="programName"
                orientation="vertical"
                yAxisProps={{ width: 220 }}
                xAxisProps={{
                    // domain: [0, 100],
                    orientation: 'bottom',
                    tickCount: 10,
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[
                    { name: 'programQuantity', color: 'blue.6', label: 'Số lượng chương trình' },
                    { name: 'programGrade', color: 'yellow.6', label: 'Số lượng khóa' },
                ]}
                barProps={{
                    label: {
                        position: 'right',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                    }
                }}
                maxBarWidth={20}
                tickLine="x"
                yAxisLabel="Danh sách khoa"
                xAxisLabel="Số lượng chương trình và khóa"
                withLegend
            />
        </Group>
    );
}