'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_4_1_2Create from "./F5_4_1_2Create";
import F5_4_1_2Delete from "./F5_4_1_2Delete";
import F5_4_1_2Update from "./F5_4_1_2Update";

interface I {
    id?: number;
    maDeTai?: string;
    tenDeTai?: string;
    chuNhiem?: string;
    nguoiDanhGia?: string;
    ngayDanhGia?: Date;
    tongDiem?: number;
    nhanXet?: string;
    fileDanhGiaSrc?: string;
}

export default function F5_4_1_2Read() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                maDeTai: "DT-001",
                tenDeTai: "Ứng dụng AI trong y học",
                chuNhiem: "Nguyễn Văn A",
                nguoiDanhGia: "Trần Thị B",
                ngayDanhGia: new Date("2023-12-01T00:00:00Z"),
                tongDiem: 85,
                nhanXet: "Nghiên cứu có tiềm năng và thực tiễn cao",
                fileDanhGiaSrc: "/files/danh-gia-1.pdf",
            },
            {
                id: 2,
                maDeTai: "DT-002",
                tenDeTai: "Phát triển công nghệ Blockchain",
                chuNhiem: "Lê Văn C",
                nguoiDanhGia: "Nguyễn Văn D",
                ngayDanhGia: new Date("2023-12-02T00:00:00Z"),
                tongDiem: 90,
                nhanXet: "Đề tài phù hợp với xu hướng công nghệ mới",
                fileDanhGiaSrc: "/files/danh-gia-2.pdf",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "maDeTai",
        },
        {
            header: "Tên đề tài",
            accessorKey: "tenDeTai",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "chuNhiem",
        },
        {
            header: "Người đánh giá",
            accessorKey: "nguoiDanhGia",
        },
        {
            header: "Ngày đánh giá",
            accessorKey: "ngayDanhGia",
            Cell: ({ cell }) => {
                return U0DateToDDMMYYYString(new Date(cell.getValue<Date>()));
            },
        },
        {
            header: "Tổng điểm",
            accessorKey: "tongDiem",
        },
        {
            header: "Nhận xét",
            accessorKey: "nhanXet",
        },
        {
            header: "File đánh giá",
            accessorKey: "fileDanhGiaSrc",
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
            renderTopToolbarCustomActions={() => <F5_4_1_2Create />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F5_4_1_2Update values={row.original} />
                        <F5_4_1_2Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
