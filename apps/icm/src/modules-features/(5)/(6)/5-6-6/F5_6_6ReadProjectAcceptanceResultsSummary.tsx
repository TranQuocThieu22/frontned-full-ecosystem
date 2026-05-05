'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface IProjectAcceptanceResultsSummary {
    id?: number; // STT
    topicName?: string; // Tên đề tài
    field?: string; // Lĩnh vực
    leader?: string; // Chủ nhiệm
    collaborationUnit?: string; // Đơn vị cộng tác
    expense?: number; // Kinh phí
    time?: string; // Thời gian
    point?: number; // Điểm trung bình
    rank?: string; // Xếp loại
}

export default function ReadTemplate() {
    const query = useQuery<IProjectAcceptanceResultsSummary[]>({
        queryKey: [`ProjectAcceptanceResultsSummary`],
        queryFn: async () => [
            {
                id: 1,
                topicName: "Đổi mới phương pháp giáo dục",
                field: "Khoa học tự nhiên",
                leader: "Nguyễn Văn A",
                collaborationUnit: "Khoa Tự Nhiên",
                expense: 150000000,
                time: "11 tháng",
                point: 80,
                rank: "Giỏi",
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<IProjectAcceptanceResultsSummary>[]>(() => [
        {
            header: "Tên đề tài",
            accessorKey: "topicName",
        },
        {
            header: "Lĩnh vực",
            accessorKey: "field",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "leader",
        },
        {
            header: "Đơn vị cộng tác",
            accessorKey: "collaborationUnit",
        },
        {
            header: "Kinh phí (VNĐ)",
            accessorKey: "expense",
            Cell: ({ cell }) => cell.getValue<number>()?.toLocaleString("vi-VN"),
        },
        {
            header: "Thời gian",
            accessorKey: "time",
        },
        {
            header: "Điểm trung bình",
            accessorKey: "point",
        },
        {
            header: "Xếp loại",
            accessorKey: "rank",
        },
        {
            header: "File thuyết minh hoàn thiện cấp trường",
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
        />
    );
}

