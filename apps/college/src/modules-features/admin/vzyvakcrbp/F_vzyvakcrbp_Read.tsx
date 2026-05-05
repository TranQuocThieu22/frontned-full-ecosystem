'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_vzyvakcrbp_Create from "./F_vzyvakcrbp_Create";
import F_vzyvakcrbp_Delete from "./F_vzyvakcrbp_Delete";
import F_vzyvakcrbp_Update from "./F_vzyvakcrbp_Update";



export interface I_vzyvakcrbp {
    id: number; // STT
    code?: string; // Mã quy chế
    name?: string; // Tên quy chế
    parent?: string; // Trực thuộc
    note?: string;
    nameEg?: string;

}

// Component hiển thị bảng dữ liệu
export default function F_vzyvakcrbp_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_vzyvakcrbp[]>({
        queryKey: ["F_vzyvakcrbp_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            { id: 1, code: 'TT08', name: 'Thông tư 08', parent: '' },
            { id: 2, code: 'TT16', name: 'Thông tư 16', parent: 'Thông tư 08' },
        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_vzyvakcrbp>[]>(() => [

        { header: 'Mã quy chế', accessorKey: 'code' },
        { header: 'Tên quy chế', accessorKey: 'name' },
        { header: 'Trực thuộc', accessorKey: 'parent' },

    ], []);

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            exportAble
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() =>
                <>
                    <F_vzyvakcrbp_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_vzyvakcrbp_Update data={row.original} />
                        <F_vzyvakcrbp_Delete id={row.original.id} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
