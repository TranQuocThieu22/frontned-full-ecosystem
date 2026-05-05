// src/modules-features/admin/vuinrzvnj8/F_vuinrzvnj8_Read.tsx
'use client';

import {
    AQButtonCreateByImportFile,
    AQButtonExportData,
    MyButton,
    MyDataTable,
    MyFieldset
} from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_vuinrzvnj8_Delete from "./F_vuinrzvnj8_Delete";
import F_vuinrzvnj8_Create from "./F_vuinrzvnj8_Create";
import F_vuinrzvnj8_Update from "./F_vuinrzvnj8_Update";

export interface F_vuinrzvnj8_Read {
    id: number;
    maHocSinh: string;
    hoLot: string;
    ten: string;
    ngaySinh: string;
    gioiTinh: string;
    tienSuBenh: string;
    ghiChu: string;
}

export default function F_vuinrzvnj8_Read() {
    const [importData, setImportData] = useState(false);
    const form = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    // Query table
    const tienSuBenhQuery = useQuery({
        queryKey: ['F_vuinrzvnj8_ReadQuery'],
        queryFn: async () => mockData
    });

    // Export config
    const exportConfig = {
        fields: [
            {
                fieldName: "maHocSinh",
                header: "Mã học sinh"
            },
            {
                fieldName: "hoLot",
                header: "Họ lót"
            },
            {
                fieldName: "ten",
                header: "Tên"
            },
            {
                fieldName: "ngaySinh",
                header: "Ngày sinh"
            },
            {
                fieldName: "gioiTinh",
                header: "Giới tính"
            },
            {
                fieldName: "tienSuBenh",
                header: "Tiền sử bệnh lý"
            },
            {
                fieldName: "ghiChu",
                header: "Ghi chú tiền sử bệnh"
            }
        ]
    }

    // Column table
    const tienSuBenhColumns = useMemo<MRT_ColumnDef<F_vuinrzvnj8_Read>[]>(() => [
        {
            accessorKey: 'maHocSinh',
            header: 'Mã học sinh',
        },
        {
            accessorKey: 'hoLot',
            header: 'Họ lót',
        },
        {
            accessorKey: 'ten',
            header: 'Tên',
        },
        {
            accessorKey: 'ngaySinh',
            header: 'Ngày sinh',
        },
        {
            accessorKey: 'gioiTinh',
            header: 'Giới tính',
        },
        {
            accessorKey: 'tienSuBenh',
            header: 'Tiền sử bệnh lý',
        },
        {
            accessorKey: 'ghiChu',
            header: 'Ghi chú tiền sử bệnh',
        },
    ], []);

    if (tienSuBenhQuery.isLoading) return "Đang tải...";
    if (tienSuBenhQuery.isError) return "Có lỗi xảy ra!";

    return(
        <>
            <MyFieldset title="Danh sách tiền sử bệnh của học sinh">
                <MyDataTable
                    columns={tienSuBenhColumns}
                    data={tienSuBenhQuery.data!}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={()=>
                        <>
                            <F_vuinrzvnj8_Create/>
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form}
                                onSubmit={() => console.log(form.values) }
                            />
                            <AQButtonExportData
                                exportConfig={exportConfig}
                                data={tienSuBenhQuery.data!}
                                objectName={'Danh sách tiền sử bệnh'}
                            />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    }
                    renderRowActions={({ row }) =>
                        <>
                            <F_vuinrzvnj8_Update data={row.original}/>
                            <F_vuinrzvnj8_Delete maHocSinh={row.original.maHocSinh} />
                        </>
                    }
                />
            </MyFieldset>
        </>
    );
}

const mockData: F_vuinrzvnj8_Read[] = [
    {
        id: 1,
        maHocSinh: 'HS000001',
        hoLot: 'Tô Ngọc',
        ten: 'Lâm',
        ngaySinh: '01/01/2000',
        gioiTinh: 'Nam',
        tienSuBenh: 'Hô hấp kém',
        ghiChu: 'Cần theo dõi khi tham gia hoạt động thể thao'
    }
]