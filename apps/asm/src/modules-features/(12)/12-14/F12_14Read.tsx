'use client';
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F12_13Create from "./F12_14Create";
import F12_13Update from "./F12_14Update";
import F12_13Delete from "./F12_14Delete";
import { useForm } from "@mantine/form";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { Button, Checkbox } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

// Interface định nghĩa dữ liệu
export interface I_F12_137 {
    id?: number; // STT
    unitCode?: string; // Mã nguồn kinh phí
    unitName?: string; // Tên nguồn kinh phí
    unitType?: string; // Thuộc loại
    isUsed?: boolean; // Sử dụng
    note?: string; // Ghi chú
    userUpdated?: string; // Người cập nhật
    dateUpdated?: string; // Ngày cập nhật
}

// Component hiển thị bảng dữ liệu
export default function F12_14Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [checked, setChecked] = useState(false);


    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const [data, setData] = useState<I_F12_137[]>([]);
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F12_137[]>({
        queryKey: ["unitData"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                unitCode: "0001",
                unitName: "Máy văn phòng",
                isUsed: true,
                userUpdated: "Nguyễn Văn A",
                dateUpdated: "2022-01-01",
            },
            {
                id: 2,
                unitCode: "00011",
                unitName: "Máy hủy giấy",
                unitType: "Máy văn phòng",
                isUsed: true,
                userUpdated: "Nguyễn Văn B",
                dateUpdated: "2022-01-02",
            },
            {
                id: 3,
                unitCode: "00012",
                unitName: "Máy fax",
                unitType: "Máy văn phòng",
                isUsed: true,
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
            { fieldName: "unitType", header: "Thuộc loại" },
            { fieldName: "isUsed", header: "Sử dụng" },
            { fieldName: "note", header: "Ghi chú" },
            { fieldName: "userUpdated", header: "Người cập nhật" },
            { fieldName: "dateUpdated", header: "Ngày cập nhật" },
        ]
    };

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F12_137>[]>(() => [
        { header: "Mã loại công cụ", accessorKey: "unitCode", size: 220 },
        { header: "Tên loại công cụ", accessorKey: "unitName", size: 220 },
        { header: "Thuộc loại", accessorKey: "unitType" },
        {
            header: "Sử dụng",
            accessorKey: "isUsed",
            accessorFn: (row) => {
                return (
                    <Checkbox
                        checked={row.isUsed}
                        onChange={(event) => setChecked(event.currentTarget.checked)}
                    />
                )
            }
        },
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
                    <F12_13Create onSubmit={() => { }} /> {/* Nút tạo mới */}
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
                    {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                    <F12_13Update data={row.original} />
                    <F12_13Delete id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
