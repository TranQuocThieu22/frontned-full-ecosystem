import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';

export const data = [
    { COEGrade: 'K2021 - Khoa Công nghệ thông tin', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Công nghệ thông tin', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Công nghệ thông tin', totalPLO: 6, totalPI: 12 },

    { COEGrade: 'K2021 - Khoa Điện tử viễn thông', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Điện tử viễn thông', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Điện tử viễn thông', totalPLO: 6, totalPI: 12 },

    { COEGrade: 'K2021 - Khoa Cơ khí', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Cơ khí', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Cơ khí', totalPLO: 6, totalPI: 12 },

    { COEGrade: 'K2021 - Khoa Xây dựng', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Xây dựng', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Xây dựng', totalPLO: 6, totalPI: 12 },

    { COEGrade: 'K2021 - Khoa Kinh tế', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Kinh tế', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Kinh tế', totalPLO: 6, totalPI: 12 },

    { COEGrade: 'K2021 - Khoa Ngoại ngữ', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Ngoại ngữ', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Ngoại ngữ', totalPLO: 6, totalPI: 12 },

    { COEGrade: 'K2021 - Khoa Môi trường', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Môi trường', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Môi trường', totalPLO: 6, totalPI: 12 },

    { COEGrade: 'K2021 - Khoa Y dược', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Y dược', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Y dược', totalPLO: 6, totalPI: 12 },

    { COEGrade: 'K2021 - Khoa Luật', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Luật', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Luật', totalPLO: 6, totalPI: 12 },

    { COEGrade: 'K2021 - Khoa Sư phạm', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Sư phạm', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Sư phạm', totalPLO: 6, totalPI: 12 },

    { COEGrade: 'K2021 - Khoa Khoa học cơ bản', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2022 - Khoa Khoa học cơ bản', totalPLO: 5, totalPI: 15 },
    { COEGrade: 'K2023 - Khoa Khoa học cơ bản', totalPLO: 6, totalPI: 12 },
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
                        key={index}
                        c={"black"} fz="sm">
                        {item.name === 'totalPLO' ? 'Số lượng PLO' : 'Số lượng Pi'}: {item.value}
                    </Text>
                </React.Fragment>
            ))}
        </Paper>
    );
}

export default function HBarChart_TotalPLOsAndPIsPerGrade() {
    const colorTheme = useMantineColorScheme()

    return (
        <Group>
            <Text mb={"20"}>Biểu đồ theo dõi chỉ số đo lường chuẩn đầu ra chương trình đào tạo</Text>
            <BarChart
                h={2000}
                w={"96%"}
                data={data}
                dataKey="COEGrade"
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
                    { name: 'totalPLO', color: 'pink.6', label: 'Số lượng PLO' },
                    { name: 'totalPI', color: 'indigo.6', label: 'Số lượng PI' },
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
                xAxisLabel="Số lượng PLO và Pi"
                withLegend
            />
        </Group>
    );
}