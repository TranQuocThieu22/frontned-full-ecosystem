'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import F4_3Delete from "./F4_3Delete";
import F4_3Create from "./F4_3Create";
import { Fieldset } from "@mantine/core";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyButton } from "@/components/Buttons/Button/MyButton";



// Interface định nghĩa dữ liệu
export interface I_F4_3Read {
    id?: number; // STT
    depreciationDate?: Date; // Ngày tính khấu hao
    depreciationCertificate?: string; // Chứng từ khấu hao
    note?: string; // Ghi chú
}

// Component hiển thị bảng dữ liệu
export default function F4_3Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F4_3Read[]>({
        queryKey: ["depreciationData"], // Khóa cache
        queryFn: async () => [
            {
                id: 1,
                depreciationDate: new Date("2025-01-15"),
                depreciationCertificate: "KH0253",
                note: "Tính khấu hao tháng 1/2025",
            },
        ],
    });

    const exportConfig = {
        fields: [
            {
                header: "Ngày tính khấu hao",
                fieldName: "depreciationDate",

            },
            {
                header: "Chứng từ khấu hao",
                fieldName: "depreciationCertificate",
            },
            {
                header: "Ghi chú",
                fieldName: "note",
            },

        ]
    };

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F4_3Read>[]>(
        () => [
            {
                header: "Ngày tính khấu hao",
                accessorKey: "depreciationDate",
                Cell: ({ cell }) =>
                    cell.getValue()
                        ? new Date(cell.getValue() as Date).toLocaleDateString("vi-VN")
                        : "",
            },
            {
                header: "Chứng từ khấu hao",
                accessorKey: "depreciationCertificate",
            },
            {
                header: "Ghi chú",
                accessorKey: "note",
            },
        ],
        []
    );

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Fieldset legend="Danh sách kì tính khấu hao">
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                data={query.data!}
                renderTopToolbarCustomActions={() => (
                    <>
                        {/* Nút thêm mới */}
                        <F4_3Create />
                        <AQButtonExportData
                            isAllData={true}
                            objectName="dsKiTinhKhauHao"
                            data={query.data!}
                            exportConfig={exportConfig}
                        />
                        <MyButton crudType="delete" />
                    </>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F4_3Delete id={row.original.id!} />
                    </MyCenterFull>
                )}
            />
        </Fieldset>

    );
}
