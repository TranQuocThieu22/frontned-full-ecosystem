'use client'
import { useQuery } from "@tanstack/react-query";
import {
    MyButton,
    MyButtonViewPDF,
    MyCenterFull,
    MyDataTable,
    MyFieldset,
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F9_8_9CreateExchangeReport from "./F9_8_9CreateExchangeReport";
import F9_8_9DeleteExchangeReport from "./F9_8_9DeleteExchangeReport";
import F9_8_9UpdateExchangeReport from "./F9_8_9UpdateExchangeReport";
import { mockDataRead } from "./mockData";
export interface IInfoViewModel {
    maBaoCao?: string;
    maLuotTraoDoi?: string;
    maNguoiDung?: string;
    ngayNopBaoCao?: string;
    tomTatKetQua?: string;
    fileDinhKem?: string;
    danhGiaTongQuan?: string;
    trangThaiBaoCao?: string;
    nguoiDuyetBaoCao?: string;
    ngayDuyetBaoCao?: string;
    ghiChu?: string;
}

export default function F9_8_9ReadExchangeReport() {
    const query = useQuery<IInfoViewModel[]>({
        queryKey: ['F9_8_9ReadExchangeReport'],
        queryFn: async () => mockDataRead
    });

    const columns = useMemo<MRT_ColumnDef<IInfoViewModel>[]>(() => [
        {
            header: "Mã báo cáo",
            accessorKey: "maBaoCao",
        },
        {
            header: "Mã lượt trao đổi",
            accessorKey: "maLuotTraoDoi",
        },
        {
            header: "Mã người dùng",
            accessorKey: "maNguoiDung",
        },
        {
            header: "Ngày nộp báo cáo",
            accessorKey: "ngayNopBaoCao",
            accessorFn: (row) =>
                row.ngayNopBaoCao
                    ? utils_date_dateToDDMMYYYString(new Date(row.ngayNopBaoCao))
                    : "",
        },
        {
            header: "Tóm tắt kết quả",
            accessorKey: "tomTatKetQua",
        },
        {
            header: "File đính kèm",
            accessorKey: "fileDinhKem",
            Cell: ({ cell }) => (
                <MyButtonViewPDF />
            ),
        },
        {
            header: "Đánh giá tổng quan (Cá nhân)",
            accessorKey: "danhGiaTongQuan",
        },
        {
            header: "Trạng thái báo cáo",
            accessorKey: "trangThaiBaoCao",
        },
        {
            header: "Người duyệt báo cáo",
            accessorKey: "nguoiDuyetBaoCao",
        },
        {
            header: "Ngày duyệt báo cáo",
            accessorKey: "ngayDuyetBaoCao",
            accessorFn: (row) =>
                row.ngayDuyetBaoCao
                    ? utils_date_dateToDDMMYYYString(new Date(row.ngayDuyetBaoCao))
                    : "",
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu",
        },
    ], []);

    return (
        <MyFieldset title="Danh sách báo cáo">
            <MyDataTable
                isError={query.isError}
                columns={columns}
                data={query.data || []}
                enableRowSelection
                renderTopToolbarCustomActions={() => (
                    <MyCenterFull>
                        <F9_8_9CreateExchangeReport />
                        <MyButton crudType="import">Import</MyButton>
                        <MyButton crudType="export">Export</MyButton>
                        <MyButton crudType="delete">Xóa</MyButton>
                    </MyCenterFull>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <F9_8_9UpdateExchangeReport values={row.original} />
                        <F9_8_9DeleteExchangeReport id={row.original.maBaoCao!} />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    );
}
