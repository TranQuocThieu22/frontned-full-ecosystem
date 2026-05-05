'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { IconTrash } from "@tabler/icons-react";
import F4_5Create from "./F4_5Create";
import F4_5Update from "./F4_5Update";
import F4_5Delete from "./F4_5Delete";
// REVIEW: 48246 F4_5Read

export interface IStockCheck {
    id?: number;
    date?: Date | undefined;
    code?: string
    note?: string
    price?: number
    sendDate?: Date | undefined;
    notificationTitle?: string
    content?: string
    receiver?: string[]
    file?: File | null;

    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

let mockData = [
    {
        id: 1,
        date: new Date("2024-01-15T00:00:00Z"),
        code: "GG0253",
        price: 12000000,
        note: "Thanh Lý Tivi",
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date()
    },
]

export default function F4_5Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [tempData, setTempData] = useState<IStockCheck[]>([]);

    const stockCheck = useQuery<IStockCheck[]>({
        queryKey: [`F4_5Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })

    useEffect(() => {
        if (stockCheck.data) {
            setTempData(stockCheck.data); // Sao chép dữ liệu từ query
        }
    }, [stockCheck.data]);

    const handleDeleteAllRows = () => {
        setTempData([]); // Xóa toàn bộ dữ liệu
    };

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const formatFunctions = {
        birthDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };

    const exportConfig = {
        fields: [
            {
                fieldName: "date",
                header: "Ngày chứng từ"
            },
            {
                fieldName: "code",
                header: "Số chứng từ"
            },
            {
                fieldName: "note",
                header: "Ghi chú"
            },

        ]
    };

    const columns = useMemo<MRT_ColumnDef<IStockCheck>[]>(
        () => [
            {
                header: "Ngày chứng từ",
                accessorKey: "date",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.date!));
                },
            },
            {
                accessorKey: "code",
                header: "Số chứng từ"
            },
            {
                header: "Ghi chú",
                accessorKey: "note",
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            }
        ]
        ,
        []
    );

    if (stockCheck.isLoading) return "Đang tải dữ liệu..."
    if (stockCheck.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={tempData}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F4_5Create />
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
                                data={stockCheck.data!}
                                exportConfig={exportConfig}
                            />

                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F4_5Update data={row.original} />
                        <F4_5Delete DeleteCourseId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

const stockCheck = {

}

