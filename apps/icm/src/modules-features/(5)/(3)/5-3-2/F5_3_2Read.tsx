'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_3_2Delete from "./F5_3_2Delete";
import F5_3_2Update from "./F5_3_2Update";

interface I {
    id?: number;
    tenDeTai?: string;
    linhVuc?: string;
    giangVienDangKy?: string;
    donViCongTac?: string;
    kinhPhiDuKien?: string;
    thoiGianDuKien?: string;
    fileThuyetMinhSrc?: string;
}

export default function F5_3_2Read() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                tenDeTai: "Nghiên cứu về AI trong giáo dục",
                linhVuc: "Công nghệ thông tin",
                giangVienDangKy: "Nguyễn Văn A",
                donViCongTac: "Đại học Bách Khoa",
                kinhPhiDuKien: "500,000,000 VNĐ",
                thoiGianDuKien: "12 tháng",
                fileThuyetMinhSrc: "/files/thuyet-minh-1.pdf",
            },
            {
                id: 2,
                tenDeTai: "Ứng dụng Blockchain trong y tế",
                linhVuc: "Y tế",
                giangVienDangKy: "Trần Thị B",
                donViCongTac: "Đại học Y Hà Nội",
                kinhPhiDuKien: "750,000,000 VNĐ",
                thoiGianDuKien: "18 tháng",
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
            header: "Giảng viên đăng ký",
            accessorKey: "giangVienDangKy",
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "donViCongTac",
        },
        {
            header: "Kinh phí dự kiến",
            accessorKey: "kinhPhiDuKien",
        },
        {
            header: "Thời gian dự kiến",
            accessorKey: "thoiGianDuKien",
        },
        {
            header: "File thuyết minh",
            accessorKey: "fileThuyetMinhSrc",
            Cell: ({ cell }) => <MyButtonViewPDF />,
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F5_3_2Update values={row.original} />
                        <F5_3_2Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
