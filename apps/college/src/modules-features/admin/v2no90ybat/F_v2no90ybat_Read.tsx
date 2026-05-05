'use client'
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
import F_v2no90ybat_Create from "./F_v2no90ybat_Create";
import F_v2no90ybat_Delete from "./F_v2no90ybat_Delete";
import F_v2no90ybat_Update from "./F_v2no90ybat_Update";





export interface I_v2no90ybat {
    sothutu?: number; // STT
    makhoi?: string; // Mã khối
    tenkhoi?: string; // Tên khối
    tenkhoiEg?: string; // Tên hồ sơ Eg
    ghiChu?: string; // Ghi chú
}

// Component hiển thị bảng dữ liệu
export default function F_v2no90ybat_Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_v2no90ybat[]>({
        queryKey: ["F_v2no90ybat_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                sothutu: 1,
                makhoi: "A00",
                tenkhoi: "Toán - Lý - Hóa",
            },
            {
                sothutu: 2,
                makhoi: "B00",
                tenkhoi: "Toán - Hóa - Sinh",
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
    const columns = useMemo<MRT_ColumnDef<I_v2no90ybat>[]>(() => [
        {
            header: "Mã khối",
            accessorKey: "makhoi",
        },
        {
            header: "Tên khối",
            accessorKey: "tenkhoi",
        },

    ], []);

    const exportConfig = {
        fields: [
            {
                fieldName: "makhoi",
                header: "Mã khối"
            },
            {
                fieldName: "tenkhoi",
                header: "Tên khối"
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
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() =>
                <>
                    <F_v2no90ybat_Create /> {/* Nút tạo mới */}
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={
                            () => {
                                console.log("data: ");
                            }
                        }
                        form={form_multiple}
                    ></AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dmTHPB"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>xoá</Button>
                </>



            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_v2no90ybat_Update data={row.original} />
                        <F_v2no90ybat_Delete sothutu={row.original.sothutu!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
