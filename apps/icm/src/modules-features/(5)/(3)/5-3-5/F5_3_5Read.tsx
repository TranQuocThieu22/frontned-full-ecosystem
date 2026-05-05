'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    tenDeTai?: string;
    linhVuc?: string;
    chuNhiem?: string;
    donViCongTac?: string;
    kinhPhiDuKien?: number;
    thoiGianDuKien?: number;
    diemTrungBinh?: number;
    trangThaiThucHien?: boolean;
    fileThuyetMinhSrc?: string;
}

export default function F5_3_5Read() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                tenDeTai: "Nghiên cứu AI trong giáo dục",
                linhVuc: "Giáo dục",
                chuNhiem: "Trần Quốc Thiệu",
                donViCongTac: "Đại học Công nghệ",
                kinhPhiDuKien: 50000000,
                thoiGianDuKien: 12,
                diemTrungBinh: 9.5,
                trangThaiThucHien: true,
                fileThuyetMinhSrc: "/files/thuyet-minh-1.pdf",
            },
            {
                id: 2,
                tenDeTai: "Ứng dụng Blockchain trong quản lý",
                linhVuc: "Công nghệ",
                chuNhiem: "Nguyễn Văn Định",
                donViCongTac: "Viện Nghiên cứu Blockchain",
                kinhPhiDuKien: 75000000,
                thoiGianDuKien: 18,
                diemTrungBinh: 8.7,
                trangThaiThucHien: false,
                fileThuyetMinhSrc: "/files/thuyet-minh-2.pdf",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Tên đề tài",
            accessorKey: "tenDeTai",
        },
        {
            header: "Lĩnh vực",
            accessorKey: "linhVuc",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "chuNhiem",
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "donViCongTac",
        },
        {
            header: "Kinh phí dự kiến (VND)",
            accessorKey: "kinhPhiDuKien",
            Cell: ({ cell }) => new Intl.NumberFormat("vi-VN").format(cell.getValue<number>()),
        },
        {
            header: "Thời gian dự kiến (tháng)",
            accessorKey: "thoiGianDuKien",
        },
        {
            header: "Điểm trung bình",
            accessorKey: "diemTrungBinh",
        },
        {
            header: "Thực hiện",
            accessorKey: "trangThaiThucHien",
            Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />
        },
        {
            header: "File thuyết minh",
            accessorKey: "fileThuyetMinhSrc",
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
        />
    );
}
