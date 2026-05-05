'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import F12_11Create from "./F12_11Create";
import F12_11Update from "./F12_11Update";
import F12_11Delete from "./F12_11Delete";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

//interface định nghĩa dữ liệu
export interface I_F12_11_Read {
    id?: number;
    code?: string;
    name?: string;
    note?: string;
}

//component hiển thị bảng dữ liệu
export default function F12_11Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    //query để lấy dữ liệu từ server hoặc mock Data
    const query = useQuery<I_F12_11_Read[]>({
        queryKey: ["F12_11Read"], // Khóa cache
        queryFn: async () => [
    { id: 1, code: "DA001", name: "ứng dụng công nghệ AI vào quản lí tài sản", note: "" },
    { id: 1, code: "DA001", name: "ứng dụng công nghệ AI vào quản lí tài sản", note: "" },

        ]
    });
    console.log(query.data);

    const exportConfig = {
        fields: [
            {
                fieldName: "id",
                header: "Stt"
            },
            {
                fieldName: "code",
                header: "Mã dự án"
            },
            {
                fieldName: "name",
                header: "Tên dự án"
            },
            {
                fieldName: "note",
                header: "Ghi chú"
            }
        ]
    };

    // định nghĩa các cột của bảng 
    const columns = useMemo<MRT_ColumnDef<I_F12_11_Read>[]>(
        () => [
            { header: "Mã dự án", accessorKey: "code" },
            { header: "Tên dự án", accessorKey: "name" },
            { header: "Ghi chú", accessorKey: "note" }
        ],
        []
    );

    // xử lí trạng thái dữ liệu
    if (query.isLoading) return "đang tải dữ liệu";
    if (query.isError) return "không có dữ liệu";

    return (
        <MyDataTable
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() => (
                <>
                    <F12_11Create /> {/* Nút tạo mới */}
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
                        objectName="dmDA"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>xoá</Button>
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                    <F12_11Update data={row.original} />
                    <F12_11Delete id={row.original.id!} />
                </MyCenterFull>

            )}
        />
    );

}
const data = [
    { id: 2, code: "DA001", name: "ứng dụng công nghệ AI vào quản lí tài sản", note: "" },

]
