'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_xfarghqrjw_Create from "./F_xfarghqrjw_Create";
import F_xfarghqrjw_Create2 from "./F_xfarghqrjw_Create2";
import F_xfarghqrjw_Delete from "./F_xfarghqrjw_Delete";
import F_xfarghqrjw_Update from "./F_xfarghqrjw_Update";


export interface I_xfarghqrjw {
    id: number; // STT
    studentCode: string; // Mã sinh viên
    fullName: string; // Họ tên
    dob: string; // Ngày sinh
    gender: string; // Giới tính
    policyCode: string; // Mã diện chính sách
    policyName: string; // Tên diện chính sách
    nhhkStart: string; // NHHK bắt đầu
    percentReduction: number; // % giảm
    reductionAmount: number; // Số tiền giảm
}

// Component hiển thị bảng dữ liệu
export default function F_xfarghqrjw_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_xfarghqrjw[]>({
        queryKey: ["F_xfarghqrjw_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                studentCode: "SV0001",
                fullName: "Tô Ngọc Lâm",
                dob: "01/01/2000",
                gender: "Nam",
                policyCode: "CTT",
                policyName: "Con thương binh",
                nhhkStart: "20241",
                percentReduction: 50,
                reductionAmount: 500000,
            },
        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_xfarghqrjw>[]>(() => [
       
        {
            header: "Mã sinh viên",
            accessorKey: "studentCode",
        },
        {
            header: "Họ tên",
            accessorKey: "fullName",
        },
        {
            header: "Ngày sinh",
            accessorKey: "dob",
        },
        {
            header: "Giới tính",
            accessorKey: "gender",
        },
        {
            header: "Mã diện chính sách",
            accessorKey: "policyCode",
        },
        {
            header: "Tên diện chính sách",
            accessorKey: "policyName",
        },
        {
            header: "NHHK bắt đầu",
            accessorKey: "nhhkStart",
        },
        {
            header: "% giảm",
            accessorKey: "percentReduction",
        },
        {
            header: "Số tiền giảm",
            accessorKey: "reductionAmount",
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
                    <F_xfarghqrjw_Create />
                    <F_xfarghqrjw_Create2/>
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                    
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_xfarghqrjw_Update data={row.original} />
                        <F_xfarghqrjw_Delete id={row.original.id} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
