'use client';
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F12_6Create from "./F12_6Create";
import F12_6Update from "./F12_6Update";
import F12_6Delete from "./F12_6Delete";
import { useForm } from "@mantine/form";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";

// Interface định nghĩa dữ liệu
export interface I_F12_6 {
    id?: number; // STT
    unitCode?: string; // Mã đơn vị
    unitName?: string; // Tên đơn vị
    unitType?: string; // Loại đơn vị
    affiliated?: string; // Trực thuộc
}

// Component hiển thị bảng dữ liệu
export default function F12_6Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F12_6[]>({
        queryKey: ["unitData"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                unitCode: "K.CNTT",
                unitName: "Khoa Công nghệ thông tin",
                unitType: "Khoa",
                affiliated: "",
            },
            {
                id: 2,
                unitCode: "K.CNTT.DL",
                unitName: "Bộ môn cơ sở dữ liệu",
                unitType: "Bộ môn",
                affiliated: "Khoa Công nghệ thông tin",
            },
        ],
    });

    const exportConfig = {
        fields: [
            {
                fieldName: "unitCode",
                header: "Mã đơn vị"
            },
            {
                fieldName: "unitName",
                header: "Tên đơn vị"
            },
            {
                fieldName: "unitType",
                header: "Loại đơn vị"
            },
            {
                fieldName: "affiliated",
                header: "Trực thuộc"
            },
        ]
    };

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F12_6>[]>(
        () => [
            { header: "Mã đơn vị", accessorKey: "unitCode" },
            { header: "Tên đơn vị", accessorKey: "unitName" },
            { header: "Loại đơn vị", accessorKey: "unitType" },
            { header: "Trực thuộc", accessorKey: "affiliated" },
        ],
        []
    );

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
                    <F12_6Create /> {/* Nút tạo mới */}
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
                        objectName="dsModuleMonHoc"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                    <F12_6Update data={row.original} />
                    <F12_6Delete id={row.original.id!} />
                </MyCenterFull>

            )}
        />
    );
}
