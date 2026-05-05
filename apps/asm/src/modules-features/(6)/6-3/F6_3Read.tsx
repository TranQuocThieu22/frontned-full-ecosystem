'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox, Fieldset } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F6_3ReadAssets from "./F6_3ReadAssets";
import F6_3Validate from "./F6_3Validate";

interface I {
    id?: number;
    maYeuCau?: string; // YCBT2536
    ngayYeuCau?: string; // 15/01/2024
    donViSuDung?: string; // Phòng kế toán
    nguoiGui?: string; // Tô Ngọc Lâm
    ghiChu?: string; // TV Đen màn hình
    fileYeuCau?: string;
    danhSachTaiSan?: string;
    hopLe?: boolean; // true
    ghiChuKiemTra?: string; // Yêu cầu hợp lệ
    ngayCapNhat?: Date; // Thêm trường theo yêu cầu
    nguoiCapNhat?: string; // Thêm trường theo yêu cầu
}

export default function F6_3Read() {
    const query = useQuery<I[]>({
        queryKey: [`F6_3Read`],
        queryFn: async () => [
            {
                id: 1,
                maYeuCau: "YCBT2536",
                ngayYeuCau: "15/01/2024",
                donViSuDung: "Phòng kế toán",
                nguoiGui: "Tô Ngọc Lâm",
                ghiChu: "TV Đen màn hình",
                fileYeuCau: "https://example.com/file1.pdf",
                danhSachTaiSan: "Màn hình, Máy in",
                hopLe: true,
                ghiChuKiemTra: "Yêu cầu hợp lệ",
                ngayCapNhat: new Date("2025-01-16T00:00:00Z"),
                nguoiCapNhat: "Nguyễn Văn A",
            },
            {
                id: 2,
                maYeuCau: "YCBT2537",
                ngayYeuCau: "16/01/2024",
                donViSuDung: "Phòng nhân sự",
                nguoiGui: "Nguyễn Văn B",
                ghiChu: "Máy in kẹt giấy",
                fileYeuCau: "https://example.com/file2.pdf",
                danhSachTaiSan: "Máy in, Máy chiếu",
                hopLe: false,
                ghiChuKiemTra: "Yêu cầu không hợp lệ",
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
            Cell: ({ cell }) => <MyButtonViewPDF src={cell.getValue<string>()} />,
        },
        {
            header: "Danh sách tài sản",
            accessorFn: (row) => <F6_3ReadAssets />,
        },
        {
            header: "Hợp lệ",
            accessorKey: "hopLe",
            Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,
        },
        {
            header: "Ghi chú kiểm tra",
            accessorKey: "ghiChuKiemTra",
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
        {
            header: "Kiểm tra",
            accessorFn: () => <F6_3Validate />
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Fieldset legend="Danh sách yêu cầu">
            <MyDataTable
                columns={columns}
                data={query.data!}
                exportAble

            />
        </Fieldset>
    );
}
