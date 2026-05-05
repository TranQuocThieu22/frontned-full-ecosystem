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
import F6_1_3Create from "./F6_1_3Create";
import F6_1_3Delete from "./F6_1_3Delete";
import F6_1_3UpdateDecision from "./F6_1_3UpdateDecision";

export interface I6_1_3Decision {
    promulgateDate: string | number | Date;
    id: number; // Unique identifier
    decisionNumber: string; // Decision number
    decidedDate: Date; // Decision date
    decisionName: string; // Name of the decision
    groupName: string; // Research group name
    file: string; // File path for the decision document
}

export default function F6_1_3Read() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_1_3Decision[]>({
        queryKey: ["F6_1_3Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_1_3Decision>[]>(() => [
        { header: "Số quyết định", accessorKey: "decisionNumber", size: 170 },
        {
            header: "Ngày quyết định", accessorKey: "decidedDate", accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!))
            , size: 200
        },
        { header: "Tên quyết định", accessorKey: "decisionName", size: 270 },
        { header: "Tên nhóm nghiên cứu", accessorKey: "groupName", size: 270 },
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
            <Text>Danh sách Quyết định Thành lập hội đồng xét chọn nhóm nghiên cứu</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F6_1_3Create />}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F6_1_3UpdateDecision values={row.original} />
                        <F6_1_3Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const data: I6_1_3Decision[] = [
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