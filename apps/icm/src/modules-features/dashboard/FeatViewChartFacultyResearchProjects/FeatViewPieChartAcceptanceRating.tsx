'use client'
import { Center, Progress, Space, Text } from "@mantine/core";


import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { PieChart } from '@mantine/charts';
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
const data4 = [
    { name: 'Khá', value: 400, color: 'red.6' },
    { name: 'Giỏi', value: 300, color: 'yellow.6' },
    { name: 'Xuất xắc', value: 300, color: 'blue.6' }
]
export default function FeatViewChartAcceptanceRating() {
    return (
        <>
            <PieChart_Percentage />
        </>
    )
}

function getRandomColor(seed: number): string {
    const random = Math.sin(seed) * 10000;
    const color = `#${Math.floor((random - Math.floor(random)) * 16777215).toString(16).padStart(6, '0')}`;
    return color;
}

const data_rankedcode = [
    { name: 'R001', value: 33, color: getRandomColor(1) },
    { name: 'R002', value: 35, color: getRandomColor(2) },
    { name: 'R003', value: 32, color: getRandomColor(3) }
]

interface IRankedCode {
    code: string;
    name: string;
    total: number;
    used: number;
    color: string;
}

const mockData = [
    {
        code: 'R001',
        name: 'Khá',
        total: 100,
        used: 33,
        color: getRandomColor(1)
    },
    {
        code: 'R002',
        name: 'Giỏi',
        total: 100,
        used: 35,
        color: getRandomColor(2)
    },
    {
        code: 'R003',
        name: 'Xuất sắc',
        total: 100,
        used: 32,
        color: getRandomColor(3)
    },
]

export function PieChart_Percentage() {
    const totalDisountCode = mockData.reduce((acc, cur) => acc + cur.used, 0);

    const columns = useMemo<MRT_ColumnDef<IRankedCode>[]>(
        () => [
            {
                header: "Màu",
                accessorKey: "color",
                accessorFn(originalRow) {
                    return (
                        <div style={{ width: 20, height: 20, backgroundColor: originalRow.color }} />
                    )
                },
                minSize: 30,
                maxSize: 30
            },
            {
                header: "Mã",
                accessorKey: "code",
                minSize: 20,
                maxSize: 20

            },
            {
                header: "Xếp loại",
                accessorKey: "name",
                minSize: 20,
                maxSize: 20

            },
            {
                header: "%",
                accessorKey: "used",
                accessorFn(originalRow) {
                    return (
                        <>
                            <Center>
                                <Text>{((originalRow.used / totalDisountCode) * 100).toFixed(0)}%</Text>
                            </Center>
                        </>
                    )
                },
                minSize: 64,
                maxSize: 64
            },
            {
                header: "Số lượng nghiệm thu theo cấp",
                accessorKey: "value",
                accessorFn(originalRow) {
                    return originalRow.used;
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <Center>
                                <Text>Đã sử dụng: <strong>{row.original.used} / {row.original.total}</strong> - ({((row.original.used / row.original.total) * 100).toFixed(2)}%)</Text>
                            </Center>
                            <Progress color="yellow" radius="xs" size="lg" value={(row.original.used / row.original.total) * 100} />
                        </>
                    )
                },
                minSize: 50,
                maxSize: 50
            }
        ],
        []
    );

    return (
        <>
            <MyFlexColumn>
                <Text fz="xs" mb={"20"} ta="center">Biểu đồ tỷ lệ xếp loại nghiệm thu đề tài</Text>
                <Center>
                    <PieChart
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                        withLabelsLine
                        labelsPosition="outside"
                        withLabels
                        labelsType="percent"
                        data={data_rankedcode}
                    />
                </Center>
                <Space mt={5} />
                <MyDataTable
                    data={mockData}
                    columns={columns}
                    initialState={{
                        density: "xs",
                        pagination: { pageIndex: 0, pageSize: 5 },
                    }}
                />
            </MyFlexColumn>
        </>
    )
}