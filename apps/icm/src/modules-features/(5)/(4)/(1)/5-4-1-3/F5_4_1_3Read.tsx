'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_4_1_3Create from "./F5_4_1_3Create";
import F5_4_1_3Delete from "./F5_4_1_3Delete";
import F5_3_1_3Update from './F5_4_1_3Update';
export interface I {
    id?: number;
    soQuyetDinhHoiDongXetDuyetDeTai?: string;
    maDeTai?: string;
    tenDeTai?: string;
    chuNhiem?: string;
    diemTrungBinh?: number;
    fileBienBanSrc?: string;
}

export default function F5_4_1_3Read() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                soQuyetDinhHoiDongXetDuyetDeTai: "QDHD-001",
                maDeTai: "DT-001",
                tenDeTai: "Ứng dụng AI trong giáo dục",
                chuNhiem: "Nguyễn Văn A",
                diemTrungBinh: 8.5,
                fileBienBanSrc: "/files/bien-ban-1.pdf",
            },
            {
                id: 2,
                soQuyetDinhHoiDongXetDuyetDeTai: "QDHD-002",
                maDeTai: "DT-002",
                tenDeTai: "Phát triển công nghệ Blockchain",
                chuNhiem: "Trần Thị B",
                diemTrungBinh: 9.0,
                fileBienBanSrc: "/files/bien-ban-2.pdf",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Số quyết định hội đồng",
            accessorKey: "soQuyetDinhHoiDongXetDuyetDeTai",
        },
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
            header: "Điểm trung bình",
            accessorKey: "diemTrungBinh",
        },
        {
            header: "File biên bản",
            accessorKey: "fileBienBanSrc",
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
            renderTopToolbarCustomActions={() => <F5_4_1_3Create />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F5_3_1_3Update values={row.original} />
                        <F5_4_1_3Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
