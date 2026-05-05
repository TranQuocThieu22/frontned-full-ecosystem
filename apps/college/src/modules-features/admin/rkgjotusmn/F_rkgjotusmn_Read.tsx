'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_rkgjotusmn_Create from "./F_rkgjotusmn_Create";
import F_rkgjotusmn_Delete from "./F_rkgjotusmn_Delete";
import F_rkgjotusmn_Update from "./F_rkgjotusmn_Update";


interface I_rkgjotusmn {
    id?: number; // STT
    maHoSo?: string; // Mã hồ sơ
    tenHoSo?: string; // Tên hồ sơ
    tenHoSoEg?: string; // Tên hồ sơ Eg
    ghiChu?: string; // Ghi chú
}
// Component hiển thị bảng dữ liệu
export default function F_rkgjotusmn_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_rkgjotusmn[]>({
        queryKey: ["F_rkgjotusmn_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            { id: 1, maHoSo: "GBTT", tenHoSo: "Giấy báo trúng tuyển" },

        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_rkgjotusmn>[]>(
        () => [
            {
                header: "Mã hồ sơ",
                accessorKey: "maHoSo",
            },
            {
                header: "Tên hồ sơ",
                accessorKey: "tenHoSo",
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
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() =>
                <>
                    <F_rkgjotusmn_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_rkgjotusmn_Update data={row.original} />
                        <F_rkgjotusmn_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
