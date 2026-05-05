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
import F6_2_3_2Create from "./F6_2_3_2Create";
import F6_2_3_2Delete from "./F6_2_3_2Delete";
import F6_2_3_2Update from "./F6_2_3_2Update";

export interface I6_2_3_2Read {
    promulgateDate: string | number | Date;
    id: number; // Unique identifier
    researchNumber: string; // Research project number
    researchName: string; // Research project name
    field: string; // Research field
    groupName: string; // Research group name
    leader: string; // Research group leader
    phoneNumber: string; // Leader's phone number
    email: string; // Leader's email
    estimateCost: string; // Estimated cost
    estimateTime: string; // Estimated time
    marker: string; // Evaluator's name
    markedDate: Date; // Evaluation date
    totalMark: number; // Total marks
    comment: string; // Comment or feedback
    file: string; // Path to the evaluation file
}

export default function F6_2_3_2Read() {

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I6_2_3_2Read[]>({
        queryKey: ["F6_2_1Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I6_2_3_2Read>[]>(() => [
        { header: "Mã đề tài", accessorKey: "researchNumber" },
        { header: "Tên đề tài", accessorKey: "researchName" },
        { header: "Tên nhóm nghiên cứu", accessorKey: "groupName" },
        { header: "Trưởng nhóm", accessorKey: "leader" },
        {
            header: "Người đánh giá",
            accessorKey: "marker",
            size: 200
        },
        {
            header: "Ngày đánh giá",
            accessorKey: "markedDate", accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.promulgateDate!)),
            size: 200
        },
        {
            header: "Tổng điểm",
            accessorKey: "totalMark",
        },
        {
            header: "Nhận xét",
            accessorKey: "comment",
        },
        {
            header: "File đánh giá",
            accessorKey: "file",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
        }
    ], []);

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <Text>Danh sách thù lao đã thanh toán</Text>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data || []}
                renderTopToolbarCustomActions={() => <F6_2_3_2Create />}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F6_2_3_2Update values={row.original} />
                        <F6_2_3_2Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </MyFlexColumn>
    );
}

const data: I6_2_3_2Read[] = [
    {
        id: 1,
        researchNumber: "RS001",
        researchName: "Nghiên cứu AI trong giáo dục",
        field: "Khoa học máy tính",
        groupName: "Nhóm nghiên cứu AI",
        leader: "Nguyen Van A",
        phoneNumber: "0123456789",
        email: "nguyenvana@example.com",
        estimateCost: "500,000,000 VND",
        estimateTime: "12 tháng",
        marker: "Dr. Pham Van B",
        markedDate: new Date("2024-01-10"),
        totalMark: 85,
        comment: "Đề tài có tính khả thi cao.",
        file: "ai_research.pdf",
        promulgateDate: new Date("2024-01-10"),
    },
    {
        id: 2,
        researchNumber: "RS002",
        researchName: "Blockchain trong chuỗi cung ứng",
        field: "Công nghệ thông tin",
        groupName: "Nhóm nghiên cứu Blockchain",
        leader: "Le Thi B",
        phoneNumber: "0987654321",
        email: "lethib@example.com",
        estimateCost: "750,000,000 VND",
        estimateTime: "18 tháng",
        marker: "Dr. Nguyen Van C",
        markedDate: new Date("2024-01-15"),
        totalMark: 90,
        comment: "Đề tài có tiềm năng ứng dụng tốt.",
        file: "blockchain_research.pdf",
        promulgateDate: new Date("2024-01-10"),

    },
    {
        id: 3,
        researchNumber: "RS003",
        researchName: "Công nghệ sinh học trong y học",
        field: "Công nghệ sinh học",
        groupName: "Nhóm nghiên cứu Công nghệ Sinh học",
        leader: "Tran Van C",
        phoneNumber: "0345678912",
        email: "tranvanc@example.com",
        estimateCost: "1,000,000,000 VND",
        estimateTime: "24 tháng",
        marker: "Dr. Tran Thi D",
        markedDate: new Date("2024-01-20"),
        totalMark: 88,
        comment: "Đề tài có tiềm năng nghiên cứu sâu hơn.",
        file: "biotech_research.pdf",
        promulgateDate: new Date("2024-01-10"),

    },
];