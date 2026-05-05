'use client';

import { useState, useMemo } from "react";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import F12_8Create from "./F12_8Create";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import F12_8Delete from "./F12_8Delete";
import F12_8Update from "./F12_8Update";

// Interface định nghĩa dữ liệu
export interface I_F12_8_Read {
    id?: number; // STT
    assetTypeCode?: string; // Mã tài sản
    assetTypeName?: string; // Tên tài sản
    objectType?: string; // Thuộc loại
    assetGroup?: string;// Nhóm tài sản
    depreciationRate?: number;// Tỷ lệ hao mòn
    usefulLife?: number;// Số năm sử dụng
    isUse?: boolean;// Sử dụng
    note?: string;// Ghi chú
}

// Component hiển thị bảng dữ liệu
export default function F12_8Read() {
    const [fileData, setFileData] = useState<any[]>([]);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Query để lấy dữ liệu từ server hoặc mock data
    const query = useQuery<I_F12_8_Read[]>({
        queryKey: ["assetData"], // Khóa cache
        queryFn: async () => [
            { id: 1, assetTypeCode: "30305", assetTypeName: "Xe phun nước", objectType: "Xe công cộng", assetGroup: "Phương tiện vận tải truyền dẫn", depreciationRate: 6.67, usefulLife: 15, isUse: true, note: "Ghi chú" },
        ],
    });

    // Định nghĩa các cột
    const columns = useMemo<MRT_ColumnDef<I_F12_8_Read>[]>(
        () => [
            {
                header: "Mã tài sản",
                accessorKey: "assetTypeCode",
            },
            {
                header: "Tên tài sản",
                accessorKey: "assetTypeName",
            },
            {
                header: "Thuộc loại",
                accessorKey: "objectType",
            },
            {
                header: "Nhóm tài sản",
                accessorKey: "assetGroup",
            },
            {
                header: "Tỷ lệ hao mòn",
                accessorKey: "depreciationRate",
            },
            {
                header: "Số năm sử dụng",
                accessorKey: "usefulLife",

            },
            {
                header: "Sử dụng",
                accessorKey: "isUse",
                accessorFn: (row) => {
                    return (
                        <MyCenterFull>
                            <MyCheckbox readOnly checked={row.isUse} />
                        </MyCenterFull>
                    )
                }

            },
            {
                header: "Ghi chú",
                accessorKey: "note",
            },
        ],
        []
    );

    const exportConfig = {
        fields: [
            {
                header: "Mã tài sản",
                fieldName: "assetTypeCode",
            },
            {
                header: "Tên tài sản",
                fieldName: "assetTypeName",
            },
            {
                header: "Thuộc loại",
                fieldName: "objectType",
            },
            {
                header: "Nhóm tài sản",
                fieldName: "assetGroup",
            },
            {
                header: "Tỷ lệ hao mòn",
                fieldName: "depreciationRate",
            },
            {
                header: "Số năm sử dụng",
                fieldName: "usefulLife",
            },
            {
                header: "Sử dụng",
                fieldName: "isUse",

            },
            {
                header: "Ghi chú",
                fieldName: "note",
            },
        ]
    };

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => (
                <>
                    {/* Nút tạo mới */}
                    <F12_8Create />
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={
                            () => {
                                console.log("data: ");
                            }
                        }
                        form={form_multiple}
                    >s</AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dmLoaiTaiSan"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                </>
            )}
        renderRowActions={({ row }) => (
            <MyCenterFull>
                {/* Nút chỉnh sửa và xóa */}
                <F12_8Update data={row.original} />
                <F12_8Delete id={row.original.id!} />
            </MyCenterFull>
        )}
        />
    )
}