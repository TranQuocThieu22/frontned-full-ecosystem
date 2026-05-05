'use client';

import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_cgbkl8o4nr_Delete from "./F_cgbkl8o4nr_Delete";
import F_cgbkl8o4nr_Create from "./F_cgbkl8o4nr_Create";
import F_cgbkl8o4nr_Update from "./F_cgbkl8o4nr_Update";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { NumberFormatter } from "@mantine/core";


export default function F_cgbkl8o4nr_Read() {
    const [importData, setImportData] = useState(false);

    const form_mutiple = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    // Query table
    const danhSachSuKienQuery = useQuery({
        queryKey: ['F_cgbkl8o4nr_ReadQuery'],
        queryFn: async () => mockData
    });

    //export config
    const exportConfig = {
        fields: [
            {
                fieldName: 'maSuKien',
                header: 'Mã sự kiện',
            },
            {
                fieldName: 'tenSuKien',
                header: 'Tên sự kiện',
            },
            {
                fieldName: 'ngayToChuc',
                header: 'Ngày tổ chức',
            },
            {
                fieldName: 'gioBatDau',
                header: 'Giờ bắt đầu',
            },
            {
                fieldName: 'thoiGian',
                header: 'Thời gian',
            },
            {
                fieldName: 'soLuongDuKien',
                header: 'Số lượng dự kiến',
            },
            {
                fieldName: 'ngayBatDauDangKy',
                header: 'Ngày bắt đầu đăng ký',
            },
            {
                fieldName: 'ngayKetThucDangKy',
                header: 'Ngày kết thúc đăng ký',
            },
            {
                fieldName: 'trangThai',
                header: 'Trạng thái',
            },
            {
                fieldName: 'lePhi',
                header: 'Lệ phí',
            },
        ]
    }

    // column table
    const danhMucBoDemColumns = useMemo<MRT_ColumnDef<I_F_cgbkl8o4nr_Read>[]>(() => [
        {
            accessorKey: 'maSuKien',
            header: 'Mã sự kiện',
        },
        {
            accessorKey: 'tenSuKien',
            header: 'Tên sự kiện',
        },
        {
            accessorKey: 'ngayToChuc',
            header: 'Ngày tổ chức',
            Cell({ row }) {
                return (utils_date_dateToDDMMYYYString(row.original.ngayToChuc));
            },
        },
        {
            accessorKey: 'gioBatDau',
            header: 'Giờ bắt đầu',
        },
        {
            accessorKey: 'thoiGian',
            header: 'Thời gian',
        },
        {
            accessorKey: 'soLuongDuKien',
            header: 'Số lượng dự kiến',
        },
        {
            accessorKey: 'ngayBatDauDangKy',
            header: 'Ngày bắt đầu đăng ký',
            Cell({ row }) {
                return (utils_date_dateToDDMMYYYString(row.original.ngayBatDauDangKy));
            },
        },
        {
            accessorKey: 'ngayKetThucDangKy',
            header: 'Ngày kết thúc đăng ký',
            Cell({ row }) {
                return (utils_date_dateToDDMMYYYString(row.original.ngayKetThucDangKy));
            },
        },
        {
            accessorKey: 'trangThai',
            header: 'Trạng thái',
        },
        {
            accessorKey: 'lePhi',
            header: 'Lệ phí',
            Cell({ row }) {
                return (<NumberFormatter
                    thousandSeparator="."
                    decimalSeparator=","
                    value={row.original.lePhi}
                />
                )
            },
        },
    ], []);

    if (danhSachSuKienQuery.isLoading) return "Đang tải...";
    if (danhSachSuKienQuery.isError) return "Có lỗi xảy ra!";

    return (
        <>
            <MyFieldset title="Danh sách sự kiện">
                <MyDataTable
                    columns={danhMucBoDemColumns}
                    data={danhSachSuKienQuery.data!}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={() =>
                        <>
                            <F_cgbkl8o4nr_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form_mutiple}
                                onSubmit={() => console.log(form_mutiple.values)}

                            />
                            <AQButtonExportData
                                exportConfig={exportConfig}
                                data={danhSachSuKienQuery.data!}
                                objectName={'DanhSachSuKien'}
                            />
                            <MyButton crudType="delete">Xóa</MyButton>
                        </>
                    }
                    renderRowActions={({ row }) =>
                        <>
                            <F_cgbkl8o4nr_Update data={row.original} />
                            <F_cgbkl8o4nr_Delete id={row.original.maSuKien} />
                        </>
                    }
                />
            </MyFieldset>
        </>
    );



}

const mockData: I_F_cgbkl8o4nr_Read[] = [
    {
        id: 1,
        maSuKien: "SK0001",
        tenSuKien: "Đêm hội Halowin",
        ngayToChuc: new Date("10/30/2024"),
        gioBatDau: '07:00',
        thoiGian: "180 phút",
        soLuongDuKien: 150,
        ngayBatDauDangKy: new Date("10/15/2024"),
        ngayKetThucDangKy: new Date("10/25/2024"),
        trangThai: "Sắp diễn ra",
        lePhi: 15000000,
        ghiChu: "???"
    }
]

const trangThaiSelectData: I_F_cgbkl8o4nr_TrangThai[] = [
    {
        tenTrangThai: "Sắp diễn ra",
        id: "1",
    },
    {
        tenTrangThai: "Đã hoàn thành",
        id: "2",
    },
    {
        tenTrangThai: "Đã hủy",
        id: "3",
    }
]

export interface I_F_cgbkl8o4nr_Read {
    id: number;
    maSuKien: string;
    tenSuKien: string;
    ngayToChuc: Date;
    gioBatDau: string;
    thoiGian: string;
    soLuongDuKien: number;
    ngayBatDauDangKy: Date;
    ngayKetThucDangKy: Date;
    trangThai: string;
    lePhi: number;
    ghiChu: string;
}

export interface I_F_cgbkl8o4nr_TrangThai {
    id: string;
    tenTrangThai: string;
}

