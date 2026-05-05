import { BarChart } from '@mantine/charts';
import { Group, Paper, Select, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';

export const data = [
    { LOMGrade: 'IT-K24', totalCourseSection: 12, totalCSWithCLOSurvey: 10 },
    { LOMGrade: 'IT-K25', totalCourseSection: 14, totalCSWithCLOSurvey: 12 },
    { LOMGrade: 'IT-K26', totalCourseSection: 11, totalCSWithCLOSurvey: 9 },
    { LOMGrade: 'CS-K24', totalCourseSection: 15, totalCSWithCLOSurvey: 13 },
    { LOMGrade: 'CS-K25', totalCourseSection: 13, totalCSWithCLOSurvey: 11 },
    { LOMGrade: 'CS-K26', totalCourseSection: 10, totalCSWithCLOSurvey: 8 },
    { LOMGrade: 'BA-K24', totalCourseSection: 15, totalCSWithCLOSurvey: 15 },
    { LOMGrade: 'BA-K25', totalCourseSection: 14, totalCSWithCLOSurvey: 12 },
    { LOMGrade: 'BA-K26', totalCourseSection: 9, totalCSWithCLOSurvey: 7 },
    { LOMGrade: 'EE-K24', totalCourseSection: 8, totalCSWithCLOSurvey: 7 },
    { LOMGrade: 'EE-K25', totalCourseSection: 10, totalCSWithCLOSurvey: 9 },
    { LOMGrade: 'EE-K26', totalCourseSection: 12, totalCSWithCLOSurvey: 10 },
    { LOMGrade: 'ME-K24', totalCourseSection: 9, totalCSWithCLOSurvey: 8 },
    { LOMGrade: 'ME-K25', totalCourseSection: 11, totalCSWithCLOSurvey: 10 },
    { LOMGrade: 'ME-K26', totalCourseSection: 13, totalCSWithCLOSurvey: 11 },
    { LOMGrade: 'CE-K24', totalCourseSection: 14, totalCSWithCLOSurvey: 12 },
    { LOMGrade: 'CE-K25', totalCourseSection: 12, totalCSWithCLOSurvey: 10 },
    { LOMGrade: 'CE-K26', totalCourseSection: 10, totalCSWithCLOSurvey: 8 },
    { LOMGrade: 'ECO-K24', totalCourseSection: 11, totalCSWithCLOSurvey: 9 },
    { LOMGrade: 'ECO-K25', totalCourseSection: 13, totalCSWithCLOSurvey: 11 },
    { LOMGrade: 'ECO-K26', totalCourseSection: 15, totalCSWithCLOSurvey: 13 },
    { LOMGrade: 'LE-K24', totalCourseSection: 9, totalCSWithCLOSurvey: 8 },
    { LOMGrade: 'LE-K25', totalCourseSection: 10, totalCSWithCLOSurvey: 9 },
    { LOMGrade: 'LE-K26', totalCourseSection: 12, totalCSWithCLOSurvey: 10 },
    { LOMGrade: 'LAW-K24', totalCourseSection: 12, totalCSWithCLOSurvey: 11 },
    { LOMGrade: 'LAW-K25', totalCourseSection: 14, totalCSWithCLOSurvey: 12 },
    { LOMGrade: 'LAW-K26', totalCourseSection: 16, totalCSWithCLOSurvey: 14 },
    { LOMGrade: 'PSY-K24', totalCourseSection: 7, totalCSWithCLOSurvey: 6 },
    { LOMGrade: 'PSY-K25', totalCourseSection: 8, totalCSWithCLOSurvey: 7 },
    { LOMGrade: 'PSY-K26', totalCourseSection: 9, totalCSWithCLOSurvey: 8 },
    { LOMGrade: 'EDU-K24', totalCourseSection: 6, totalCSWithCLOSurvey: 4 },
    { LOMGrade: 'EDU-K25', totalCourseSection: 7, totalCSWithCLOSurvey: 5 },
    { LOMGrade: 'EDU-K26', totalCourseSection: 8, totalCSWithCLOSurvey: 6 }
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
                        {item.name === 'totalCourseSection' ? 'Tổng số nhóm học' : 'Tổng số nhóm học triển khai đo lường CLO'}: {item.value}
                    </Text>
                </React.Fragment>
            ))}
        </Paper>
    );
}

export default function HBarChart_TotalActiveCourseSectionPerUnitDepartment() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"64"}>Biểu đồ theo dõi số lượng nhóm môn học đo lường CLO theo khóa</Text>
            <BarChart
                pb={"md"}
                h={360}
                w={"100%"}
                data={data}
                dataKey="LOMGrade"
                orientation="horizontal"
                yAxisProps={{ width: 60 }}
                xAxisProps={{
                    // domain: [0, 100],
                    orientation: 'bottom',
                    tickCount: 10,

                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[
                    { name: 'totalCourseSection', color: 'blue.6', label: 'Tổng số nhóm học' },
                    { name: 'totalCSWithCLOSurvey', color: 'green.6', label: 'Tổng số nhóm học triển khai đo lường CLO' },
                ]}
                barProps={{
                    label: {
                        position: 'top',
                        value: 'amount',
                        fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'black',
                    }
                }}
                // maxBarWidth={20}
                barChartProps={{
                    barSize: 22,
                    barGap: 4,
                    // barCategoryGap: 10,
                }}
                tickLine="x"
                yAxisLabel="Số lượng"
                xAxisLabel="Khóa"
                withLegend
                legendProps={{
                    // align: 'center',
                    layout: 'centric',
                    wrapperStyle: { marginTop: -50 },
                }}
            />
        </Group>
    );
}