// src/modules-features/admin/lpoa7imbik/F_lpoa7imbik_Read.tsx
'use client';

import { AQButtonCreateByImportFile, AQButtonExportData, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_lpoa7imbik_Delete from "./F_lpoa7imbik_Delete";
import F_lpoa7imbik_Create from "./F_lpoa7imbik_Create";
import F_lpoa7imbik_Update from "./F_lpoa7imbik_Update";
import F_lpoa7imbik_DeleteList from "./F_lpoa7imbik_DeleteList";
import { Anchor } from '@mantine/core';
import F_lpoa7imbik_LichTrinhModal from "./F_lpoa7imbik_LichTrinhModal";

export interface F_lpoa7imbik_Read {
    id: number;
    maTuyenXe: string;    // Mã tuyến xe
    tenTuyenXe: string;   // Tên tuyến xe
    trangThai: string;    // Trạng thái
    bienSoXe: string;     // Biển số xe
    laiXe: string;        // Lái xe
    lichTrinh: string;    // Lịch trình
}

export default function F_lpoa7imbik_Read() {
    const [importData, setImportData] = useState(false);
    const form = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    // Query table
    const tuyenXeQuery = useQuery({
        queryKey: ['F_lpoa7imbik_ReadQuery'],
        queryFn: async () => mockData
    });

    // Export config
    const exportConfig = {
        fields: [
            {
                fieldName: "maTuyenXe",
                header: "Mã tuyến xe"
            },
            {
                fieldName: "tenTuyenXe",
                header: "Tên tuyến xe"
            },
            {
                fieldName: "trangThai",
                header: "Trạng thái"
            },
            {
                fieldName: "bienSoXe",
                header: "Biển số xe"
            },
            {
                fieldName: "laiXe",
                header: "Lái xe"
            },
            {
                fieldName: "lichTrinh",
                header: "Lịch trình"
            }
        ]
    };

    // Column table
    const tuyenXeColumns = useMemo<MRT_ColumnDef<F_lpoa7imbik_Read>[]>(() => [
        {
            accessorKey: 'maTuyenXe',
            header: 'Mã tuyến xe',
        },
        {
            accessorKey: 'tenTuyenXe',
            header: 'Tên tuyến xe',
        },
        {
            accessorKey: 'trangThai',
            header: 'Trạng thái',
        },
        {
            accessorKey: 'bienSoXe',
            header: 'Biển số xe',
            Cell: ({ cell }) => (
                <Anchor href="#" onClick={(e) => {
                    e.preventDefault();
                }}>
                    {cell.getValue<string>()}
                </Anchor>
            ),
        },
        {
            accessorKey: 'laiXe',
            header: 'Lái xe',
            Cell: ({ cell }) => (
                <Anchor href="#" onClick={(e) => {
                    e.preventDefault();
                }}>
                    {cell.getValue<string>()}
                </Anchor>
            ),
        },
        {
            accessorKey: 'lichTrinh',
            header: 'Lịch trình',
            Cell: ({ cell }) => (
                <F_lpoa7imbik_LichTrinhModal lichTrinh={cell.getValue<string>()} />
            ),
        },
    ], []);

    if (tuyenXeQuery.isLoading) return "Đang tải...";
    if (tuyenXeQuery.isError) return "Có lỗi xảy ra!";

    return (
        <>
            <MyFieldset title="Danh sách tuyến xe">
                <MyDataTable
                    columns={tuyenXeColumns}
                    data={tuyenXeQuery.data!}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={() =>
                        <>
                            <F_lpoa7imbik_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form}
                                onSubmit={() => {}}
                            />
                            <AQButtonExportData
                                exportConfig={exportConfig}
                                data={tuyenXeQuery.data!}
                                objectName={'Danh sách tuyến xe'}
                            />
                            <F_lpoa7imbik_DeleteList />
                        </>
                    }
                    renderRowActions={({ row }) =>
                        <>
                            <F_lpoa7imbik_Update data={row.original} />
                            <F_lpoa7imbik_Delete maTuyenXe={row.original.maTuyenXe} />
                        </>
                    }
                />
            </MyFieldset>
        </>
    );
}

const mockData: F_lpoa7imbik_Read[] = [
    {
        id: 1,
        maTuyenXe: 'TD01',
        tenTuyenXe: 'Thủ Đức - Quận 9 - Quận 2',
        trangThai: 'Đang hoạt động',
        bienSoXe: '50A-56985',
        laiXe: 'Tô Ngọc Lâm',
        lichTrinh: 'Lịch trình'
    },
    {
        id: 2,
        maTuyenXe: 'TD02',
        tenTuyenXe: 'Thủ Đức - Quận 1',
        trangThai: 'Đang hoạt động',
        bienSoXe: '50A-78542',
        laiXe: 'Nguyễn Văn An',
        lichTrinh: 'Lịch trình'
    }
];