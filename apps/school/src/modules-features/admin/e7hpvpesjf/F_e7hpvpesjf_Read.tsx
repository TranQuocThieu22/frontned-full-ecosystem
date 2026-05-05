// src/modules-features/admin/e7hpvpesjf/F_e7hpvpesjf_Read.tsx
'use client';

import {AQButtonCreateByImportFile, AQButtonExportData, MyDataTable, MyFieldset} from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_e7hpvpesjf_Create from "./F_e7hpvpesjf_Create";
import F_e7hpvpesjf_Update from "./F_e7hpvpesjf_Update";
import F_e7hpvpesjf_Delete from "./F_e7hpvpesjf_Delete";
import F_e7hpvpesjf_DeleteList from "./F_e7hpvpesjf_DeleteList";
import F_e7hpvpesjf_LichBaoTriModal from "./F_e7hpvpesjf_LichBaoTriModal";
import F_e7hpvpesjf_TuyenChayModal from "./F_e7hpvpesjf_TuyenChayModal";
import F_e7hpvpesjf_TaiXeModal from "./F_e7hpvpesjf_TaiXeModal";

export interface F_e7hpvpesjf_Read {
    id: number;
    bienSoXe: string;
    loaiXe: string;
    soGhe: number;
    trangThai: string;
    lichBaoTri: string;
    tuyenChay: string;
    taiXe: string;
}

export default function F_e7hpvpesjf_Read() {
    const [importData, setImportData] = useState(false);
    const form = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    // Query table
    const danhSachXeQuery = useQuery({
        queryKey: ['F_e7hpvpesjf_ReadQuery'],
        queryFn: async () => mockData
    });

    // Export config
    const exportConfig = {
        fields: [
            {
                fieldName: "bienSoXe",
                header: "Biển số xe"
            },
            {
                fieldName: "loaiXe",
                header: "Loại xe"
            },
            {
                fieldName: "soGhe",
                header: "Số chỗ"
            },
            {
                fieldName: "trangThai",
                header: "Trạng thái"
            },
            {
                fieldName: "lichBaoTri",
                header: "Lịch bảo trì"
            },
            {
                fieldName: "tuyenChay",
                header: "Tuyến chạy"
            },
            {
                fieldName: "taiXe",
                header: "Tài xế"
            }
        ]
    }

    // Column table
    const danhSachXeColumns = useMemo<MRT_ColumnDef<F_e7hpvpesjf_Read>[]>(() => [
        {
            accessorKey: 'bienSoXe',
            header: 'Biển số xe',
        },
        {
            accessorKey: 'loaiXe',
            header: 'Loại xe',
        },
        {
            accessorKey: 'soGhe',
            header: 'Số chỗ',
        },
        {
            accessorKey: 'trangThai',
            header: 'Trạng thái',
        },
        // In F_e7hpvpesjf_Read.tsx, update the column definition
        {
            accessorKey: 'lichBaoTri',
            header: 'Lịch bảo trì',
            Cell: ({ cell }) => (
                <F_e7hpvpesjf_LichBaoTriModal lichBaoTri={cell.getValue<string>()} />
            )
        },
        {
            accessorKey: 'tuyenChay',
            header: 'Tuyến chạy',
            Cell: ({ cell }) => (
                <F_e7hpvpesjf_TuyenChayModal tuyenChay={cell.getValue<string>()} />
            )
        },
        {
            accessorKey: 'taiXe',
            header: 'Tài xế',
            Cell: ({ cell }) => (
                <F_e7hpvpesjf_TaiXeModal taiXe={cell.getValue<string>()} />
            )
        },
    ], []);

    if (danhSachXeQuery.isLoading) return "Đang tải...";
    if (danhSachXeQuery.isError) return "Có lỗi xảy ra!";

    return(
        <>
            <MyFieldset title="Danh sách xe">
                <MyDataTable
                    columns={danhSachXeColumns}
                    data={danhSachXeQuery.data!}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={()=>
                        <>
                            <F_e7hpvpesjf_Create/>
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form}
                                onSubmit={() => console.log(form.values) }
                            />
                            <AQButtonExportData
                                exportConfig={exportConfig}
                                data={danhSachXeQuery.data!}
                                objectName={'Danh sách xe'}
                            />
                            <F_e7hpvpesjf_DeleteList/>
                        </>
                    }
                    renderRowActions={({ row }) =>
                        <>
                            <F_e7hpvpesjf_Update data={row.original}/>
                            <F_e7hpvpesjf_Delete bienSoXe={row.original.bienSoXe} />
                        </>
                    }
                />
            </MyFieldset>
        </>
    );
}

const mockData: F_e7hpvpesjf_Read[] = [
    {
        id: 1,
        bienSoXe: '50A-45862',
        loaiXe: 'Bus',
        soGhe: 12,
        trangThai: 'Đang hoạt động',
        lichBaoTri: '15/02/2025',
        tuyenChay: 'Thủ Đức - Quận 2-Quận 9',
        taiXe: 'Tô Ngọc Bảo'
    }
]