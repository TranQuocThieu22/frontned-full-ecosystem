'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Checkbox, Fieldset, Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_6cj3887sci_BoChonTatCa from "./F_6cj3887sci_BoChonTatCa";
import F_6cj3887sci_ChonTheoBuoi from "./F_6cj3887sci_ChonTheoBuoi";
import { useS_6cj3887sci } from "./S_6cj3887sci";

interface I {
    id?: number
    tietThu?: number;
    thuHai?: boolean;
    thuBa?: boolean;
    thuTu?: boolean;
    thuNam?: boolean;
    thuSau?: boolean;
    thuBay?: boolean;
    chuNhat?: boolean;
    ngayCapNhat?: Date; // tự thêm vào interface
    nguoiCapNhat?: string; // tự thêm vào interface
}

export default function F_6cj3887sci_Read() {
    const store = useS_6cj3887sci()

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Tiết thứ",
            accessorKey: "tietThu",
        },
        {
            header: "Thứ Hai",
            accessorKey: "thuHai",
            Cell: ({ cell, row }) => {
                return <MyCenterFull><Checkbox onChange={(e) => { store.toggleThu(row.original.id!, "thuHai") }} checked={store.getBooleanByThuVaId(row.original.id!, 'thuHai')} /></MyCenterFull>
            },
            size: 40,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableColumnActions: false,
            enableSorting: false,
            enableResizing: false,
        },
        {
            header: "Thứ Ba",
            accessorKey: "thuBa",
            Cell: ({ cell, row }) => {
                return <MyCenterFull><Checkbox onChange={(e) => { store.toggleThu(row.original.id!, "thuBa") }} checked={store.getBooleanByThuVaId(row.original.id!, 'thuBa')} /></MyCenterFull>
            },
            size: 40,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableColumnActions: false,
            enableSorting: false,
            enableResizing: false,
        },
        {
            header: "Thứ Tư",
            accessorKey: "thuTu",
            Cell: ({ cell, row }) => {
                return <MyCenterFull><Checkbox onChange={(e) => { store.toggleThu(row.original.id!, "thuTu") }} checked={store.getBooleanByThuVaId(row.original.id!, 'thuTu')} /></MyCenterFull>
            },
            size: 40,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableColumnActions: false,
            enableSorting: false,
            enableResizing: false,
        },
        {
            header: "Thứ Năm",
            accessorKey: "thuNam",
            Cell: ({ cell, row }) => {
                return <MyCenterFull><Checkbox onChange={(e) => { store.toggleThu(row.original.id!, "thuNam") }} checked={store.getBooleanByThuVaId(row.original.id!, 'thuNam')} /></MyCenterFull>
            },
            size: 40,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableColumnActions: false,
            enableSorting: false,
            enableResizing: false,
        },
        {
            header: "Thứ Sáu",
            accessorKey: "thuSau",
            Cell: ({ cell, row }) => {
                return <MyCenterFull><Checkbox onChange={(e) => { store.toggleThu(row.original.id!, "thuSau") }} checked={store.getBooleanByThuVaId(row.original.id!, 'thuSau')} /></MyCenterFull>
            },
            size: 40,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableColumnActions: false,
            enableSorting: false,
            enableResizing: false,
        },
        {
            header: "Thứ Bảy",
            accessorKey: "thuBay",
            Cell: ({ cell, row }) => {
                return <MyCenterFull><Checkbox onChange={(e) => { store.toggleThu(row.original.id!, "thuBay") }} checked={store.getBooleanByThuVaId(row.original.id!, 'thuBay')} /></MyCenterFull>
            },
            size: 40,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableColumnActions: false,
            enableSorting: false,
            enableResizing: false,
        },
        {
            header: "Chủ Nhật",
            accessorKey: "chuNhat",
            Cell: ({ cell, row }) => {
                return <MyCenterFull><Checkbox onChange={(e) => { store.toggleThu(row.original.id!, "chuNhat") }} checked={store.getBooleanByThuVaId(row.original.id!, 'chuNhat')} /></MyCenterFull>
            },
            size: 40,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableColumnActions: false,
            enableSorting: false,
            enableResizing: false,
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayCapNhat!)),
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
    ], [store]);

    // if (query.isLoading) return "Đang tải dữ liệu...";
    // if (query.isError) return "Không có dữ liệu...";

    return (
        <Fieldset legend="Chỉnh định tiết nghỉ chung trong tuần">
            <MyDataTable
                columns={columns}
                data={store.state.data!}
                enableRowNumbers={false}
                exportAble
                renderTopToolbarCustomActions={() => (
                    <Group>
                        <MyButton crudType="save" />
                        <F_6cj3887sci_BoChonTatCa />
                        <F_6cj3887sci_ChonTheoBuoi />
                    </Group>
                )}
            />
        </Fieldset>
    );
}
