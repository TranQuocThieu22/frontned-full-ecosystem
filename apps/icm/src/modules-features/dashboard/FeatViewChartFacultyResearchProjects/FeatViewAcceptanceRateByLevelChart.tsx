import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { PieChart } from '@mantine/charts';
import { Center, Progress, Space, Text } from '@mantine/core';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

export default function FeatViewAcceptanceRateByLevelChart() {
    return (
        <>
            <PieChart_Percentage />
        </>
    )
}

function getRandomColor(seed: number): string {
    const random = Math.sin(seed) * 10000;
    const color = `#${Math.floor((random - Math.floor(random)) * 16777215).toString(16).padStart(6, '0')}`
    return color;
}

const data_used_discountCode = [
    { name: 'LV01', value: 55, color: getRandomColor(1) },
    { name: 'LV02', value: 32, color: getRandomColor(2) },
    { name: 'LV03', value: 5, color: getRandomColor(3) },
    { name: 'LV04', value: 20, color: getRandomColor(4) },
    { name: 'LV05', value: 12, color: getRandomColor(5) }
]

interface IUsedDiscountCode {
    code: string;
    name: string;
    total: number;
    used: number;
    color: string;
}

const mockData = [
    {
        code: 'LV01',
        name: 'Cấp trường',
        total: 100,
        used: 54,
        color: getRandomColor(1)
    },
    {
        code: 'LV02',
        name: 'Cấp tỉnh',
        total: 150,
        used: 32,
        color: getRandomColor(2)
    },
    {
        code: 'LV03',
        name: 'Cấp bộ',
        total: 10,
        used: 5,
        color: getRandomColor(3)
    },
    {
        code: 'LV04',
        name: 'Cấp quốc gia',
        total: 100,
        used: 20,
        color: getRandomColor(4)
    },
    {
        code: 'LV05',
        name: 'Cấp quốc tế',
        total: 100,
        used: 12,
        color: getRandomColor(5)
    }
]

export function PieChart_Percentage() {
    const totalDiscountCode = mockData.reduce((acc, cur) => acc + cur.used, 0);

    const columns = useMemo<MRT_ColumnDef<IUsedDiscountCode>[]>(
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
                header: "Cấp đề tài",
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
                                <Text>{((originalRow.used / totalDiscountCode) * 100).toFixed(0)}%</Text>
                            </Center>
                        </>
                    )
                },
                minSize: 64,
                maxSize: 64
            },
            {
                header: "Số lượng nghiệm thu",
                accessorKey: "value",
                accessorFn(originalRow) {
                    return originalRow.used;
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <Center>
                                <Text>Đã nghiệm thu: <strong>{row.original.used} / {row.original.total}</strong> - ({((row.original.used / row.original.total) * 100).toFixed(2)}%)</Text>
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
                <Text fz="xs" mb={"20"} ta="center">Biểu đồ tỷ lệ đề tài nghiệm thu theo cấp</Text>
                <Center>
                    <PieChart
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                        withLabelsLine
                        labelsPosition="outside"
                        withLabels
                        labelsType="percent"
                        data={data_used_discountCode}
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