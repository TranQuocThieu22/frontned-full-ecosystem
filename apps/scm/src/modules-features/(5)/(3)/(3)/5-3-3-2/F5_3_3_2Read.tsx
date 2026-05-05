'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_3_3_2Create from "./F5_3_3_2Create";
import F5_3_3_2Delete from "./F5_3_3_2Delete";
import F5_3_3_2Update from "./F5_3_3_2Update";

interface I {
    id?: number;
    tenDeTai?: string;
    chuNhiem?: string;
    nguoiDanhGia?: string;
    ngayDanhGia?: Date;
    tongDiem?: number;
    nhanXet?: string;
    fileSrc?: string; // File đánh giá
}

export default function F5_3_3_2Read() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                tenDeTai: "Ứng dụng AI trong giáo dục",
                chuNhiem: "Trần Quốc Thiệu",
                nguoiDanhGia: "Nguyễn Văn Định",
                ngayDanhGia: new Date("2024-01-15T00:00:00Z"),
                tongDiem: 95,
                nhanXet: "Đề tài rất tiềm năng.",
                fileSrc: "/files/danh-gia-1.pdf",
            },
            {
                id: 2,
                tenDeTai: "Phát triển Blockchain trong quản lý",
                chuNhiem: "Đặng Tuấn Kiệt",
                nguoiDanhGia: "Lê Thị Hồng",
                ngayDanhGia: new Date("2024-02-20T00:00:00Z"),
                tongDiem: 87,
                nhanXet: "Cần cải thiện phần ứng dụng thực tiễn.",
                fileSrc: "/files/danh-gia-2.pdf",
            },
            {
                id: 3,
                tenDeTai: "Phân tích dữ liệu lớn trong y tế",
                chuNhiem: "Nguyễn Minh Tuấn",
                nguoiDanhGia: "Trần Thị Hoa",
                ngayDanhGia: new Date("2024-03-25T00:00:00Z"),
                tongDiem: 92,
                nhanXet: "Bố cục hợp lý và phân tích tốt.",
                fileSrc: "/files/danh-gia-3.pdf",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
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
            accessorKey: "fileSrc",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />
            },
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F5_3_3_2Create />}
            renderRowActions={({ row }) => { // Nếu table có update delete thì bỏ thêm render row action
                return (
                    <MyCenterFull>
                        <F5_3_3_2Update values={row.original} />
                        <F5_3_3_2Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
