'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeleteReviewCommitteeMembersOutline from './F6_2_3_1DeleteReviewCommitteeMembersOutline';
import FeatUpdateReviewCommitteeMembersOutline from './F6_2_3_1UpdateReviewCommitteeMembersOutline';
export interface IReviewCommitteeMembersOutline {
    id?: number;
    code?: string; // Số quyết định
    date?: string; // Ngày quyết định
    decisionName?: string; // Tên quyết định
    topicName?: string; // Tên đề tài
    groupName?: string; // Tên nhóm nghiên cứu
    leaderName?: string; // Trưởng nhóm
    telephone?: string; // Số điện thoại
    email?: string; // Email
}

export default function ReadReviewCommitteeMembersOutline() {
    const query = useQuery<IReviewCommitteeMembersOutline[]>({
        queryKey: [`ReadReviewCommitteeMembersOutline`],
        queryFn: async () => [
            {
                code: "QD/KT001",
                date: "01/01/2000",
                decisionName: "V/v Xác định danh sách đề xuất đề tài NCKH định hướng",
                topicName: "Đề tài A",
                groupName: "Nhóm A KHTN",
                leaderName: "Nguyễn Văn A",
                telephone: "0986536845",
                email: "A@example.com",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<IReviewCommitteeMembersOutline>[]>(() => [
        {
            header: "Số quyết định",
            accessorKey: "code",
        },
        {
            header: "Ngày quyết định",
            accessorKey: "date",
            Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString("vi-VN"),
        },
        {
            header: "Tên quyết định",
            accessorKey: "decisionName",
        },
        {
            header: "Tên đề tài",
            accessorKey: "topicName",
        },
        {
            header: "Tên nhóm nghiên cứu",
            accessorKey: "groupName",
        },
        {
            header: "Trưởng nhóm",
            accessorKey: "leaderName",
        },
        {
            header: "Số điện thoại",
            accessorKey: "telephone",
        },
        {
            header: "Email",
            accessorKey: "email",
            Cell: ({ cell }) => <a href={`mailto:${cell.getValue<string>()}`}>{cell.getValue<string>()}</a>,
        },
        {
            header: "File quyết định",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <FeatUpdateReviewCommitteeMembersOutline values={row.original} />
                        <FeatDeleteReviewCommitteeMembersOutline id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
