'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F7_2_6CreatePayment from "./F7_2_6CreatePayment";
import F7_2_6DeletePayment from "./F7_2_6DeletePayment";
import F7_2_6UpdatePayment from "./F7_2_6UpdatePayment";

export interface I7_2_6PaymentsDetails {
    id: number;
    decidedNumber: string;
    director: string;
    totalMoney: number;
    paymentFile: string;
}

export default function F7_2_6ReadAllPayment() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_2_6PaymentsDetails[]>({
        queryKey: ["F7_2_6ReadAllPayment"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_2_6PaymentsDetails>[]>(
        () => [
            {
                header: "Số quyết định",
                accessorKey: "decidedNumber"
            },
            {
                header: "Chủ tịch",
                accessorKey: "director"
            },
            {
                header: "Tổng tiền",
                accessorKey: "totalMoney"
            },
            {
                header: "File thanh toán",
                accessorKey: "paymentFile",
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />;
                },
            },

        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        //Danh sách thù lao hội đồng xét duyệt đề cương/ thuyết minh
        <MyFlexColumn>
            <Text>Danh sách đăng ký đề xuất định hướng </Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_2_6CreatePayment />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_2_6UpdatePayment values={row.original} />
                            <F7_2_6DeletePayment id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}

const data: I7_2_6PaymentsDetails[] = [
    {
        id: 1,
        decidedNumber: "QD001",
        director: "Nguyen Van A",
        totalMoney: 5000000,
        paymentFile: "payment1.pdf",
    },
    {
        id: 2,
        decidedNumber: "QD002",
        director: "Le Thi B",
        totalMoney: 7500000,
        paymentFile: "payment2.pdf",
    },
    {
        id: 3,
        decidedNumber: "QD003",
        director: "Tran Van C",
        totalMoney: 10000000,
        paymentFile: "payment3.pdf",
    },
];