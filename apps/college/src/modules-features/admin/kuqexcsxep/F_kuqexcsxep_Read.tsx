'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_kuqexcsxep_Create from "./F_kuqexcsxep_Create";
import F_kuqexcsxep_Delete from "./F_kuqexcsxep_Delete";
import F_kuqexcsxep_Update from "./F_kuqexcsxep_Update";

// Interface định nghĩa dữ liệu
export interface I_F_kuqexcsxep_7 {
    id?: number; // STT
    unitCode?: string; // Mã nhóm thu VL
    unitName?: string; // Tên nhóm thu VL
    unitInvoice?: string; // Mẫu hóa đơn
    unitInvoiceSign?: string; // Ký hiệu hóa đơn
    note?: string; // Ghi chú
    userUpdated?: string; // Người cập nhật
    dateUpdated?: string; // Ngày cập nhật
}

// Component hiển thị bảng dữ liệu
export default function F_kuqexcsxep_7Read() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const [data, setData] = useState<I_F_kuqexcsxep_7[]>([]);
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F_kuqexcsxep_7[]>({
        queryKey: ["unitData"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                unitCode: "KTX",
                unitName: "Ký túc xá",
                unitInvoice: "02GTTT0/001",
                unitInvoiceSign: "HU/20E",
                userUpdated: "Nguyễn Văn A",
                dateUpdated: "2022-01-01",
            },
            {
                id: 2,
                unitCode: "KTX1",
                unitName: "Ký túc xá 1",
                unitInvoice: "02GTTT0/002",
                unitInvoiceSign: "HU/20E",
                userUpdated: "Nguyễn Văn B",
                dateUpdated: "2022-01-02",
            },
            {
                id: 3,
                unitCode: "KTX2",
                unitName: "Ký túc xá 2",
                unitInvoice: "02GTTT0/003",
                unitInvoiceSign: "HU/20E",
                userUpdated: "Nguyễn Văn C",
                dateUpdated: "2022-01-03",
            },

        ],
        // Fetching logic here, ideally from an API
    });

    const exportConfig = {
        fields: [
            { fieldName: "unitCode", header: "Mã nguồn kinh phí" },
            { fieldName: "unitName", header: "Tên nguồn kinh phí" },
            { fieldName: "unitInvoice", header: "Mẫu hóa đơn" },
            { fieldName: "unitInvoiceSign", header: "Ký hiệu hóa đơn" },
            { fieldName: "note", header: "Ghi chú" },
            { fieldName: "userUpdated", header: "Người cập nhật" },
            { fieldName: "dateUpdated", header: "Ngày cập nhật" },
        ]
    };

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F_kuqexcsxep_7>[]>(() => [
        { header: "Mã nhóm thu VL", accessorKey: "unitCode", size: 190 },
        { header: "Tên nhóm thu VL", accessorKey: "unitName", size: 190 },
        { header: "Mẫu hóa đơn", accessorKey: "unitInvoice" },
        { header: "Ký hiệu hóa đơn", accessorKey: "unitInvoiceSign", size: 190 },
        { header: "Ghi chú", accessorKey: "note" },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat", display: 'none' },
        { header: "Ngày cập nhật", accessorKey: "ngayCapNhat", display: 'none' },
    ], []);

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() => (
                <>
                    <F_kuqexcsxep_Create onSubmit={() => { }} /> {/* Nút tạo mới */}
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={() => { }}
                        form={form_multiple}
                    >
                    </AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsModuleNguonKinhPhi"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F_kuqexcsxep_Delete id={row.original.id!} />
                    <F_kuqexcsxep_Update data={row.original} />
                </MyCenterFull>
            )}
        />
    );
}
