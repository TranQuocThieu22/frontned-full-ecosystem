'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_rkgjotusmn_Create from "./F_xfarghqrjw_Create";
import F_rkgjotusmn_Update from "./F_xfarghqrjw_Update";
import F_rkgjotusmn_Delete from "./F_xfarghqrjw_Delete";
import F_xfarghqrjw_Delete from "./F_xfarghqrjw_Delete";
import F_xfarghqrjw_Update from "./F_xfarghqrjw_Update";
import F_xfarghqrjw_Create from "./F_xfarghqrjw_Create";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";


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
    const disc = useDisclosure(false)
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
        <MyButtonModal label="Đồng bộ"
            modalSize={"100%"} title='Diện chính sách sinh viên chung' disclosure={disc}>

            <MyDataTable
            enableRowSelection
                exportAble={false}
                columns={columns} // Các cột hiển thị
                data={query.data!} // Dữ liệu từ useQuer
                renderTopToolbarCustomActions={() =>
                    <>
                        <Button>Chọn</Button>
                    </>

                }

            />
        </MyButtonModal>

    );
}
