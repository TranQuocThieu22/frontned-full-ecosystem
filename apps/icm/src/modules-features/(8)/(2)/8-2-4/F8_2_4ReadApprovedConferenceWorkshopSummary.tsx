'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface I8_2_4ApprovedConferenceWorkshopSummary {
    name?: string; // Tên hội nghị hội thảo
    hostUnit?: string; // Đơn vị chủ trì
    organizingUnit?: string; // Đơn vị tổ chức
    coordinatingUnit?: string; // Đơn vị phối hợp
    numberOfDelegates?: number; // Số lượng đại biểu dự kiến
    content?: string; // Nội dung hội nghị hội thảo
    time?: string; // Thời gian thực hiện
    address?: string; // Địa điểm tổ chức
    expense?: number; // Tổng kinh phí

    comment?: string; // Nhận xét kiểm tra
}

export default function F8_2_4ReadApprovedConferenceWorkshopSummary() {
    const query = useQuery<I8_2_4ApprovedConferenceWorkshopSummary[]>({
        queryKey: [`ApprovalEventPlanAndBudget`],
        queryFn: async () => [
            {
                name: "Nâng cao chất lượng dạy học",
                hostUnit: "Khoa công nghệ thông tin",
                organizingUnit: "NLU",
                coordinatingUnit: "VLU",
                numberOfDelegates: 75,
                content: "Trình bày giải pháp ứng dụng AI trong giáo dục đại học.",
                time: "01/01/2024",
                address: "NLU Phượng Vĩ",
                expense: 150000000,
                comment: "Hồ sơ đạt yêu cầu",

            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I8_2_4ApprovedConferenceWorkshopSummary>[]>(() => [
        {
            header: "Tên hội nghị hội thảo",
            accessorKey: "name",
        },
        {
            header: "Đơn vị chủ trì",
            accessorKey: "hostUnit",
        },
        {
            header: "Đơn vị tổ chức",
            accessorKey: "organizingUnit",
        },
        {
            header: "Đơn vị phối hợp",
            accessorKey: "coordinatingUnit",
        },
        {
            header: "Số lượng đại biểu dự kiến",
            accessorKey: "numberOfDelegates",
        },
        {
            header: "Nội dung hội nghị hội thảo",
            accessorKey: "content",
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "time",
        },
        {
            header: "Địa điểm tổ chức",
            accessorKey: "address",
        },
        {
            header: "Tổng kinh phí",
            accessorKey: "expense",
            Cell: ({ cell }) => cell.getValue<number>()?.toLocaleString("vi-VN"),
        },
        {
            header: "File kế hoạch",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        },
        {
            header: "Duyệt",
            accessorFn: () =>
                <Checkbox />
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
