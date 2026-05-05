'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { PieChart } from '@mantine/charts';
import { Center, Progress, Space, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { getRandomColor } from "./PieChart_DiscountUsedPercentage";

interface IUsedDiscount {
    code?: string
    name?: string,
    color?: string
    amount?: number,
    total?: number,
}
interface IData {
    usedDiscount?: IUsedDiscount[],
    total: number
}

export function PieChart_VoucherUsedPercentage({ usedDiscount, total }: IData) {

    const data_used_discountCode = usedDiscount?.map((item, idx) => ({
        code: item.code || "",
        amount: item.amount || 0,
        // color: getRandomColor(idx)
        color: getRandomColor(item.amount!, { min: 0, max: 360 }),
    })) as IUsedDiscount[]


    const columns = useMemo<MRT_ColumnDef<IUsedDiscount>[]>(
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
                header: "%",
                accessorKey: "used",
                accessorFn(originalRow) {
                    return (
                        <>
                            <Center>
                                <Text>{((originalRow.amount! / total) * 100).toFixed(0)}%</Text>
                            </Center>
                        </>
                    )
                },
                minSize: 64,
                maxSize: 64
            },
            {
                header: "Số lượng sử dụng",
                accessorKey: "amount",
                accessorFn(originalRow) {
                    return originalRow.amount;
                },
                Cell: ({ row }) => {
                    return (
                        <>
                            <Center>
                                <Text>Đã sử dụng: <strong>{row.original.amount} / {total}</strong> - ({((row.original.amount! / total) * 100).toFixed(2)}%)</Text>
                            </Center>
                            <Progress color="yellow" radius="xs" size="lg" value={(row.original.amount! / total) * 100} />
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
                <Text mb={"20"}>Biểu đồ phần trăm sử dụng mã giảm giá học viên trong 60 ngày qua</Text>
                <Center>
                    <PieChart
                        startAngle={90}
                        endAngle={-270}
                        strokeWidth={0}
                        withLabelsLine
                        labelsPosition="outside"
                        withLabels
                        labelsType="percent"
                        data={data_used_discountCode.map(item => ({
                            name: item.code!,
                            color: item.color!,
                            value: item.amount!
                        })) || []}
                    />
                </Center>
                <Space mt={5} />
                <MyDataTable
                    data={data_used_discountCode || []}
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

