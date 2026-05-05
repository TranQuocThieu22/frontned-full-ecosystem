'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { Button, Container, Fieldset, Grid, Radio, SimpleGrid, Stack } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { Group, Title, Text } from '@mantine/core';
import { U0DateToDDMMYYYString } from '@/utils/date';
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
// REVIEW: 48258 Prototype: Sổ công cụ dụng cụ

export interface I {
    id?: number;
    code?: string
    name?: string
    barCode?: string
    usageUnit?: string
    initialCost?: number
    currentCost?: number // giá trị đầu kỳ
    depreciationValue?: number // giá trị khấu hao
    residualValue?: number // giá trị còn lại
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;

}

export default function F5_6Read() {
    const [value, setValue] = useState('1');

    const query = useQuery<I[]>({
        queryKey: [`F5_6Read`],
        queryFn: async () => data
    });



    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [

            {
                accessorKey: "code",
                header: "Mã tài sản"
            },
            {
                accessorKey: "name",
                header: "Tên tài sản"
            },
            {
                accessorKey: "barCode",
                header: "Mã vạch"
            },
            {
                accessorKey: "usageUnit",
                header: "Đơn vị sử dụng"
            },
            {
                accessorKey: "initialCost",
                header: "Giá trị mua mới",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.initialCost}></MyNumberFormatter>
                    )
                },
            },
            {
                accessorKey: "currentCost",
                header: "Giá trị đầu kỳ",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.currentCost}></MyNumberFormatter>
                    )
                },
            },
            {
                accessorKey: "depreciationValue",
                header: "Giá trị khấu hao",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.depreciationValue}></MyNumberFormatter>
                    )
                },
            },
            {
                accessorKey: "residualValue",
                header: "Giá trị còn lại",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.residualValue}></MyNumberFormatter>
                    )
                },
            },
            {
                header: "Chứng từ",
                accessorFn: (row) => (
                    <MyButtonViewPDF />
                )
            },
            {
                header: "Quá trình sử dụng",
                accessorFn: (row) => (
                    <Text td="underline" c="blue">Xem</Text>
                )
            },
            {
                accessorKey: "ngayCapNhat",
                accessorFn: (row) =>
                    row.ngayCapNhat ? U0DateToDDMMYYYString(new Date(row.ngayCapNhat)) : "",
                header: "Ngày cập nhật"
            },
            {
                accessorKey: "nguoiCapNhat",
                header: "Người cập nhật"
            },
        ],
        []
    );
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Container fluid>
            <Radio.Group
                value={value}
                onChange={setValue}
                withAsterisk
                mb={20}
            >
                <Grid>
                    <Grid.Col span={7}>
                        <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }}>
                            <Radio value="1" label="Tất cả (đến kỳ cuối)" />
                            <Radio value="2" label="Tăng trong kỳ" />
                            <Radio value="3" label="Giảm trong kỳ" />
                            <Radio value="4" label="Điều chuyển trong kỳ" />
                        </SimpleGrid>
                    </Grid.Col>
                </Grid>

            </Radio.Group>
            <Group align="end">
                <MyDateInput label="Từ ngày" flex={1} />
                <MyDateInput label="Đến ngày" flex={1} />
                <Button w={"10%"}>Xem</Button>
            </Group>
            <Fieldset legend="Danh sách công cụ dụng cụ">
                <MyDataTable
                    exportAble
                    columns={columns}
                    data={query.data!}
                    initialState={{
                        density: "md",
                        pagination: { pageIndex: 0, pageSize: 10 },
                        columnPinning: { right: ["mrt-row-actions"] },
                        columnVisibility: {
                            nguoiCapNhat: false,
                            ngayCapNhat: false
                        }
                    }}
                />
            </Fieldset>
        </Container>
    );
}
const data: I[] = [
    {
        id: 1,
        code: "TL001",
        barCode: "1234567890123",
        name: "Bàn làm việc",
        usageUnit: "Phòng giám đốc",
        initialCost: 5000000,
        currentCost: 4500000,
        depreciationValue: 500000,
        residualValue: 4500000,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-10"),
    },
    {
        id: 2,
        code: "TL002",
        barCode: "9876543210987",
        name: "Ghế xoay",
        usageUnit: "Phòng nhân sự",
        initialCost: 2000000,
        currentCost: 1800000,
        depreciationValue: 200000,
        residualValue: 1800000,
        nguoiCapNhat: "user1",
        ngayCapNhat: new Date("2025-01-12"),
    },
    {
        id: 3,
        code: "TL003",
        barCode: "5678901234567",
        name: "Tủ hồ sơ",
        usageUnit: "Phòng nhân sự",
        initialCost: 3000000,
        currentCost: 2500000,
        depreciationValue: 500000,
        residualValue: 2500000,
        nguoiCapNhat: "user2",
        ngayCapNhat: new Date("2025-01-14"),
    },
    {
        id: 4,
        code: "TL004",
        barCode: "5432109876543",
        name: "Máy in",
        usageUnit: "Phòng nhân sự",
        initialCost: 7000000,
        currentCost: 6000000,
        depreciationValue: 1000000,
        residualValue: 6000000,
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-15"),
    },
    {
        id: 5,
        code: "TL005",
        barCode: "3210987654321",
        name: "Máy tính để bàn",
        usageUnit: "Phòng nhân sự",
        initialCost: 15000000,
        currentCost: 12000000,
        depreciationValue: 3000000,
        residualValue: 12000000,
        nguoiCapNhat: "user3",
        ngayCapNhat: new Date("2025-01-13"),
    },
    {
        id: 6,
        code: "TL006",
        barCode: "1111111111111",
        name: "Máy chiếu",
        usageUnit: "Phòng kế toán",
        initialCost: 10000000,
        currentCost: 8000000,
        depreciationValue: 2000000,
        residualValue: 8000000,
        nguoiCapNhat: "user4",
        ngayCapNhat: new Date("2025-01-16"),
    },
    {
        id: 7,
        code: "TL007",
        barCode: "2222222222222",
        name: "Máy photocopy",
        usageUnit: "Phòng kế toán",
        initialCost: 20000000,
        currentCost: 18000000,
        depreciationValue: 2000000,
        residualValue: 18000000,
        nguoiCapNhat: "user5",
        ngayCapNhat: new Date("2025-01-17"),
    },
    {
        id: 8,
        code: "TL008",
        barCode: "3333333333333",
        name: "Máy scan",
        usageUnit: "Phòng kế toán",
        initialCost: 5000000,
        currentCost: 4000000,
        depreciationValue: 1000000,
        residualValue: 4000000,
        nguoiCapNhat: "user6",
        ngayCapNhat: new Date("2025-01-18"),
    },
    {
        id: 9,
        code: "TL009",
        barCode: "4444444444444",
        name: "Máy fax",
        usageUnit: "Phòng kế toán",
        initialCost: 3000000,
        currentCost: 2000000,
        depreciationValue: 1000000,
        residualValue: 2000000,
        nguoiCapNhat: "user7",
        ngayCapNhat: new Date("2025-01-19"),
    },
    {
        id: 10,
        code: "TL010",
        barCode: "5555555555555",
        name: "Máy hủy tài liệu",
        usageUnit: "Phòng kế toán",
        initialCost: 2000000,
        currentCost: 1500000,
        depreciationValue: 500000,
        residualValue: 1500000,
        nguoiCapNhat: "user8",
        ngayCapNhat: new Date("2025-01-20"),
    },
    {
        id: 11,
        code: "TL011",
        barCode: "6666666666666",
        name: "Máy đếm tiền",
        usageUnit: "Phòng kế toán",
        initialCost: 7000000,
        currentCost: 5000000,
        depreciationValue: 2000000,
        residualValue: 5000000,
        nguoiCapNhat: "user9",
        ngayCapNhat: new Date("2025-01-21"),
    },
    {
        id: 12,
        code: "TL012",
        barCode: "7777777777777",
        name: "Máy in hóa đơn",
        usageUnit: "Phòng kế toán",
        initialCost: 3000000,
        currentCost: 2500000,
        depreciationValue: 500000,
        residualValue: 2500000,
        nguoiCapNhat: "user10",
        ngayCapNhat: new Date("2025-01-22"),
    },
    {
        id: 13,
        code: "TL013",
        barCode: "8888888888888",
        name: "Máy tính xách tay",
        usageUnit: "Phòng kế toán",
        initialCost: 20000000,
        currentCost: 18000000,
        depreciationValue: 2000000,
        residualValue: 18000000,
        nguoiCapNhat: "user11",
        ngayCapNhat: new Date("2025-01-23"),
    },
    {
        id: 14,
        code: "TL014",
        barCode: "9999999999999",
        name: "Máy chiếu",
        usageUnit: "Phòng kế toán",
        initialCost: 10000000,
        currentCost: 9000000,
        depreciationValue: 1000000,
        residualValue: 9000000,
        nguoiCapNhat: "user12",
        ngayCapNhat: new Date("2025-01-24"),
    },
    {
        id: 15,
        code: "TL015",
        barCode: "1010101010101",
        name: "Máy quét mã vạch",
        usageUnit: "Phòng kế toán",
        initialCost: 5000000,
        currentCost: 4000000,
        depreciationValue: 1000000,
        residualValue: 4000000,
        nguoiCapNhat: "user13",
        ngayCapNhat: new Date("2025-01-25"),
    },
    {
        id: 16,
        code: "TL016",
        barCode: "1212121212121",
        name: "Máy tính bảng",
        usageUnit: "Phòng tài chính",
        initialCost: 15000000,
        currentCost: 12000000,
        depreciationValue: 3000000,
        residualValue: 12000000,
        nguoiCapNhat: "user14",
        ngayCapNhat: new Date("2025-01-26"),
    },
    {
        id: 17,
        code: "TL017",
        barCode: "1313131313131",
        name: "Máy in màu",
        usageUnit: "Phòng tài chính",
        initialCost: 10000000,
        currentCost: 8000000,
        depreciationValue: 2000000,
        residualValue: 8000000,
        nguoiCapNhat: "user15",
        ngayCapNhat: new Date("2025-01-27"),
    },
    {
        id: 18,
        code: "TL018",
        barCode: "1414141414141",
        name: "Máy photocopy",
        usageUnit: "Phòng tài chính",
        initialCost: 25000000,
        currentCost: 20000000,
        depreciationValue: 5000000,
        residualValue: 20000000,
        nguoiCapNhat: "user16",
        ngayCapNhat: new Date("2025-01-28"),
    },
    {
        id: 19,
        code: "TL019",
        barCode: "1515151515151",
        name: "Máy chiếu",
        usageUnit: "Phòng tài chính",
        initialCost: 12000000,
        currentCost: 10000000,
        depreciationValue: 2000000,
        residualValue: 10000000,
        nguoiCapNhat: "user17",
        ngayCapNhat: new Date("2025-01-29"),
    },
    {
        id: 20,
        code: "TL020",
        barCode: "1616161616161",
        name: "Máy scan",
        usageUnit: "Phòng tài chính",
        initialCost: 8000000,
        currentCost: 6000000,
        depreciationValue: 2000000,
        residualValue: 6000000,
        nguoiCapNhat: "user18",
        ngayCapNhat: new Date("2025-01-30"),
    },
    {
        id: 21,
        code: "TL021",
        barCode: "1717171717171",
        name: "Máy fax",
        usageUnit: "Phòng tài chính",
        initialCost: 5000000,
        currentCost: 4000000,
        depreciationValue: 1000000,
        residualValue: 4000000,
        nguoiCapNhat: "user19",
        ngayCapNhat: new Date("2025-01-31"),
    },
    {
        id: 22,
        code: "TL022",
        barCode: "1818181818181",
        name: "Máy hủy tài liệu",
        usageUnit: "Phòng tài chính",
        initialCost: 3000000,
        currentCost: 2500000,
        depreciationValue: 500000,
        residualValue: 2500000,
        nguoiCapNhat: "user20",
        ngayCapNhat: new Date("2025-02-01"),
    },
    {
        id: 23,
        code: "TL023",
        barCode: "1919191919191",
        name: "Máy đếm tiền",
        usageUnit: "Phòng tài chính",
        initialCost: 7000000,
        currentCost: 5000000,
        depreciationValue: 2000000,
        residualValue: 5000000,
        nguoiCapNhat: "user21",
        ngayCapNhat: new Date("2025-02-02"),
    },
    {
        id: 24,
        code: "TL024",
        barCode: "2020202020202",
        name: "Máy in hóa đơn",
        usageUnit: "Phòng tài chính",
        initialCost: 3000000,
        currentCost: 2500000,
        depreciationValue: 500000,
        residualValue: 2500000,
        nguoiCapNhat: "user22",
        ngayCapNhat: new Date("2025-02-03"),
    },
    {
        id: 25,
        code: "TL025",
        barCode: "2121212121212",
        name: "Máy tính xách tay",
        usageUnit: "Phòng tài chính",
        initialCost: 20000000,
        currentCost: 18000000,
        depreciationValue: 2000000,
        residualValue: 18000000,
        nguoiCapNhat: "user23",
        ngayCapNhat: new Date("2025-02-04"),
    },
    {
        id: 26,
        code: "TL026",
        barCode: "2222222222222",
        name: "Máy in",
        usageUnit: "Khoa CNTT",
        initialCost: 10000000,
        currentCost: 8000000,
        depreciationValue: 2000000,
        residualValue: 8000000,
        nguoiCapNhat: "user24",
        ngayCapNhat: new Date("2025-02-05"),
    },
    {
        id: 27,
        code: "TL027",
        barCode: "2323232323232",
        name: "Máy tính xách tay",
        usageUnit: "Khoa CNTT",
        initialCost: 25000000,
        currentCost: 20000000,
        depreciationValue: 5000000,
        residualValue: 20000000,
        nguoiCapNhat: "user25",
        ngayCapNhat: new Date("2025-02-06"),
    },
    {
        id: 28,
        code: "TL028",
        barCode: "2424242424242",
        name: "Máy chiếu",
        usageUnit: "Khoa CNTT",
        initialCost: 15000000,
        currentCost: 12000000,
        depreciationValue: 3000000,
        residualValue: 12000000,
        nguoiCapNhat: "user26",
        ngayCapNhat: new Date("2025-02-07"),
    },
    {
        id: 29,
        code: "TL029",
        barCode: "2525252525252",
        name: "Máy scan",
        usageUnit: "Khoa CNTT",
        initialCost: 8000000,
        currentCost: 6000000,
        depreciationValue: 2000000,
        residualValue: 6000000,
        nguoiCapNhat: "user27",
        ngayCapNhat: new Date("2025-02-08"),
    },
    {
        id: 30,
        code: "TL030",
        barCode: "2626262626262",
        name: "Máy fax",
        usageUnit: "Khoa CNTT",
        initialCost: 5000000,
        currentCost: 4000000,
        depreciationValue: 1000000,
        residualValue: 4000000,
        nguoiCapNhat: "user28",
        ngayCapNhat: new Date("2025-02-09"),
    },
    {
        id: 31,
        code: "TL031",
        barCode: "2727272727272",
        name: "Máy hủy tài liệu",
        usageUnit: "Khoa CNTT",
        initialCost: 3000000,
        currentCost: 2500000,
        depreciationValue: 500000,
        residualValue: 2500000,
        nguoiCapNhat: "user29",
        ngayCapNhat: new Date("2025-02-10"),
    },
    {
        id: 32,
        code: "TL032",
        barCode: "2828282828282",
        name: "Máy đếm tiền",
        usageUnit: "Khoa CNTT",
        initialCost: 7000000,
        currentCost: 5000000,
        depreciationValue: 2000000,
        residualValue: 5000000,
        nguoiCapNhat: "user30",
        ngayCapNhat: new Date("2025-02-11"),
    },
    {
        id: 33,
        code: "TL033",
        barCode: "2929292929292",
        name: "Máy in hóa đơn",
        usageUnit: "Khoa CNTT",
        initialCost: 3000000,
        currentCost: 2500000,
        depreciationValue: 500000,
        residualValue: 2500000,
        nguoiCapNhat: "user31",
        ngayCapNhat: new Date("2025-02-12"),
    },
    {
        id: 34,
        code: "TL034",
        barCode: "3030303030303",
        name: "Máy tính xách tay",
        usageUnit: "Khoa CNTT",
        initialCost: 20000000,
        currentCost: 18000000,
        depreciationValue: 2000000,
        residualValue: 18000000,
        nguoiCapNhat: "user32",
        ngayCapNhat: new Date("2025-02-13"),
    },
    {
        id: 35,
        code: "TL035",
        barCode: "3131313131313",
        name: "Máy chiếu",
        usageUnit: "Khoa CNTT",
        initialCost: 10000000,
        currentCost: 9000000,
        depreciationValue: 1000000,
        residualValue: 9000000,
        nguoiCapNhat: "user33",
        ngayCapNhat: new Date("2025-02-14"),
    }
];