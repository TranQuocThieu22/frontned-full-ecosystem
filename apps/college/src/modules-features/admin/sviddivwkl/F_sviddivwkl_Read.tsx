'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_sviddivwkl_Update from "./F_sviddivwkl_Update";
import F_sviddivwkl_Delete from "./F_sviddivwkl_Delete";
import F_sviddivwkl_Create from "./F_sviddivwkl_Create";



export interface I_sviddivwkl {
    id: number; // STT
    policyCode: string; // Mã diện chính sách
    policyName: string; // Tên diện chính sách
}

// Component hiển thị bảng dữ liệu
export default function F_sviddivwkl_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_sviddivwkl[]>({
        queryKey: ["F_sviddivwkl_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            { id: 1, policyCode: "CTT", policyName: "Con thương binh" },
            { id: 2, policyCode: "CBB", policyName: "Con bệnh binh" },
        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_sviddivwkl>[]>(() => [
       
        {
            header: "Mã diện chính sách",
            accessorKey: "policyCode",
        },
        {
            header: "Tên diện chính sách",
            accessorKey: "policyName",
        },
        
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
                    <F_sviddivwkl_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_sviddivwkl_Update data={row.original} />
                        <F_sviddivwkl_Delete id={row.original.id} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
