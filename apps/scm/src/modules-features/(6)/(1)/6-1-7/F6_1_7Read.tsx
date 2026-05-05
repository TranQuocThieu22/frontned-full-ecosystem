'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_1_7Create from "./F6_1_7Create";
import F6_1_7Delete from "./F6_1_7Delete";
import F6_1_7Update from "./F6_1_7Update";


export interface I6_1_7 {
    id: number; // Unique identifier
    decisionNumber: string; // Decision number
    director: string; // Chairman of the decision
    total: string; // Total payment amount
    file: string; // Path to the payment file
}

export default function F6_1_7Read() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_1_7[]>({
        queryKey: ["F6_1_7Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_1_7>[]>(() => [
        { header: "Số quyết định", accessorKey: "decisionNumber" },
        { header: "Chủ tịch", accessorKey: "director" },
        { header: "Tổng tiền", accessorKey: "total" },
        {

            header: "File thanh toán",
            accessorKey: "file",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
            size: 230
        },
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Danh sách thù lao đã thanh toán</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F6_1_7Create />}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F6_1_7Update values={row.original} />
                        <F6_1_7Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const data: I6_1_7[] = [
    {
        id: 1,
        decisionNumber: "QD001",
        director: "Nguyen Van A",
        total: "100,000,000 VND",
        file: "ai_payment.pdf",
    },
    {
        id: 2,
        decisionNumber: "QD002",
        director: "Le Thi B",
        total: "120,000,000 VND",
        file: "blockchain_payment.pdf",
    },
    {
        id: 3,
        decisionNumber: "QD003",
        director: "Tran Van C",
        total: "150,000,000 VND",
        file: "biotech_payment.pdf",
    },
];