// src/modules-features/admin/v9g6ko7dbi/F_v9g6ko7dbi_Read.tsx
'use client';

import {AQButtonCreateByImportFile, AQButtonExportData, MyCenterFull, MyDataTable, MyFieldset} from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_v9g6ko7dbi_Delete from "./F_v9g6ko7dbi_Delete";
import F_v9g6ko7dbi_Create from "./F_v9g6ko7dbi_Create";
import F_v9g6ko7dbi_Update from "./F_v9g6ko7dbi_Update";
import F_v9g6ko7dbi_DeleteList from "./F_v9g6ko7dbi_DeleteList";

export interface F_v9g6ko7dbi_Read {
    id: number;
    maSuKien: string; // Mã sự kiện
    tenSuKien: string; // Tên sự kiện
    ngayToChuc: string; // Ngày tổ chức
    gioBatDau: string; // Giờ bắt đầu
    thoiGian: number; // Thời gian (phút)
    diaDiem: string; // Địa điểm
    trangThai: string; // Trạng thái
    lePhi: number; // Lệ phí
    maHocSinh: string; // Mã học sinh
    hoTen: string; // Họ tên
    lop: string; // Lớp
    gioiTinh: string; // Giới tính
    ngaySinh: string; // Ngày sinh
    ngayDangKy: string; // Ngày đăng ký
}

export default function F_v9g6ko7dbi_Read() {
    const [importData, setImportData] = useState(false);
    const form = useForm<any>({
        initialValues: {
            importedData: []
        }
    });

    // Query table
    const dangKySuKienQuery = useQuery({
        queryKey: ['F_v9g6ko7dbi_ReadQuery'],
        queryFn: async () => mockData
    });

    // Export config
    const exportConfig = {
        fields: [
            {
                fieldName: "maSuKien",
                header: "Mã sự kiện"
            },
            {
                fieldName: "tenSuKien",
                header: "Tên sự kiện"
            },
            {
                fieldName: "ngayToChuc",
                header: "Ngày tổ chức"
            },
            {
                fieldName: "gioBatDau",
                header: "Giờ bắt đầu"
            },
            {
                fieldName: "thoiGian",
                header: "Thời gian"
            },
            {
                fieldName: "diaDiem",
                header: "Địa điểm"
            },
            {
                fieldName: "trangThai",
                header: "Trạng thái"
            },
            {
                fieldName: "lePhi",
                header: "Lệ phí"
            },
            {
                fieldName: "maHocSinh",
                header: "Mã học sinh"
            },
            {
                fieldName: "hoTen",
                header: "Họ tên"
            },
            {
                fieldName: "lop",
                header: "Lớp"
            },
            {
                fieldName: "gioiTinh",
                header: "Giới tính"
            },
            {
                fieldName: "ngaySinh",
                header: "Ngày sinh"
            },
            {
                fieldName: "ngayDangKy",
                header: "Ngày đăng ký"
            }
        ]
    }

    // Column table
    const dangKySuKienColumns = useMemo<MRT_ColumnDef<F_v9g6ko7dbi_Read>[]>(() => [
        {
            accessorKey: 'maSuKien',
            header: 'Mã sự kiện',
        },
        {
            accessorKey: 'tenSuKien',
            header: 'Tên sự kiện',
        },
        {
            accessorKey: 'ngayToChuc',
            header: 'Ngày tổ chức',
        },
        {
            accessorKey: 'gioBatDau',
            header: 'Giờ bắt đầu',
        },
        {
            accessorKey: 'thoiGian',
            header: 'Thời gian (phút)',
        },
        {
            accessorKey: 'diaDiem',
            header: 'Địa điểm',
        },
        {
            accessorKey: 'trangThai',
            header: 'Trạng thái',
        },
        {
            accessorKey: 'lePhi',
            header: 'Lệ phí',
            Cell: ({ cell }) => {
                return cell.getValue<number>().toLocaleString('vi-VN') + ' đ';
            },
        },
        {
            accessorKey: 'maHocSinh',
            header: 'Mã học sinh',
        },
        {
            accessorKey: 'hoTen',
            header: 'Họ tên',
        },
        {
            accessorKey: 'lop',
            header: 'Lớp',
        },
        {
            accessorKey: 'gioiTinh',
            header: 'Giới tính',
        },
        {
            accessorKey: 'ngaySinh',
            header: 'Ngày sinh',
        },
        {
            accessorKey: 'ngayDangKy',
            header: 'Ngày đăng ký',
        },
    ], []);

    if (dangKySuKienQuery.isLoading) return "Đang tải...";
    if (dangKySuKienQuery.isError) return "Có lỗi xảy ra!";

    return(
        <>
            <MyFieldset title="Danh sách đăng ký tham gia sự kiện">
                <MyDataTable
                    columns={dangKySuKienColumns}
                    data={dangKySuKienQuery.data!}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={()=>
                        <>
                            <F_v9g6ko7dbi_Create/>
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form}
                                onSubmit={() => console.log(form.values) }
                            />
                            <AQButtonExportData
                                exportConfig={exportConfig}
                                data={dangKySuKienQuery.data!}
                                objectName={'Danh sách đăng ký sự kiện'}
                            />
                            <F_v9g6ko7dbi_DeleteList/>
                        </>
                    }
                    renderRowActions={({ row }) =>
                        <MyCenterFull>
                            <F_v9g6ko7dbi_Update data={row.original}/>
                            <F_v9g6ko7dbi_Delete maSuKien={row.original.maSuKien} />
                        </MyCenterFull>
                    }
                />
            </MyFieldset>
        </>
    );
}

const mockData: F_v9g6ko7dbi_Read[] = [
    {
        id: 1,
        maSuKien: 'SK0001',
        tenSuKien: 'Đêm hài Holown',
        ngayToChuc: '30/10/2024',
        gioBatDau: '07:00',
        thoiGian: 180,
        diaDiem: 'Hội trường A',
        trangThai: 'Sắp diễn ra',
        lePhi: 150000,
        maHocSinh: 'H30001',
        hoTen: 'Tô Ngọc Linh',
        lop: '1146',
        gioiTinh: 'Nữ',
        ngaySinh: '01/02/2000',
        ngayDangKy: '15/02/2025 14:00:25'
    }
]