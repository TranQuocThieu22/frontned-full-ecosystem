'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

import F6_1_6Create from "./F6_1_6Create";
import F6_1_6Delete from "./F6_1_6Delete";
import F6_1_6Update from "./F6_1_6Update";

export interface I6_1_6Decision {
    promulgateDate: string | number | Date;
    id: number; // Unique identifier
    decisionNumber: string; // Decision number
    decidedDate: Date; // Decision date
    decisionName: string; // Name of the decision
    groupName: string; // Research group name
    file: string; // File path for the decision document
}

export default function F6_1_6Read() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_1_6Decision[]>({
        queryKey: ["F6_1_6Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_1_6Decision>[]>(() => [
        { header: "Số quyết định", accessorKey: "decisionNumber" },
        { header: "Ngày quyết định", accessorKey: "decidedDate", accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!)) },
        { header: "Tên quyết định", accessorKey: "decisionName" },
        { header: "Tên nhóm nghiên cứu", accessorKey: "groupName" },
        {
            header: "File quyết định",
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
            <Text>Danh sách Quyết định Thành lập nhóm nghiên cứu</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F6_1_6Create />}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F6_1_6Update values={row.original} />
                        <F6_1_6Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const data: I6_1_6Decision[] = [
    {
        id: 1,
        decisionNumber: "QD001",
        decidedDate: new Date("2024-10-10"), // Corrected to Date object
        decisionName: "Thành lập hội đồng AI",
        groupName: "Nhóm nghiên cứu AI",
        file: "ai_decision.pdf",
        promulgateDate: new Date("2024-10-10")
    },
    {
        id: 2,
        decisionNumber: "QD002",
        decidedDate: new Date("2024-10-10"), // Corrected to Date object
        decisionName: "Thành lập hội đồng Blockchain",
        groupName: "Nhóm nghiên cứu Blockchain",
        file: "blockchain_decision.pdf",
        promulgateDate: new Date("2024-10-10")
    },
    {
        id: 3,
        decisionNumber: "QD003",
        decidedDate: new Date("2024-10-15"), // Corrected to Date object
        decisionName: "Thành lập hội đồng Công nghệ Sinh học",
        groupName: "Nhóm nghiên cứu Công nghệ Sinh học",
        file: "biotech_decision.pdf",
        promulgateDate: new Date("2024-10-15")
    },
];