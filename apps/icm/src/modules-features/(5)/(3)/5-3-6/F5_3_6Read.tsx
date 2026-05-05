'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_3_6Create from "./F5_3_6Create";
import F5_3_6Delete from "./F5_3_6Delete";
import F5_3_6Update from "./F5_3_6Update";

export interface I {
    id?: number;
    soQuyetDinh?: string;
    chuTich?: string;
    tongTien?: number;
    fileThanhToanSrc?: string;
}

export default function F5_3_6Read() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                soQuyetDinh: "QD-001",
                chuTich: "Nguyễn Văn A",
                tongTien: 100000000,
                fileThanhToanSrc: "/files/thanh-toan-1.pdf",
            },
            {
                id: 2,
                soQuyetDinh: "QD-002",
                chuTich: "Trần Thị B",
                tongTien: 150000000,
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
            header: "Tổng tiền (VND)",
            accessorKey: "tongTien",
            Cell: ({ cell }) => new Intl.NumberFormat("vi-VN").format(cell.getValue<number>()),
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
            renderTopToolbarCustomActions={() => <F5_3_6Create />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F5_3_6Update values={row.original} />
                        <F5_3_6Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
