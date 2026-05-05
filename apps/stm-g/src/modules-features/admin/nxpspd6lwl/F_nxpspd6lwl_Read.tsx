'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyButtonDeleteList from "@/components/Buttons/ButtonCRUD/MyButtonDeleteList";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_nxpspd6lwl_Create from "./F_nxpspd6lwl_Create";
import F_nxpspd6lwl_Delete from "./F_nxpspd6lwl_Delete";
import F_nxpspd6lwl_Update from "./F_nxpspd6lwl_Update";

interface IRead {
    id?: number;
    code?: string;
    name?: string;
    loaiNghiepVu?: string;
    loaiDoiTuong?: string;
    chuKyLapLai?: string;
    tienTo?: string;
    hauto?: string;
    chieuDai?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IRead[] = [
    {
        id: 1,
        code: "MHV",
        name: "Mã học viên",
        loaiNghiepVu: "2",
        loaiDoiTuong: "1",
        chuKyLapLai: "3",
        tienTo: "Tiền tố 1",
        hauto: "Hà nội",
        chieuDai: "Chiều dài 1",
        nguoiCapNhat: "Người cập nhật 1",
        ngayCapNhat: new Date("2024-12-19")
    },
    {
        id: 2,
        code: "BĐT",
        name: "Bộ đếm tiền",
        loaiNghiepVu: "1",
        loaiDoiTuong: "2",
        chuKyLapLai: "3",
        tienTo: "Tiền tố 2",
        hauto: "Hà nội",
        chieuDai: "Chiều dài 2",
        nguoiCapNhat: "Người cập nhật 2",
        ngayCapNhat: new Date("2024-12-19")
    }
]

enum ENUM_BUSINESS_TYPE {
    "Danh sách học viên" = 1,
    "Danh sách phiếu thu" = 2,
}

enum ENUM_OBJECT_TYPE {
    "Toàn đơn vị" = 1,
    "Toàn bộ phòng" = 2,
}

export default function F_nxpspd6lwl_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const Q_data = useQuery({
        queryKey: [`F_nxpspd6lwl_Read`],
        queryFn: async () => {
            return mockData;
        },
    })

    const columns = useMemo<MRT_ColumnDef<IRead>[]>(
        () => [
            {
                header: "Mã bộ đếm",
                accessorKey: "code",
            },
            {
                header: "Tên bộ đếm",
                accessorKey: "name"
            },
            {
                header: "Loại nghiệp vụ",
                accessorKey: "loaiNghiepVu",
                accessorFn(row) {
                    return ENUM_BUSINESS_TYPE[row.loaiNghiepVu as keyof typeof ENUM_BUSINESS_TYPE]
                },
            },
            {
                header: "Loại đối tượng",
                accessorKey: "loaiDoiTuong",
                accessorFn(row) {
                    return ENUM_OBJECT_TYPE[row.loaiDoiTuong as keyof typeof ENUM_OBJECT_TYPE]
                }
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            },
        ],
        []
    );

    if (Q_data.isLoading) return "Đang tải dữ liệu..."
    if (Q_data.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            exportAble
            data={Q_data.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <Group>
                        <F_nxpspd6lwl_Create />
                        <MyButtonDeleteList
                            onSubmit={() => { }}
                        />
                        <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                            console.log(form_multiple.values);
                        }} >s</AQButtonCreateByImportFile>
                    </Group>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_nxpspd6lwl_Update data={row.original} />
                        <F_nxpspd6lwl_Delete id={row.original.id!} code={row.original.code!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}