'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_xkbakmsytn_Create from "./F_xkbakmsytn_Create";
import F_xkbakmsytn_Delete from "./F_xkbakmsytn_Delete";
import F_xkbakmsytn_Update from "./F_xkbakmsytn_Update";




// Interface định nghĩa dữ liệu
export interface Ixkbakmsytn {
    id?: number; // STT
    soQuyetDinh?: string; // Số quyết định
    ngayQuyetDinh?: Date; // Ngày quyết định
    tenQuyetDinh?: string; // Tên quyết định
    nguoiKy?: string; // Người ký
    file?: string //File quyết định
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Component hiển thị bảng dữ liệu
export default function F_xkbakmsytn_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<Ixkbakmsytn[]>({
        queryKey: ["quyetDinhData"], // Khóa cache dữ liệu
        queryFn: async () => [
            { id: 1, soQuyetDinh: "QD/TT-241", ngayQuyetDinh: new Date("2024-02-01"), tenQuyetDinh: "Quyết định buộc thôi học sinh viên Tô Ngọc Lâm vì vi phạm nội quy người học", nguoiKy: "Hiệu trưởng Nguyễn Hữu Quốc" },

        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<Ixkbakmsytn>[]>(
        () => [
            {
                header: "Số quyết định",
                accessorKey: "soQuyetDinh",
            },
            {
                header: "Ngày quyết định",
                accessorFn: (row) =>
                    row.ngayQuyetDinh
                        ? U0DateToDDMMYYYString(new Date(row.ngayQuyetDinh))
                        : "N/A",
            },
            {
                header: "Tên quyết định",
                accessorKey: "tenQuyetDinh",
            },
            {
                header: "Người ký",
                accessorKey: "nguoiKy",
            },
            {
                header: "Xem file quyết định",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyButtonViewPDF id={row.id} />
                        </MyCenterFull>
                    )
                }
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            }

        ],
        []
    );

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            exportAble
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() => (
                <>
                    <F_xkbakmsytn_Create />
                    <AQButtonCreateByImportFile
                        setImportedData={setImportData}
                        form={form_multiple}
                        onSubmit={() => {
                            console.log(form_multiple.values);
                        }}
                    >
                        Nhập từ file
                    </AQButtonCreateByImportFile>
                </>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_xkbakmsytn_Update data={row.original} />
                        <F_xkbakmsytn_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
