'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_5_4VoteMidtermProgressReportApproval from "./F5_5_4VoteMidtermProgressReportApproval";

export interface I5_5_4MidtermProgressReportApproval {
    id?: number; // STT
    code?: string; // Mã đề tài
    topicName?: string; // Tên đề tài
    leaderName?: string; // Chủ nhiệm
    time?: string; // Thời gian thực hiện
    percentComplete?: number; // % hoàn thành
    expense?: number; // Kinh phí đã chi
    comment?: string; // Nhận xét
}

export default function ReadTemplate() {
    const query = useQuery<I5_5_4MidtermProgressReportApproval[]>({
        queryKey: [`F5_5_4ReadMidtermProgressReportApproval`],
        queryFn: async () => [
            {
                id: 1,
                code: "DT00001",
                topicName: "Đổi mới phương pháp giáo dục",
                leaderName: "Nguyễn Văn A",
                time: "11 tháng",
                percentComplete: 60,
                expense: 580000000,
                comment: "Đúng tiến độ.",
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I5_5_4MidtermProgressReportApproval>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "code",
        },
        {
            header: "Tên đề tài",
            accessorKey: "topicName",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "leaderName",
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "time",
        },
        {
            header: "% Hoàn thành",
            accessorKey: "percentComplete",
            Cell: ({ cell }) => `${cell.getValue<number>()}%`,
        },
        {
            header: "Kinh phí đã chi (VNĐ)",
            accessorKey: "expense",
            Cell: ({ cell }) => {
                const expense = cell.getValue<number>();
                return expense.toLocaleString("vi-VN");
            },
        },
        {
            header: "File báo cáo",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        },
        {
            header: "Thao tác",
            accessorFn: () =>
                <F5_5_4VoteMidtermProgressReportApproval />
        },
        {
            header: "Nhận xét",
            accessorKey: "comment",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
        />
    );
}
