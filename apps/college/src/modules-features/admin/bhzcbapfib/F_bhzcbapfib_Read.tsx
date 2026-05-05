'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_bhzcbapfib_Create from "./F_bhzcbapfib_Create";
import F_bhzcbapfib_Delete from "./F_bhzcbapfib_Delete";
import F_bhzcbapfib_Update from "./F_bhzcbapfib_Update";


// Interface định nghĩa dữ liệu
export interface I_bhzcbapfib {
    id?: number; // STT
    maChiNhanh?: string; // Mã chi nhánh
    tenChiNhanh?: string; // Tên chi nhánh
    diaChi?:string;
    ghiChu?:string
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Component hiển thị bảng dữ liệu
export default function F_bhzcbapfib_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_bhzcbapfib[]>({
        queryKey: ["chiNhanhData"], // Khóa cache dữ liệu
        queryFn: async () => [
            { id: 1, maChiNhanh: "HCM-TD", tenChiNhanh: "Thủ Đức",diaChi:"",ghiChu:"", nguoiCapNhat: "Admin",
            ngayCapNhat: new Date("2023-01-01") },
            { id: 2, maChiNhanh: "HCM-Q3", tenChiNhanh: "Quận 3",diaChi:"",ghiChu:"", nguoiCapNhat: "Admin",
            ngayCapNhat: new Date("2023-01-01") },
            { id: 3, maChiNhanh: "HCM-TB", tenChiNhanh: "Tân Bình",diaChi:"",ghiChu:"", nguoiCapNhat: "Admin",
            ngayCapNhat: new Date("2023-01-01") },
        ],
    });

    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_bhzcbapfib>[]>(
        () => [
            {
                header: "Mã chi nhánh",
                accessorKey: "maChiNhanh", // Khóa dữ liệu của cột
            },
            {
                header: "Tên chi nhánh",
                accessorKey: "tenChiNhanh", // Khóa dữ liệu của cột
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
            exportAble // Cho phép xuất dữ liệu
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() => (
                <>
                    <F_bhzcbapfib_Create /> {/* Nút tạo mới */}
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
                        <F_bhzcbapfib_Update data={row.original} />
                        <F_bhzcbapfib_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
