'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

import { U0DateToDDMMYYYString } from "@/utils/date";
import F6_1_4Create from "./F6_1_4Create";
import F6_1_4Delete from "./F6_1_4Delete";
import F6_1_4Update from "./F6_1_4Update";

export interface I6_1_4Decision {
    promulgateDate: string | number | Date;
    id: number; // Unique identifier
    decisionNumber: string; // Decision number
    decisionDate: Date; // Meeting date
    location: string; // Meeting location
    totalNumber: number; // Total members
    attended: number; // Members attended
    groupName: string; // Research group name
    qualify: string; // Evaluation result
    comment: string; // Conclusion/comment
    file: string; // File path for the meeting minutes
}
export default function F6_1_4Read() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_1_4Decision[]>({
        queryKey: ["F6_1_4Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_1_4Decision>[]>(() => [
        { header: "Số quyết định", accessorKey: "decisionNumber", size: 200 },
        {
            header: "Ngày họp", accessorKey: "decisionDate",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!))
        },
        { header: "Địa điểm", accessorKey: "location" },
        { header: "Tổng số thành viên", accessorKey: "totalNumber", size: 250 },
        { header: "Có mặt", accessorKey: "attended" },
        { header: "Tên nhóm nghiên cứu", accessorKey: "groupName", size: 250 },
        { header: "Đánh giá", accessorKey: "qualify" },
        { header: "Kết luận", accessorKey: "comment" },
        {
            header: "File biên bản",
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
            <Text>Danh sách biên bản hội đồng xét chọn nhóm nghiên cứu</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F6_1_4Create />}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F6_1_4Update values={row.original} />
                        <F6_1_4Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const data: I6_1_4Decision[] = [
    {
        id: 1,
        decisionNumber: "QD001",
        decisionDate: new Date("2024-10-01"), // Meeting date
        location: "Phòng họp 1, Tòa nhà A",
        totalNumber: 15,
        attended: 14,
        groupName: "Nhóm nghiên cứu AI",
        qualify: "Đạt yêu cầu",
        comment: "Hội đồng đã phê duyệt đề tài với điểm cao.",
        file: "meeting_minutes_ai.pdf",
        promulgateDate: new Date("2024-10-01")
    },
    {
        id: 2,
        decisionNumber: "QD002",
        decisionDate: new Date("2024-10-10"), // Meeting date
        location: "Phòng họp 2, Tòa nhà B",
        totalNumber: 12,
        attended: 10,
        groupName: "Nhóm nghiên cứu Blockchain",
        qualify: "Đạt yêu cầu",
        comment: "Đề tài cần bổ sung tài liệu chi tiết.",
        file: "meeting_minutes_blockchain.pdf",
        promulgateDate: new Date("2024-10-10")
    },
    {
        id: 3,
        decisionNumber: "QD003",
        decisionDate: new Date("2024-10-15"), // Meeting date
        location: "Phòng họp 3, Tòa nhà C",
        totalNumber: 10,
        attended: 9,
        groupName: "Nhóm nghiên cứu Công nghệ Sinh học",
        qualify: "Không đạt yêu cầu",
        comment: "Đề tài chưa đủ điều kiện triển khai.",
        file: "meeting_minutes_biotech.pdf",
        promulgateDate: new Date("2024-10-15")
    },
];