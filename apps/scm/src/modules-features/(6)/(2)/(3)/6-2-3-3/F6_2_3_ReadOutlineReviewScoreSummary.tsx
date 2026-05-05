'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatUpdateOutlineReviewScoreSummary from './F6_2_3_3UpdateOutlineReviewScoreSummary';
import FeatDeleteOutlineReviewScoreSummary from './F6_2_3_DeleteOutlineReviewScoreSummary';
export interface IOutlineReviewScoreSummary {
    id?: number; // Số thứ tự
    decisionNumber?: string; // Số quyết định hội đồng xét duyệt đề cương
    code?: string; // Mã đề tài
    topicName?: string; // Tên đề tài
    groupName?: string; // Tên nhóm nghiên cứu
    leaderName?: string; // Trưởng nhóm
    point?: number; // Điểm trung bình
}

export default function F6_2_3_ReadOutlineReviewScoreSummary() {
    const query = useQuery<IOutlineReviewScoreSummary[]>({
        queryKey: [`F6_2_3_ReadOutlineReviewScoreSummary`],
        queryFn: async () => [
            {
                id: 1,
                decisionNumber: "QT-1234",
                code: "DT00001",
                topicName: "Đổi mới giáo dục đại học",
                groupName: "Nhóm A KHTN",
                leaderName: "Nguyễn Văn A",
                point: 80,
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<IOutlineReviewScoreSummary>[]>(() => [
        {
            header: "Số quyết định hội đồng xét duyệt đề cương",
            accessorKey: "decisionNumber",
        },
        {
            header: "Mã đề tài",
            accessorKey: "code",
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
            header: "Điểm trung bình",
            accessorKey: "point",
            Cell: ({ cell }) => `${cell.getValue<number>().toFixed(2)}`, // Hiển thị điểm trung bình với 2 chữ số thập phân
        },
        {
            header: "File biên bản",
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
                        <FeatUpdateOutlineReviewScoreSummary values={row.original} />
                        <FeatDeleteOutlineReviewScoreSummary id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
