'use client'

import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_ockauugnrsCreate from "./F_ockauugnrsCreate";
import F_ockauugnrsDelete from "./F_ockauugnrsDelete";
import F_ockauugnrsUpdate from "./F_ockauugnrsUpdate";

export interface I_ockauugnrs {
    id?: number, maNhanSu?: string, hoLot?: string, ten?: string, gioiTinh?: string, ngaySinh?: Date, soDienThoai?: string, email?: string
}
export default function F_ockauugnrsRead(
) {
    const query = useQuery<I_ockauugnrs[]>({
        queryKey: ['I_ockauugnrsRead'],
        queryFn: async () => {
            // const result = await baseAxios.get("/DocumentAttribute/GetByType?", { params: { documentType } })
            // return result.data?.data || []
            return mockData || []
        },
    })

    const columns = useMemo<MRT_ColumnDef<I_ockauugnrs>[]>(
        () => [
            {
                header: "Mã nhân sự",
                accessorKey: "maNhanSu"
            },
            {
                header: "Họ Lót",
                accessorKey: "hoLot"
            },
            {
                header: "Tên",
                accessorKey: "ten"
            },
            {
                header: "Giới tính",
                accessorKey: "gioiTinh"
            },
            {
                header: "Ngày sinh",
                accessorKey: "ngaySinh",
                Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString("vi-VN")
            },
            {
                header: "Số điện thoại",
                accessorKey: "soDienThoai"
            },
            {
                header: "Email",
                accessorKey: "email"
            }
        ],
        []
    );

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })


    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MyDataTable
            exportAble
            columns={columns}
            enableRowNumbers={true}
            data={query.data!}
            renderTopToolbarCustomActions={() => {
                return (
                    <Group>
                        <F_ockauugnrsCreate />
                        <AQButtonCreateByImportFile setImportedData={(data) => console.log("Imported Data:", data)} onSubmit={() => { }} form={form_multiple} />
                        <Button color="red" leftSection={<IconTrash />}>Xóa</Button>
                    </Group>)
            }}
            renderRowActions={({ row }) => {
                return (
                    <Group>
                        <F_ockauugnrsUpdate values={row.original} />
                        <F_ockauugnrsDelete id={row.original.id!} maNhanSu={row.original.maNhanSu!} />
                    </Group>
                )
            }}
        />
    )
}

const mockData: I_ockauugnrs[] = [{
    maNhanSu: "NS0001",
    hoLot: "Bảo",
    ten: "Tô Ngọc",
    gioiTinh: "Nam",
    ngaySinh: new Date(2000, 0, 1),
    soDienThoai: "0898635874",
    email: "bao@gmail.com"
}]

