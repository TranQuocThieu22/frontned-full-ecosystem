import { ICOEGradeInfo } from '@/api/services/service_COEReport';
import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';
interface ITotalPLOsAndPIsPerGrade {
    COEGradeInfo: ICOEGradeInfo[]
}
export const data = [
    { COEGrade: 'K2021 - Khoa Công nghệ thông tin', totalCOEGradeSubject: 50, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2022 - Khoa Công nghệ thông tin', totalCOEGradeSubject: 50, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2023 - Khoa Công nghệ thông tin', totalCOEGradeSubject: 52, totalCOECoreGradeSubject: 40 },

    { COEGrade: 'K2021 - Khoa Điện tử viễn thông', totalCOEGradeSubject: 50, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2022 - Khoa Điện tử viễn thông', totalCOEGradeSubject: 50, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2023 - Khoa Điện tử viễn thông', totalCOEGradeSubject: 50, totalCOECoreGradeSubject: 45 },

    { COEGrade: 'K2021 - Khoa Cơ khí', totalCOEGradeSubject: 54, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2022 - Khoa Cơ khí', totalCOEGradeSubject: 54, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2023 - Khoa Cơ khí', totalCOEGradeSubject: 54, totalCOECoreGradeSubject: 35 },

    { COEGrade: 'K2021 - Khoa Xây dựng', totalCOEGradeSubject: 54, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2022 - Khoa Xây dựng', totalCOEGradeSubject: 54, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2023 - Khoa Xây dựng', totalCOEGradeSubject: 54, totalCOECoreGradeSubject: 35 },

    { COEGrade: 'K2021 - Khoa Kinh tế', totalCOEGradeSubject: 54, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2022 - Khoa Kinh tế', totalCOEGradeSubject: 54, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2023 - Khoa Kinh tế', totalCOEGradeSubject: 54, totalCOECoreGradeSubject: 47 },

    { COEGrade: 'K2021 - Khoa Ngoại ngữ', totalCOEGradeSubject: 44, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2022 - Khoa Ngoại ngữ', totalCOEGradeSubject: 45, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2023 - Khoa Ngoại ngữ', totalCOEGradeSubject: 40, totalCOECoreGradeSubject: 40 },

    { COEGrade: 'K2021 - Khoa Môi trường', totalCOEGradeSubject: 45, totalCOECoreGradeSubject: 35 },
    { COEGrade: 'K2022 - Khoa Môi trường', totalCOEGradeSubject: 45, totalCOECoreGradeSubject: 35 },
    { COEGrade: 'K2023 - Khoa Môi trường', totalCOEGradeSubject: 40, totalCOECoreGradeSubject: 35 },

    { COEGrade: 'K2021 - Khoa Y dược', totalCOEGradeSubject: 52, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2022 - Khoa Y dược', totalCOEGradeSubject: 50, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2023 - Khoa Y dược', totalCOEGradeSubject: 52, totalCOECoreGradeSubject: 40 },

    { COEGrade: 'K2021 - Khoa Luật', totalCOEGradeSubject: 50, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2022 - Khoa Luật', totalCOEGradeSubject: 50, totalCOECoreGradeSubject: 45 },
    { COEGrade: 'K2023 - Khoa Luật', totalCOEGradeSubject: 50, totalCOECoreGradeSubject: 40 },

    { COEGrade: 'K2021 - Khoa Sư phạm', totalCOEGradeSubject: 45, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2022 - Khoa Sư phạm', totalCOEGradeSubject: 45, totalCOECoreGradeSubject: 40 },
    { COEGrade: 'K2023 - Khoa Sư phạm', totalCOEGradeSubject: 54, totalCOECoreGradeSubject: 45 },

    { COEGrade: 'K2021 - Khoa Khoa học cơ bản', totalCOEGradeSubject: 45, totalCOECoreGradeSubject: 45 },
    { COEGrade: 'K2022 - Khoa Khoa học cơ bản', totalCOEGradeSubject: 45, totalCOECoreGradeSubject: 45 },
    { COEGrade: 'K2023 - Khoa Khoa học cơ bản', totalCOEGradeSubject: 45, totalCOECoreGradeSubject: 45 },
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
                        {item.name === 'ploQuantity' ? 'Số lượng môn học' : 'Số lượng môn học cốt lõi'}: {item.value}
                    </Text>
                </React.Fragment>
            ))}
        </Paper>
    );
}

export default function HBarChart_totalCOEGradeSubjectsAndPIsPerGrade({ COEGradeInfo }: ITotalPLOsAndPIsPerGrade) {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Biểu đồ theo dõi môn học đo lường chuẩn đầu ra chương trình đào tạo</Text>
            <BarChart
                h={2000}
                w={"96%"}
                data={COEGradeInfo}
                dataKey="gradeName"
                orientation="vertical"
                yAxisProps={{ width: 220 }}
                xAxisProps={{
                    // domain: [0, 100],
                    orientation: 'bottom',
                    tickCount: 20,
                }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                series={[
                    { name: 'ploQuantity', color: 'blue.6', label: 'Số lượng môn học' },
                    { name: 'piQuantity', color: 'red.6', label: 'Số lượng môn học cốt lõi' },
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
                yAxisLabel="Danh sách khóa"
                xAxisLabel="Số lượng môn học và môn học cốt lõi"
                withLegend
            />
        </Group>
    );
}