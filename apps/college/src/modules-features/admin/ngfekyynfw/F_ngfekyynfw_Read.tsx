'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_ngfekyynfw_Create from "./F_ngfekyynfw_Create";
import F_ngfekyynfw_Delete from "./F_ngfekyynfw_Delete";
import F_ngfekyynfw_Update from "./F_ngfekyynfw_Update";

// Interface định nghĩa dữ liệu
export interface Ingfekyynfw {
    id?: number; // STT
    maPhienBan?: string; // Mã phiên bản
    tenPhienBan?: string; // Tên phiên bản
    ghiChu?:string
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Component hiển thị bảng dữ liệu
export default function F_ngfekyynfw_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<Ingfekyynfw[]>({
        queryKey: ["phienBanData"], // Khóa cache dữ liệu
        queryFn: async () => [
            { id: 1, maPhienBan: "PB2025-01", tenPhienBan: "Điều chỉnh đợt 1 năm 2025" ,ghiChu:"Điều chỉnh kéo dài 3 tháng",nguoiCapNhat: "Quản trị viên",
            ngayCapNhat: new Date("2024-12-23")},
        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<Ingfekyynfw>[]>(
        () => [
            {
                header: "Mã phiên bản",
                accessorKey: "maPhienBan",
            },
            {
                header: "Tên phiên bản",
                accessorKey: "tenPhienBan",
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
                    <F_ngfekyynfw_Create />
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
                        <F_ngfekyynfw_Update data={row.original} />
                        <F_ngfekyynfw_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
