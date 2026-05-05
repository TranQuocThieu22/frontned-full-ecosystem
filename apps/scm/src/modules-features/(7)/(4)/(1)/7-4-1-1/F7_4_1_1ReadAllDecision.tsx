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
import F7_4_1_1CreateDecision from "./F7_4_1_1CreateDecision";
import F7_2_2_1DeleteConfirmation from "./F7_4_1_1DeleteDecision";
import F7_2_2_1UpdateConfirmation from "./F7_4_1_1UpdateDecision";

export interface I7_4_1_1Decision {
    promulgateDate: string | number | Date;
    id: number;
    decisionNumber?: string;
    decisionDate?: Date;
    decisionName?: string;
    reseacrhName?: string;
    decisionFile: string;
}

export default function F7_4_1_1ReadAllDecision() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I7_4_1_1Decision[]>({
        queryKey: ["F7_4_1_1ReadAllDecision"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I7_4_1_1Decision>[]>(
        () => [
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
                header: "Tên đề tài",
                accessorKey: "reseacrhName", // Maps to 'reseacrhName' field in the interface
            },
            {
                header: "File quyết định",
                accessorKey: "decisionFile", // Maps to 'decisionFile' field in the interface
                Cell: ({ cell }) => {
                    return <MyButtonViewPDF />; // Renders PDF viewer button
                },
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyFlexColumn>
            <Text>Danh sách Quyết định Thành lập hội đồng nghiệm thu đề tài cấp trường</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F7_4_1_1CreateDecision />}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F7_2_2_1UpdateConfirmation values={row.original} />
                            <F7_2_2_1DeleteConfirmation id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    )
}


const data: I7_4_1_1Decision[] = [
    {
        id: 1,
        decisionNumber: "QD001",
        decisionDate: new Date("2024-10-01"),  // Example date
        decisionName: "Quyết định 1",
        reseacrhName: "Nghiên cứu A",
        promulgateDate: new Date("2024-10-01"),  // Example promulgate date
        decisionFile: "decision1.pdf",
    },
    {
        id: 2,
        decisionNumber: "QD002",
        decisionDate: new Date("2024-10-10"),  // Example date
        decisionName: "Quyết định 2",
        reseacrhName: "Nghiên cứu B",
        promulgateDate: new Date("2024-10-10"),  // Example promulgate date
        decisionFile: "decision2.pdf",
    },
    {
        id: 3,
        decisionNumber: "QD003",
        decisionDate: new Date("2024-10-15"),  // Example date
        decisionName: "Quyết định 3",
        reseacrhName: "Nghiên cứu C",
        promulgateDate: new Date("2024-10-15"),  // Example promulgate date
        decisionFile: "decision3.pdf",
    },
];