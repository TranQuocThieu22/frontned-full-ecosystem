'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F7_4_2CreateDecision from "./F7_4_2CreateDecision";
import F7_4_2DeleteDecision from "./F7_4_2DeleteDecision";
import F7_4_2UpdateDecision from "./F7_4_2UpdateDecision";


export interface I7_4_2Decision {
    id: number;
    decisionNumber?: string;
    director?: string;
    totalCost?: string;
    paymentFile: string;
}

export default function F7_4_2ReadDecision() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_4_2Decision[]>({
        queryKey: ["F7_4_1_3ReadSummary"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_4_2Decision>[]>(
        () => [
            {
                header: "Số quyết định",
                accessorKey: "decisionNumber", // Maps to 'decisionNumber' field in the interface
            },
            {
                header: "Giám đốc",
                accessorKey: "director", // Maps to 'director' field in the interface
            },
            {
                header: "Tổng tiền",
                accessorKey: "totalCost", // Maps to 'totalCost' field in the interface
            },
            {
                header: "File thanh toán",
                accessorKey: "paymentFile", // Maps to 'paymentFile' field in the interface
                Cell: ({ cell }) => <MyButtonViewPDF />, // Renders PDF viewer button
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách thù lao đã thanh toán</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_4_2CreateDecision />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_4_2UpdateDecision values={row.original} />
                            <F7_4_2DeleteDecision id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}


const data: I7_4_2Decision[] = [
    {
        id: 1,
        decisionNumber: "DC001",
        director: "Nguyễn Văn A",
        totalCost: "100,000,000 VND",
        paymentFile: "payment_ai_healthcare.pdf",
    },
    {
        id: 2,
        decisionNumber: "DC002",
        director: "Trần Thị B",
        totalCost: "150,000,000 VND",
        paymentFile: "payment_blockchain_supplychain.pdf",
    },
    {
        id: 3,
        decisionNumber: "DC003",
        director: "Phạm Minh C",
        totalCost: "200,000,000 VND",
        paymentFile: "payment_bigdata_marketing.pdf",
    },
];