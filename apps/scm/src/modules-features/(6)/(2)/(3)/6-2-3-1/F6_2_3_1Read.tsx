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

import F6_2_3_1Create from "./F6_2_3_1Create";
import F6_2_3_1Delete from "./F6_2_3_1Delete";
import F6_2_3_1UpdateDecision from "./F6_2_3_1UpdateDecision";

export interface I6_2_3_1Decision {
    promulgateDate: string | number | Date;
    id: number; // Unique identifier
    decisionNumber: string; // Decision number
    decidedDate: Date; // Decision date
    decisionName: string; // Name of the decision
    researchName: string; // Research project name
    groupName: string; // Research group name
    leader: string; // Leader of the group
    phoneNumber: string; // Leader's phone number
    email: string; // Leader's email
    file: string; // Path to the decision file
}

export default function F6_2_3_1Read() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_2_3_1Decision[]>({
        queryKey: ["F6_2_3_1Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_2_3_1Decision>[]>(() => [
        {
            header: "Số quyết định",
            accessorKey: "decisionNumber"
        },
        {
            header: "Ngày quyết định",
            accessorKey: "decidedDate", accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!))
        },
        {
            header: "Tên quyết định",
            accessorKey: "decisionName"
        },
        {
            header: "Tên đề tài",
            accessorKey: "researchName"
        },
        {
            header: "Tên nhóm nghiên cứu",
            accessorKey: "groupName"
        },
        {
            header: "Trưởng nhóm",
            accessorKey: "leader"
        }, {
            header: "Số điện thoại",
            accessorKey: "phoneNumber"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: "File quyết định",
            accessorKey: "file",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
        },
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Danh sách Quyết định Thành lập hội đồng nghiệm xét duyệt đề cương/ thuyết minh</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F6_2_3_1Create />}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F6_2_3_1UpdateDecision values={row.original} />
                        <F6_2_3_1Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const data: I6_2_3_1Decision[] = [
    {
        id: 1,
        decisionNumber: "QD001",
        decidedDate: new Date("2024-10-10"),
        decisionName: "Thành lập hội đồng AI",
        researchName: "Nghiên cứu AI trong Giáo dục",
        groupName: "Nhóm nghiên cứu AI",
        leader: "Nguyen Van A",
        phoneNumber: "0123456789",
        email: "nguyenvana@example.com",
        file: "ai_decision.pdf",
        promulgateDate: new Date("2024-10-10"),
    },
    {
        id: 2,
        decisionNumber: "QD002",
        decidedDate: new Date("2024-10-15"),
        decisionName: "Thành lập hội đồng Blockchain",
        researchName: "Blockchain trong Chuỗi cung ứng",
        groupName: "Nhóm nghiên cứu Blockchain",
        leader: "Le Thi B",
        phoneNumber: "0987654321",
        email: "lethib@example.com",
        file: "blockchain_decision.pdf",
        promulgateDate: new Date("2024-10-10"),

    },
    {
        id: 3,
        decisionNumber: "QD003",
        decidedDate: new Date("2024-10-20"),
        decisionName: "Thành lập hội đồng Công nghệ Sinh học",
        researchName: "Công nghệ Sinh học trong Y học",
        groupName: "Nhóm nghiên cứu Công nghệ Sinh học",
        leader: "Tran Van C",
        phoneNumber: "0345678912",
        email: "tranvanc@example.com",
        file: "biotech_decision.pdf",
        promulgateDate: new Date("2024-10-10"),

    },
];