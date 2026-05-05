'use client'
import { Center, Progress, Space, Text } from "@mantine/core";

// const data_singleDiscountCode = {
//     total: 500,
//     used: 453,
// }

export default function ViewDiscountStat() {
    return (
        <>
            {/* <PieChart_DiscountUsedPercentage /> */}
            {/* <Divider />
            <Group w={"100%"} align="end">
                <TextInput
                    flex={1}
                    label="Tìm mã giảm giá"
                    placeholder="Nhập mã giảm giá"
                />
                <Button>
                    Tìm kiếm
                </Button>
            </Group>
            <Space mt={32} />
            <Center>
                <Text>Đã sử dụng: <strong>{data_singleDiscountCode.used} / {data_singleDiscountCode.total}</strong> - ({((data_singleDiscountCode.used / data_singleDiscountCode.total) * 100).toFixed(2)}%)</Text>
            </Center>
            <Progress color="yellow" radius="xs" size="lg" value={(data_singleDiscountCode.used / data_singleDiscountCode.total) * 100} /> */}
        </>
    )
}


import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { PieChart } from "@mantine/charts";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export function getRandomColor(seed: number, hueRange?: { min: number, max: number }): string {
    // If a hue range is provided, generate a color within that HSL range

    // HSL stands for Hue, Saturation, and Lightness.It's a color model that represents colors in a way that's often more intuitive than RGB(Red, Green, Blue):
    // 1. Hue: The actual color(like red, green, blue) represented as an angle from 0° to 360° on the color wheel
    // 2. Saturation: The intensity or purity of the color(0 % is grayscale, 100 % is full color)
    // 3. Lightness: How light or dark the color is(0 % is black, 100 % is white, 50 % is normal)

    // In the code, HSL is being used to generate colors with controlled parameters within specific ranges,
    //  which can create more visually pleasing and consistent color schemes than randomly generated RGB values.

    if (hueRange) {
        const random = Math.sin(seed) * 10000;
        const hue = hueRange.min + (random - Math.floor(random)) * (hueRange.max - hueRange.min);
        const saturation = 70 + (random * 1000) % 30; // 70-100%
        const lightness = 40 + (random * 10000) % 20; // 40-60%
        return `hsl(${Math.floor(hue)}, ${Math.floor(saturation)}%, ${Math.floor(lightness)}%)`;
    }

    // Original implementation as fallback
    const random = Math.sin(seed) * 10000;
    const color = `#${Math.floor((random - Math.floor(random)) * 16777215).toString(16).padStart(6, '0')}`;
    return color;
}

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

export function PieChart_DiscountUsedPercentage({ usedDiscount, total }: IData) {

    const data_used_discountCode = usedDiscount?.map((item, idx) => ({
        code: item.code || "",
        amount: item.amount || 0,
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
                <Text mb={"20"}>Biểu đồ phần trăm sử dụng chiết khấu học viên trong 60 ngày qua</Text>
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

