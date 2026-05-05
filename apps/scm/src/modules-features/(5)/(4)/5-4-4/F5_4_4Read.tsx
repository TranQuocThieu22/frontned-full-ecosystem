'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_4_4Create from "./F5_4_4Create";
import F5_4_4Delete from "./F5_4_4Delete";
import F5_4_4Update from "./F5_4_4Update";

interface I {
    id?: number;
    soQuyetDinh?: string;
    chuTich?: string;
    tongTien?: number;
    fileThanhToanSrc?: string;
}

export default function F5_4_4Read() {
    const query = useQuery<I[]>({
        queryKey: [`F5_4_4Read`],
        queryFn: async () => [
            {
                id: 1,
                soQuyetDinh: "QD-001",
                chuTich: "Nguyễn Văn A",
                tongTien: 5000000,
                fileThanhToanSrc: "/files/thanh-toan-1.pdf",
            },
            {
                id: 2,
                soQuyetDinh: "QD-002",
                chuTich: "Trần Thị B",
                tongTien: 10000000,
                fileThanhToanSrc: "/files/thanh-toan-2.pdf",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Số quyết định",
            accessorKey: "soQuyetDinh",
        },
        {
            header: "Chủ tịch",
            accessorKey: "chuTich",
        },
        {
            header: "Tổng tiền",
            accessorKey: "tongTien",
        },
        {
            header: "File thanh toán",
            accessorKey: "fileThanhToanSrc",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F5_4_4Create />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F5_4_4Update values={row.original} />
                        <F5_4_4Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
