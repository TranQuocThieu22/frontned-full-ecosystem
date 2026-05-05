'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F8_2_2CheckWorkshopRegistrationCheck from "./F8_2_2CheckWorkshopRegistrationCheck";

export interface I8_2_2WorkshopRegistrationCheck {
    name?: string; // Tên hội nghị hội thảo
    hostUnit?: string; // Đơn vị chủ trì
    organizingUnit?: string; // Đơn vị tổ chức
    coordinatingUnit?: string; // Đơn vị phối hợp
    numberOfDelegates?: number; // Số lượng đại biểu dự kiến
    content?: string; // Nội dung hội nghị hội thảo
    time?: string; // Thời gian thực hiện
    address?: string; // Địa điểm tổ chức
    expense?: number; // Tổng kinh phí
    status?: string; // Trạng thái kiểm tra
    comment?: string; // Nhận xét kiểm tra
}

export default function ReadTemplate() {
    const query = useQuery<I8_2_2WorkshopRegistrationCheck[]>({
        queryKey: [`WorkshopRegistrationCheck`],
        queryFn: async () => [
            {
                name: "Hội thảo Công nghệ Xanh",
                hostUnit: "Bộ Khoa học và Công nghệ",
                organizingUnit: "Đại học Bách Khoa",
                coordinatingUnit: "Viện Nghiên cứu Môi trường",
                numberOfDelegates: 300,
                content: "Thảo luận về các giải pháp công nghệ xanh trong sản xuất.",
                time: "15/01/2025",
                address: "Hà Nội",
                expense: 120000000,
                status: "Đã kiểm tra",
                comment: "Đáp ứng đầy đủ các yêu cầu kiểm tra.",
            },
            {
                name: "Hội thảo Kinh tế Số",
                hostUnit: "Viện Kinh tế Việt Nam",
                organizingUnit: "Học viện Tài chính",
                coordinatingUnit: "Trường Đại học Thương mại",
                numberOfDelegates: 250,
                content: "Phân tích xu hướng phát triển kinh tế số tại Việt Nam.",
                time: "10/02/2025",
                address: "TP. Hồ Chí Minh",
                expense: 95000000,
                status: "Chờ kiểm tra",
                comment: "Chưa hoàn thiện các tài liệu cần thiết.",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I8_2_2WorkshopRegistrationCheck>[]>(() => [
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
            header: "File đăng ký",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        },
        {
            header: "File kế hoạch",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        },
        {
            header: "Thao tác",
            accessorFn: () =>
                <F8_2_2CheckWorkshopRegistrationCheck />
        },
        {
            header: "Trạng thái kiểm tra",
            accessorKey: "status",
        },
        {
            header: "Nhận xét kiểm tra",
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
