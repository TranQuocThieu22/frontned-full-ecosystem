'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import F12_7Create from "./F12_7Create";
import F12_7Update from "./F12_7Update";
import F12_7Delete from "./F12_7Delete";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { useForm } from "@mantine/form";

// Interface định nghĩa dữ liệu
export interface I_F12_7_Read {
    id?: number; // STT
    counterCode?: string; // Mã bộ đếm
    counterName?: string; // Tên bộ đếm
    professionType?: string; // Loại nghiệp vụ
    objectType?:string //Loại đối tượng
}

// Component hiển thị bảng dữ liệu
export default function F_F12_7_Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Query để lấy dữ liệu từ server hoặc mock data
    const query = useQuery<I_F12_7_Read[]>({
        queryKey: ["counterData"], // Khóa cache
        queryFn: async () => [
            { id: 1, counterCode: "MVTS", counterName: "Mã vạch tài sản", professionType: "Mã vạch tài sản",objectType:"Toàn trường" },
           
        ],
    });

    // Định nghĩa các cột
    const columns = useMemo<MRT_ColumnDef<I_F12_7_Read>[]>(
        () => [
            {
                header: "Mã bộ đếm",
                accessorKey: "counterCode",
            },
            {
                header: "Tên bộ đếm",
                accessorKey: "counterName",
            },
            {
                header: "Loại nghiệp vụ",
                accessorKey: "professionType",
            },
            {
                header: "Loại đối tượng",
                accessorKey: "objectType",
            },
        ],
        []
    );
    
    const exportConfig = {
        fields: [
            {
                header: "Mã bộ đếm",
                fieldName: "counterCode",
            },
            {
                header: "Tên bộ đếm",
                fieldName: "counterName",
            },
            {
                header: "Loại nghiệp vụ",
                fieldName: "professionType",
            },
            {
                header: "Loại đối tượng",
                fieldName: "objectType",
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
                    <F12_7Create />
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
                                objectName="dmBoDem"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    {/* Nút chỉnh sửa và xóa */}
                    <F12_7Update data={row.original} />
                    <F12_7Delete id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
