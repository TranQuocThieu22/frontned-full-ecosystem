'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_xnbdhfktmx_Create from "./F_xnbdhfktmx_Create";
import F_xnbdhfktmx_Delete from "./F_xnbdhfktmx_Delete";
import F_xnbdhfktmx_Update from "./F_xnbdhfktmx_Update";
import { Text } from "@mantine/core";


export interface F_xnbdhfktmx_Read {
    id: number;
    maChuKi: string;
    tenChuKi: string;
    chucVu1VN: string;
    chucVu2VN: string;
    chucVu3VN: string;
    chucVu1EG: string;
    chucVu2EG: string;
    chucVu3EG: string;
    ghiChu: string;
    uploadFile: {
        fileBase64String: string;
        fileExtension: string;
        fileName: string;
    };
}

const mockData: F_xnbdhfktmx_Read[] = [
    {
        id: 1,
        maChuKi: "CK01",
        tenChuKi: "Chữ ký 1",
        chucVu1VN: "Chữ ký 1 VN",
        chucVu2VN: "Chữ ký 2 VN",
        chucVu3VN: "Chữ ký 3 VN",
        chucVu1EG: "Chữ ký 1 EG",
        chucVu2EG: "Chữ ký 2 EG",
        chucVu3EG: "Chữ ký 3 EG",
        ghiChu: "chữ kí này của tổng thống",
        uploadFile: {
            fileBase64String: "asvlkj3poiwfnaop;isdncv[pw9qh",
            fileExtension: "jpg",
            fileName: "Chữ ký 1"
        }
    },
]

export default function F_xnbdhfktmx_Read() {
    const [importData, setImportData] = useState(false);
    const form = useForm<any>({
        initialValues: {
            importData: [],
        },
    });

    const danhMucChuKiQuery = useQuery({
        queryKey: ["IF_xnbdhfktmx_ReadQuery"],
        queryFn: async () => {
            return mockData;
        },
    })

    const exportConfig = {
        fields: [
            {
                header: "Mã chữ ký",
                fieldName: "maChuKi",
            }
            ,
            {
                header: "Tên Chữ ký",
                fieldName: "tenChuKi",
            },
            {
                header: "Chữ ký 1 VN",
                fieldName: "chucVu1VN",
            },
            {
                header: "Chữ ký 2 VN",
                fieldName: "chucVu2VN",
            },
            {
                header: "Chữ ký 3 VN",
                fieldName: "chucVu3VN",
            },
            {
                header: "Chữ ký 1 EG",
                fieldName: "chucVu1EG",
            },
            {
                header: "Chữ ký 2 EG",
                fieldName: "chucVu2EG",
            },
            {
                header: "Chữ ký 3 EG",
                fieldName: "chucVu3EG",
            },
            {
                header: "Ghi Chú",
                fieldName: "ghiChu"
            },
            {
                header: "Tải File lên",
                fieldName: "uploadFile"
            }
        ]
    }
    //collumns Table
    const danhMucChuKiColumns = useMemo<MRT_ColumnDef<F_xnbdhfktmx_Read>[]>(() => [
        {
            header: "Mã Chữ ký",
            accessorKey: "maChuKi",
        },
        {
            header: "Tên Chữ ký",
            accessorKey: "tenChuKi",
        },
        {
            header: "Chữ ký 1 VN",
            accessorKey: "chucVu1VN",
        },
        {
            header: "Chữ ký 2 VN",
            accessorKey: "chucVu2VN",
        },
        {
            header: "Chữ ký 3 VN",
            accessorKey: "chucVu3VN",
        },
        {
            header: "Chữ ký 1 EG",
            accessorKey: "chucVu1EG",
        },
        {
            header: "Chữ ký 2 EG",
            accessorKey: "chucVu2EG",
        },
        {
            header: "Chữ ký 3 EG",
            accessorKey: "chucVu3EG",
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu",
        },
        {
            header: "Tải file lên",
            accessorKey: "uploadFile",
            accessorFn: (row) => {
                return (
                    <Text>{row.uploadFile.fileName}</Text>
                )
            }
        },
    ], []);

    if (danhMucChuKiQuery.isLoading) return "Đang tải dữ liệu..."
    if (danhMucChuKiQuery.isError) return "Lỗi tải dữ liệu..."

    return (
        <>
            <MyFieldset title="Danh sách chữ ký">
                <MyDataTable
                    columns={danhMucChuKiColumns}
                    data={danhMucChuKiQuery.data!}
                    enableRowSelection={true}
                    enableRowNumbers={true}

                    renderTopToolbarCustomActions={() =>
                        <>
                            <F_xnbdhfktmx_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form}
                                onSubmit={() => { }}
                            />
                            <AQButtonExportData
                                exportConfig={exportConfig}
                                data={danhMucChuKiQuery.data!}
                                isAllData={true}
                                objectName="Danh Sách chữ ký"
                            />

                            <MyButton
                                crudType="delete"
                            />
                        </>
                    }

                    renderRowActions={({ row }) => {
                        return (
                            <MyCenterFull>
                                <F_xnbdhfktmx_Update data={row.original} />
                                <F_xnbdhfktmx_Delete id={row.original.id} />
                            </MyCenterFull>
                        )

                    }}
                />

            </MyFieldset>

        </>
    );
}
