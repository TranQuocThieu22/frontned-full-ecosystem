'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import F_b5kgyy98l9_Create from "./F_b5kgyy98l9_Create";
import F_b5kgyy98l9_Update from "./F_b5kgyy98l9_Update";
import F_b5kgyy98l9_Delete from "./F_b5kgyy98l9_Delete";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

//interface định nghĩa dữ liệu
export interface I_b5kgyy98l9_Read {
    id?: number;
    school?: string;
    schoolname?: string;
    schoolnameeg?: string;
    idlocation?: string;
    location?: string;
    address?: string;
    note?: string;
}

//component hiển thị bảng dữ liệu
export default function F_b5kgyy98l9_Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    //query để lấy dữ liệu từ server hoặc mock Data
    const query = useQuery<I_b5kgyy98l9_Read[]>({
        queryKey: ["F_b5kgyy98l9_Read"], // Khóa cache
        queryFn: async () => [
    { id: 1, school: "01001", schoolname: "THPT Ba Vì", schoolnameeg: "", idlocation: "0117", location: "", address: "", note: "" },
        ]
    });
    console.log(query.data);

    const exportConfig = {
        fields: [
            {
                fieldName: "school",
                header: "Mã trường"
            },
            {
                fieldName: "schoolname",
                header: "Tên trường "
            },
            {
                fieldName: "schoolnameeg",
                header: "Tên trường eg"
            },
            {
                fieldName: "idlocation",
                header: "Mã địa bàn"
            },
            {
                fieldName: "location",
                header: "Khu vực"
            },
            {
                fieldName: "address",
                header: "Địa chỉ"
            },
            {
                fieldName: "note",
                header: "Ghi chú"
            }
        ]
    };

    // định nghĩa các cột của bảng 
    const columns = useMemo<MRT_ColumnDef<I_b5kgyy98l9_Read>[]>(
        () => [
            { header: "Mã trường", accessorKey: "school" },
            { header: "Tên trường", accessorKey: "schoolname" },
            { header: "Tên trường eg", accessorKey: "schoolnameeg" },
            { header: "Mã địa bàn", accessorKey: "idlocation" },
            { header: "Khu vực", accessorKey: "location" },
            { header: "Địa chỉ", accessorKey: "address" },
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
                    <F_b5kgyy98l9_Create /> {/* Nút tạo mới */}
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
                    <Button color="red" leftSection={<IconTrash />}>Xoá</Button>
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                    <F_b5kgyy98l9_Update data={row.original} />
                    <F_b5kgyy98l9_Delete id={row.original.id!} />
                </MyCenterFull>

            )}
        />
    );

}
