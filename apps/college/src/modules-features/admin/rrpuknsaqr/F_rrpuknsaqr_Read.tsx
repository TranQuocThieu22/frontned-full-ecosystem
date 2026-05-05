'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_rrpuknsaqr_Create from "./F_rrpuknsaqr_Create";
import F_rrpuknsaqr_Delete from "./F_rrpuknsaqr_Delete";
import F_rrpuknsaqr_Update from "./F_rrpuknsaqr_Update";

// Interface định nghĩa dữ liệu
export interface Irrpuknsaqr {
    id?: number; // STT
    maHe?: string; // Mã hệ
    tenHe?: string; // Tên hệ
    tenHeEg?:string
    ghiChu?:string
}

// Component hiển thị bảng dữ liệu
export default function F_rrpuknsaqr_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<Irrpuknsaqr[]>({
        queryKey: ["heData"], // Khóa cache dữ liệu
        queryFn: async () => [
            { id: 1, maHe: "CQ", tenHe: "Chính quy",tenHeEg:"regular",ghiChu:" Có lịch trình học cố định, trong đó sinh viên phải tham gia vào các khóa học và buổi học theo lịch trình của trường." },
            { id: 3, maHe: "TX", tenHe: "Từ xa",tenHeEg:"remote system",ghiChu:"Học từ xa" },
        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<Irrpuknsaqr>[]>(
        () => [
            {
                header: "Mã hệ",
                accessorKey: "maHe",
            },
            {
                header: "Tên hệ",
                accessorKey: "tenHe",
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
                    <F_rrpuknsaqr_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_rrpuknsaqr_Update data={row.original} />
                        <F_rrpuknsaqr_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
