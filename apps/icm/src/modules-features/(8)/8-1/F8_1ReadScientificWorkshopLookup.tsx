'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface IScientificWorkshopLookup {
    id?: number; // STT
    name?: string; // Tên hội nghị hội thảo
    organizingUnit?: string; // Đơn vị tổ chức
    coordinatingUnit?: string; // Đơn vị phối hợp
    numberOfDelegates?: number; // Số lượng đại biểu dự kiến
    content?: string; // Nội dung hội nghị hội thảo
    time?: string; // Thời gian thực hiện
    address?: string; // Địa điểm tổ chức
    expense?: number; // Tổng kinh phí
    fundingSource?: string; // Nguồn kinh phí
    status?: string; // Trạng thái
}

export default function F8_1ReadScientificWorkshopLookup() {
    const query = useQuery<IScientificWorkshopLookup[]>({
        queryKey: [`ScientificWorkshopLookup`],
        queryFn: async () => [
            {
                name: "Nâng cao chấy lượng dạy học",
                organizingUnit: "NLU",
                coordinatingUnit: "VLU",
                numberOfDelegates: 75,
                content: "Trình bày giải pháp ứng dụng AI trong giáo dục đại học",
                time: "01/01/2024",
                address: "NLU Phượng Vĩ",
                expense: 15000000,
                fundingSource: "NLU",
                status: "Đã tổ chức",
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<IScientificWorkshopLookup>[]>(() => [
        {
            header: "Tên hội nghị hội thảo",
            accessorKey: "name",
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
            header: "Tổng kinh phí (VNĐ)",
            accessorKey: "expense",
            Cell: ({ cell }) => cell.getValue<number>()?.toLocaleString("vi-VN"),
        },
        {
            header: "Nguồn kinh phí",
            accessorKey: "fundingSource",
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
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
