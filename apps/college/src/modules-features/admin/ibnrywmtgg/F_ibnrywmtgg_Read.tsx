'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_ibnrywmtgg_Create from "./F_ibnrywmtgg_Create";
import F_ibnrywmtgg_Delete from "./F_ibnrywmtgg_Delete";
import F_ibnrywmtgg_Update from "./F_ibnrywmtgg_Update";

// Interface định nghĩa dữ liệu
export interface F_ibnrywmtgg_Read {
    id?: number
    ngay?: Date; // Ngày
    ghiChu?: string; // Ghi chú (ví dụ: Tết dương lịch)
}

// Component hiển thị bảng dữ liệu
export default function ReadNgayLe() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<F_ibnrywmtgg_Read[]>({
        queryKey: ["ngayLeData"], // Khóa cache dữ liệu
        queryFn: async () => [
            { ngay: new Date("2023-01-01"), ghiChu: "Tết Dương lịch" },
        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<F_ibnrywmtgg_Read>[]>(
        () => [
            {
                header: "Ngày", // Tên cột
                accessorKey: "ngay",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngay!));
                },
            },
            {
                header: "Ghi chú", // Tên cột
                accessorKey: "ghiChu",
            },
        ],
        []
    );

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns} // Cột
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() =>
                <>
                    <F_ibnrywmtgg_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_ibnrywmtgg_Update data={row.original} />
                        <F_ibnrywmtgg_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
