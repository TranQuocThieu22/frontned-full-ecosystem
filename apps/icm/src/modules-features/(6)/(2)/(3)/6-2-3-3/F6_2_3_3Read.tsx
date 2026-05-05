'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

import F6_2_3_3Create from "./F6_2_3_3Create";
import F6_2_3_3Delete from "./F6_2_3_3Delete";
import F6_2_3_3UpdateDecision from "./F6_2_3_3UpdateDecision";

export interface I6_2_3_3Decision {
    id: number; // Unique identifier
    decisionNumber: string; // Decision number
    researchId: string; // Research project ID
    researchTitle: string; // Research project title
    researchGroupName: string; // Research group name
    leaderName: string; // Leader of the group
    averageScore: number; // Average score
    minutesFile: string; // Path to the meeting minutes file
    decidedDate: Date; // Decision date
}

export default function F6_2_3_3Read() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_2_3_3Decision[]>({
        queryKey: ["F6_2_3_3Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_2_3_3Decision>[]>(() => [
        {
            header: "Số quyết định hội đồng xét duyệt đề cương",
            accessorKey: "decisionNumber",
            size: 300
        },
        {
            header: "Mã đề tài",
            accessorKey: "researchId",
        },
        {
            header: "Tên đề tài",
            accessorKey: "researchTitle",
            size: 200
        },
        {
            header: "Tên nhóm nghiên cứu",
            accessorKey: "researchGroupName",
            size: 270
        },
        {
            header: "Trưởng nhóm",
            accessorKey: "leaderName",
            size: 200
        },
        {
            header: "Điểm trung bình",
            accessorKey: "averageScore",
            size: 230,
        },
        {
            header: "File biên bản",
            accessorKey: "minutesFile",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
            size: 230
        }
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Danh sách biên bản tổng hợp kiểm phiếu đánh giá</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F6_2_3_3Create />}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F6_2_3_3UpdateDecision values={row.original} />
                        <F6_2_3_3Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}
const data: I6_2_3_3Decision[] = [
    {
        id: 1,
        decisionNumber: "QD001",
        researchId: "RS001",
        researchTitle: "AI Research in Education",
        researchGroupName: "AI Research Group",
        leaderName: "Nguyen Van A",
        averageScore: 8.5,
        minutesFile: "ai_decision.pdf",
        decidedDate: new Date("2024-10-10"),
    },
    {
        id: 2,
        decisionNumber: "QD002",
        researchId: "RS002",
        researchTitle: "Blockchain in Supply Chains",
        researchGroupName: "Blockchain Research Group",
        leaderName: "Le Thi B",
        averageScore: 8.8,
        minutesFile: "blockchain_decision.pdf",
        decidedDate: new Date("2024-10-15"),
    },
    {
        id: 3,
        decisionNumber: "QD003",
        researchId: "RS003",
        researchTitle: "Biotechnology in Medicine",
        researchGroupName: "Biotechnology Research Group",
        leaderName: "Tran Van C",
        averageScore: 7.9,
        minutesFile: "biotech_decision.pdf",
        decidedDate: new Date("2024-10-20"),
    },
];