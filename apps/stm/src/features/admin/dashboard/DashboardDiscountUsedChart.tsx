'use client'
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { PieChart } from "@mantine/charts";
import { Center, Progress, Stack, Text } from "@mantine/core";
import { useMemo } from "react";

export function getRandomColor(seed: number, hueRange?: { min: number; max: number }): string {
    if (hueRange) {
        const random = Math.sin(seed) * 10000;
        const hue = hueRange.min + (random - Math.floor(random)) * (hueRange.max - hueRange.min);
        const saturation = 70 + (random * 1000) % 30;
        const lightness = 40 + (random * 10000) % 20;
        return `hsl(${Math.floor(hue)}, ${Math.floor(saturation)}%, ${Math.floor(lightness)}%)`;
    }
    const random = Math.sin(seed) * 10000;
    return `#${Math.floor((random - Math.floor(random)) * 16777215).toString(16).padStart(6, '0')}`;
}

interface IUsedDiscount {
    code?: string;
    color?: string;
    amount?: number;
}

interface IProps {
    usedDiscount?: { code?: string; amount?: number; total?: number }[];
    total: number;
}

export function DashboardDiscountUsedChart({ usedDiscount, total }: IProps) {
    const data_used: IUsedDiscount[] = usedDiscount?.map(item => ({
        code: item.code || "",
        amount: item.amount || 0,
        color: getRandomColor(item.amount!, { min: 0, max: 360 }),
    })) ?? [];

    const columns = useMemo<CustomColumnDef<IUsedDiscount>[]>(
        () => [
            {
                header: "Màu",
                accessorKey: "color",
                accessorFn: (row) => (
                    <div style={{ width: 20, height: 20, backgroundColor: row.color }} />
                ),
                size: 40,
            },
            {
                header: "Mã",
                accessorKey: "code",
                size: 120,
            },
            {
                header: "%",
                id: "percentage",
                accessorFn: (row) => `${((row.amount! / total) * 100).toFixed(0)}%`,
                size: 70,
            },
            {
                header: "Số lượng sử dụng",
                accessorKey: "amount",
                Cell: ({ row }) => (
                    <Stack gap={4}>
                        <Center>
                            <Text size="sm">
                                Đã sử dụng: <strong>{row.original.amount} / {total}</strong>
                                {' '}({((row.original.amount! / total) * 100).toFixed(2)}%)
                            </Text>
                        </Center>
                        <Progress
                            color="yellow"
                            radius="xs"
                            size="lg"
                            value={(row.original.amount! / total) * 100}
                        />
                    </Stack>
                ),
                size: 300,
            },
        ],
        [total]
    );

    return (
        <Stack gap="sm">
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
                    data={data_used.map(item => ({
                        name: item.code!,
                        color: item.color!,
                        value: item.amount!,
                    }))}
                />
            </Center>
            <CustomDataTable
                data={data_used}
                columns={columns}
                initialState={{ density: "xs", pagination: { pageIndex: 0, pageSize: 5 } }}
            />
        </Stack>
    );
}
