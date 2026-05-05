'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_3_3_3Delete from "./F5_3_3_3Delete";
import F5_3_3_3Update from "./F5_3_3_3Update";

interface I {
    id?: number;
    soQuyetDinhHoiDongXetDuyetDeCuong?: string;
    maDeTai?: string;
    tenDeTai?: string;
    chuNhiem?: string;
    diemTrungBinh?: number;
    fileSrc?: string; // File biên bản
}

export default function F5_3_3_3Read() {
    const query = useQuery<I[]>({
        queryKey: [`F5_3_3_3Read`],
        queryFn: async () => [
            {
                id: 1,
                soQuyetDinhHoiDongXetDuyetDeCuong: "QD001",
                maDeTai: "DT001",
                tenDeTai: "Nghiên cứu AI trong giáo dục",
                chuNhiem: "Trần Quốc Thiệu",
                diemTrungBinh: 9.5,
                fileSrc: "/files/bien-ban-1.pdf",
            },
            {
                id: 2,
                soQuyetDinhHoiDongXetDuyetDeCuong: "QD002",
                maDeTai: "DT002",
                tenDeTai: "Ứng dụng Blockchain trong quản lý",
                chuNhiem: "Nguyễn Văn Định",
                diemTrungBinh: 8.7,
                fileSrc: "/files/bien-ban-2.pdf",
            },
            {
                id: 3,
                soQuyetDinhHoiDongXetDuyetDeCuong: "QD003",
                maDeTai: "DT003",
                tenDeTai: "Phân tích dữ liệu lớn trong y tế",
                chuNhiem: "Đặng Tuấn Kiệt",
                diemTrungBinh: 9.2,
                fileSrc: "/files/bien-ban-3.pdf",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Số quyết định hội đồng",
            accessorKey: "soQuyetDinhHoiDongXetDuyetDeCuong",
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
            Cell: ({ cell }) => `${cell.getValue<number>().toFixed(2)}`, // Hiển thị điểm trung bình với 2 chữ số thập phân
        },
        {
            header: "File biên bản",
            accessorKey: "fileSrc",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF></MyButtonViewPDF>
            },
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => { // Nếu table có update delete thì bỏ thêm render row action
                return (
                    <MyCenterFull>
                        <F5_3_3_3Update values={row.original} />
                        <F5_3_3_3Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
