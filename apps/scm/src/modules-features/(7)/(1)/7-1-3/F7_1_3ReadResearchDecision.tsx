'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F7_1_3CreateResearchDecision from "./F7_1_3CreateResearchDecision";
import F7_1_3DeleteResearchDecision from "./F7_1_3DeleteResearchDecision";
import F7_1_3UpdateResearchDecision from "./F7_1_3UpdateResearchDecision";

export interface I7_1_3DecisionData {
    promulgateDate: string | number | Date;
    id: number;
    decisionNumber?: string;
    decisionDate?: Date;
    decisonName?: string;
    decisionFile?: string;
}

export default function F7_1_3ReadResearchDecision() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_1_3DecisionData[]>({
        queryKey: ["F7_1_3ReadResearchDecision"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_1_3DecisionData>[]>(
        () => [
            {
                header: "Số quyết định",
                accessorKey: "decisionNumber"
            },
            {
                header: "Ngày quyết định",
                accessorKey: "decisionDate",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!))
            },
            {
                header: "Tên quyết định",
                accessorKey: "decisonName"
            },
            {
                header: "File quyết định",
                accessorKey: "decisionFile",
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />;
                },
            },

        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách Quyết định Danh mục đề xuất định hướng </Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_1_3CreateResearchDecision />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_1_3UpdateResearchDecision values={row.original} />
                            <F7_1_3DeleteResearchDecision id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}

const data: I7_1_3DecisionData[] = [
    {
        id: 1,
        promulgateDate: "2024-11-01",
        decisionNumber: "QD001",
        decisonName: "Quyết định 001",
        decisionFile: "decision1.pdf",
    },
    {
        id: 2,
        promulgateDate: "2024-11-15",
        decisionNumber: "QD002",
        decisonName: "Quyết định 002",
        decisionFile: "decision2.pdf",
    },
    {
        id: 3,
        promulgateDate: "2024-11-29",
        decisionNumber: "QD003",
        decisonName: "Quyết định 003",
        decisionFile: "decision3.pdf",
    },
];



