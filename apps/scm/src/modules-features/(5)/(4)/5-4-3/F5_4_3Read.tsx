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
    kinhPhi?: number;
    thoiGian?: number;
    diemTrungBinh?: number;
    thucHien?: boolean;
    fileThuyetMinhSrc?: string;
}

export default function F5_4_3Read() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                tenDeTai: "Ứng dụng AI trong giáo dục",
                linhVuc: "Công nghệ thông tin",
                chuNhiem: "Nguyễn Văn A",
                donViCongTac: "ĐH Công nghệ",
                kinhPhi: 1000000,
                thoiGian: 12,
                diemTrungBinh: 8.5,
                thucHien: true,
                fileThuyetMinhSrc: "/files/thuyet-minh-1.pdf",
            },
            {
                id: 2,
                tenDeTai: "Phát triển công nghệ Blockchain",
                linhVuc: "Công nghệ thông tin",
                chuNhiem: "Trần Thị B",
                donViCongTac: "ĐH Khoa học tự nhiên",
                kinhPhi: 2000000,
                thoiGian: 18,
                diemTrungBinh: 9.0,
                thucHien: false,
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
            header: "Kinh phí",
            accessorKey: "kinhPhi",
        },
        {
            header: "Thời gian (tháng)",
            accessorKey: "thoiGian",
        },
        {
            header: "Điểm trung bình",
            accessorKey: "diemTrungBinh",
        },
        {
            header: "Thực hiện",
            accessorKey: "thucHien",
            Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,
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
