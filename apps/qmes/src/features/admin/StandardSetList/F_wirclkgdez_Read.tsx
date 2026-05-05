
import AQButtonExportData from "@/components/ui/Buttons/ButtonCRUD/AQButtonExportData";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_wirclkgdez_Create from "./F_wirclkgdez_Create";
import F_wirclkgdez_Delete from "./F_wirclkgdez_Delete";
import F_wirclkgdez_Update from "./F_wirclkgdez_Update";

interface I_wirclkgdez {
    id?: number,
    maBoTieuChuan?: string,
    tenBoTieuChuan?: string,
    nguoiCapNhat?: string,
    ngayCapNhat?: Date
}
export default function F_wirclkgdez_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<I_wirclkgdez>({
        initialValues: {
        },
    })
    const query = useQuery<I_wirclkgdez[]>(
        {
            queryKey: [`F_wirclkgdez_Read`],
            queryFn: async () => sampleData
        }
    )
    const columns = useMemo<MRT_ColumnDef<I_wirclkgdez>[]>(() => [
        {
            header: "Mã bộ tiêu chuẩn",
            accessorKey: "maBoTieuChuan"
        },
        {
            header: "Tên bộ tiêu chuẩn",
            accessorKey: "tenBoTieuChuan"
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (originalRow) =>
                originalRow.ngayCapNhat ? U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat)) : "",
        }
    ], [])
    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "maBoTieuChuan", header: "Mã bộ tiêu chuẩn" },
            { fieldName: "tenBoTieuChuan", header: "Tên bộ tiêu chuẩn" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ]
    }
    if (!query.data) {
        return <div>Loading...</div>
    }
    return (
        <Fieldset legend="Danh sách bộ tiêu chuẩn">
            <MyDataTable
                enableRowSelection={true}
                enableRowNumbers={true}

                columns={columns}
                data={query.data!}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <F_wirclkgdez_Create />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                console.log(form_multiple.values);

                            }} >s</AQButtonCreateByImportFile>
                            <AQButtonExportData
                                isAllData={true}
                                objectName="Danh sách bộ tiêu chuẩn"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <>
                            <F_wirclkgdez_Update data={row.original!} />
                            <F_wirclkgdez_Delete id={row.original.id!} maBoTieuChuan={row.original.maBoTieuChuan!} />
                        </>
                    )
                }
                }
            />
        </Fieldset>
    )
}

const sampleData: I_wirclkgdez[] = [
    {
        id: 1,
        maBoTieuChuan: "TT01-2024",
        tenBoTieuChuan: "Thông tư 01/2024/TT-BGDĐT về chuẩn cơ sở giáo dục đại học",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2025-02-25")

    }
] 