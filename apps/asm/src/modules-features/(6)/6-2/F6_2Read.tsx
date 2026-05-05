'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_2Delete from "./F6_2Delete";
import { Group } from "@mantine/core";
import F6_2Form from "./F6_2Form/F6_2Form";
import { MyButton } from "@/components/Buttons/Button/MyButton";

interface I {
    id?: number;
    maYeuCau?: string; // YCB2536
    ngayYeuCau?: string; // 15/01/2024
    donViSuDung?: string; // Phòng kế toán
    nguoiGui?: string; // Tô Ngọc Lâm
    ghiChu?: string; // TV Đen màn hình
    fileYeuCau?: string; // Link file yêu cầu
    ngayCapNhat?: Date; // Thêm trường theo yêu cầu
    nguoiCapNhat?: string; // Thêm trường theo yêu cầu
}

export default function F6_2Read() {
    const query = useQuery<I[]>({
        queryKey: [`F6_2Read`],
        queryFn: async () => [
            {
                id: 1,
                maYeuCau: "YCB2536",
                ngayYeuCau: "15/01/2024",
                donViSuDung: "Phòng kế toán",
                nguoiGui: "Tô Ngọc Lâm",
                ghiChu: "TV Đen màn hình",
                fileYeuCau: "https://example.com/file1.pdf",
                ngayCapNhat: new Date("2025-01-16T00:00:00Z"),
                nguoiCapNhat: "Nguyễn Văn A",
            },
            {
                id: 2,
                maYeuCau: "YCB2537",
                ngayYeuCau: "16/01/2024",
                donViSuDung: "Phòng hành chính",
                nguoiGui: "Phạm Hồng Minh",
                ghiChu: "Máy in không hoạt động",
                fileYeuCau: "https://example.com/file2.pdf",
                ngayCapNhat: new Date("2025-01-17T00:00:00Z"),
                nguoiCapNhat: "Trần Thị B",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã yêu cầu",
            accessorKey: "maYeuCau",
        },
        {
            header: "Ngày yêu cầu",
            accessorKey: "ngayYeuCau",
        },
        {
            header: "Đơn vị sử dụng",
            accessorKey: "donViSuDung",
        },
        {
            header: "Người gửi",
            accessorKey: "nguoiGui",
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu",
        },
        {
            header: "File yêu cầu",
            accessorKey: "fileYeuCau",
            accessorFn: (row) => <MyButtonViewPDF src={row.fileYeuCau} />,
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => new Date(row.ngayCapNhat!).toLocaleDateString("vi-VN"),
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            exportAble
            renderTopToolbarCustomActions={() => (
                <Group>
                    <F6_2Form />
                    <MyButton crudType="delete" />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F6_2Form values={{
                        maYeuCau: row.original.maYeuCau,
                        ngayYeuCau: new Date("2023/01/15"),
                        donViYeuCau: row.original.donViSuDung
                    }} />
                    <F6_2Delete id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
