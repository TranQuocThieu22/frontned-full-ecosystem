'use client'
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F9_8_5CreateExchangeRegister from "./F9_8_5CreateExchangeRegister";
import F9_8_5DeleteExchangeRegister from "./F9_8_5DeleteExchangeRegister";
import F9_8_5UpdateExchangeRegister from "./F9_8_5UpdateExchangeRegister";
import { mockDataRead } from "./mockData";

export interface IInfoViewModel {
    maHoSo?: string; //Mã Hồ Sơ
    tenNguoiDangKy?: string; //Tên Người Đăng Ký
    chuongTrinh?: string; //Chương trình
    doiTac?: string; //Đối tác
    chieuDangKy?: string; //Chiều Đăng Ký
    trangThaiHoSo?: string; //Trạng Thái Hồ Sơ
    ngayDangKy?: string; //Ngày Đăng Ký
}



export default function F9_8_5ReadExchangeRegister() {
    const query = useQuery<IInfoViewModel[]>({
        queryKey: ['F9_8_5ReadExchangeRegister'],
        queryFn: async () => mockDataRead
    });

    const columns = useMemo<MRT_ColumnDef<IInfoViewModel>[]>(
        () => [
            {
                header: "Mã hồ sơ",
                accessorKey: "maHoSo",
            },
            {
                header: "Tên người đăng ký",
                accessorKey: "tenNguoiDangKy",
            },
            {
                header: "Chương trình",
                accessorKey: "chuongTrinh",
            },
            {
                header: "Đối tác",
                accessorKey: "doiTac",
            },
            {
                header: "Chiều đăng ký",
                accessorKey: "chieuDangKy",
            },
            {
                header: "Trạng thái hồ sơ",
                accessorKey: "trangThaiHoSo",
            },
            {
                header: "Ngày đăng ký",
                accessorKey: "ngayDangKy",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayDangKy!)),
            },
        ],
        []
    );

    return (
        <MyFieldset title="Danh sách hồ sơ đăng ký">
            <MyDataTable
                isError={query.isError}
                columns={columns}
                data={query.data || []}
                renderTopToolbarCustomActions={() => (
                    <MyCenterFull>
                        <F9_8_5CreateExchangeRegister />
                        <MyButton crudType="import" >Import</MyButton>
                        <MyButton crudType="export" >Export</MyButton>
                        <MyButton crudType="delete" >Delete</MyButton>
                    </MyCenterFull> 
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                       <F9_8_5UpdateExchangeRegister values={row.original} />
                       <F9_8_5DeleteExchangeRegister id={row.original.maHoSo!} />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    );
}