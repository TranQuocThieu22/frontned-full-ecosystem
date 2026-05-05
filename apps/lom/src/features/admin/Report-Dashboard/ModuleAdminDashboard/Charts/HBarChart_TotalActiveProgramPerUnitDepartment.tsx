import { IUnitGrade } from '@/api/services/service_COEReport';
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';
interface ITotalActiveProgramPerUnitDepartment {
    unitGrades: IUnitGrade[]
}
export const data = [
    { COEUnitDepartment: 'Khoa Công nghệ thông tin', totalProgram: 12, totalIsActive: 10 },
    { COEUnitDepartment: 'Khoa quản trị kinh doanh', totalProgram: 15, totalIsActive: 15 },
    { COEUnitDepartment: 'Khoa Điện tử viễn thông', totalProgram: 8, totalIsActive: 7 },
    { COEUnitDepartment: 'Khoa Cơ khí', totalProgram: 10, totalIsActive: 8 },
    { COEUnitDepartment: 'Khoa Xây dựng', totalProgram: 14, totalIsActive: 12 },
    { COEUnitDepartment: 'Khoa Kinh tế', totalProgram: 11, totalIsActive: 9 },
    { COEUnitDepartment: 'Khoa Ngoại ngữ', totalProgram: 9, totalIsActive: 8 },
    { COEUnitDepartment: 'Khoa Môi trường', totalProgram: 7, totalIsActive: 5 },
    { COEUnitDepartment: 'Khoa Y dược', totalProgram: 16, totalIsActive: 14 },
    { COEUnitDepartment: 'Khoa Luật', totalProgram: 12, totalIsActive: 11 },
    { COEUnitDepartment: 'Khoa Sư phạm', totalProgram: 13, totalIsActive: 10 },
    { COEUnitDepartment: 'Khoa Khoa học cơ bản', totalProgram: 6, totalIsActive: 4 }
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
                    <Text key={index} c={"black"} fz="sm">
                        {item.name === 'totalProgram' ? 'Tổng số chương trình đào tạo' : 'Tổng số chương trình đào tạo đã nhập'}: {item.value}
                    </Text>
                </React.Fragment>
            ))}
        </Paper>
    );
}

export default function HBarChart_TotalActiveProgramPerUnitDepartment(
    { unitGrades }: ITotalActiveProgramPerUnitDepartment
) {
    const colorTheme = useMantineColorScheme()
    const title = 'Biểu đồ theo dõi xây dựng chương trình đào tạo'
    return (
        <Group>
            <Text mb={"20"}>{title}</Text>
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
                    { name: 'programQuantity', color: 'blue.6', label: 'Tổng số chương trình' },
                    { name: 'programGradeActive', color: 'green.6', label: 'Tổng số chương trình đào tạo đã nhập' },
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
                xAxisLabel="Số lượng chương trình đào tạo đã nhập"
                withLegend
            />
        </Group>
    );
}