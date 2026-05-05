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
import F7_2_7CreateResearchDecision from "./F7_2_7CreateResearchDecision";
import F7_2_7DeleteResearchDecision from "./F7_2_7DeleteResearchDecision";
import F7_2_7UpdateResearchDecision from "./F7_2_7UpdateResearchDecision";

export interface I7_2_7ResearchDecision {
    promulgateDate: string | number | Date;
    id: number;
    decisionNumber: string;
    decisionDate: Date;
    decisionName: string;
    totalCost: string;
    decisionFile: string;
}

export default function F7_2_7ReadResearchDecision() {
    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_2_7ResearchDecision[]>({
        queryKey: ["F7_2_7ReadResearchDecision"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_2_7ResearchDecision>[]>(() => [
        {
            header: "Số quyết định",
            accessorKey: "decisionNumber", // Maps to 'decisionNumber' field in the interface
        },
        {
            header: "Ngày quyết định",
            accessorKey: "decisionDate",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!))

        },
        {
            header: "Tên quyết định",
            accessorKey: "decisionName", // Maps to 'decisionName' field in the interface
        },
        {
            header: "Tổng kinh phí",
            accessorKey: "totalCost", // Maps to 'totalCost' field in the interface
        },
        {
            header: "File quyết định",
            accessorKey: "decisionFile", // Maps to 'decisionFile' field in the interface
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
        },
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";
    return (
        <MyFlexColumn>
            <Text>Danh sách Quyết định giao đề tài </Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_2_7CreateResearchDecision />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_2_7UpdateResearchDecision values={row.original} />
                            <F7_2_7DeleteResearchDecision id={row.original.id!} />
                        </MyCenterFull>
                    );
                }}
            />
        </MyFlexColumn>
    );
}

const data: I7_2_7ResearchDecision[] = [
    {
        id: 1,
        decisionNumber: "QD001",
        promulgateDate: "2024-06-15", // Consistent field
        decisionDate: new Date("2024-06-15"), // Added consistent date field
        decisionName: "Phê duyệt đề tài nghiên cứu AI trong Y tế",
        totalCost: "120,000,000 VND",
        decisionFile: "decision_ai_healthcare.pdf",
    },
    {
        id: 2,
        decisionNumber: "QD002",
        promulgateDate: "2024-07-20", // Added missing promulgateDate field
        decisionDate: new Date("2024-07-20"), // Added consistent date field
        decisionName: "Phê duyệt đề tài nghiên cứu Blockchain",
        totalCost: "150,000,000 VND",
        decisionFile: "decision_blockchain.pdf",
    },
    {
        id: 3,
        decisionNumber: "QD003",
        promulgateDate: "2024-08-10", // Consistent field
        decisionDate: new Date("2024-08-10"), // Added consistent date field
        decisionName: "Phê duyệt đề tài nghiên cứu Phân tích Dữ liệu",
        totalCost: "90,000,000 VND",
        decisionFile: "decision_data_analysis.pdf",
    },
];
