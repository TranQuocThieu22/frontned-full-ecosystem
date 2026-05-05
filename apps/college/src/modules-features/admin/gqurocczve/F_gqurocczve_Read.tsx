'use client';
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Checkbox } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_gqurocczve_Update from "./F_gqurocczve_Update";
export interface I {
    id?: number; // STT
    reasonsCode?: string; // Mã lý do
    name?: string //Tên lý do
    type?: number; // loại vào,ra
    checkD?:boolean;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_gqurocczve_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I[]>({
        queryKey: [`ListOfReasons`],
        queryFn: async () => [
            {
                id: 1,
                reasonsCode: "0100",
                name: "Học phí niên chế",
                type: 1,
                checkD:true,
                nguoiCapNhat: "Quản trị viên",
                
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2,
                reasonsCode: "0110",
                name: "Học lại niên chế",
                type: 2,
                checkD:true,
                nguoiCapNhat: "Quản trị viên",
                
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id:3,
                reasonsCode: "0200",
                name: "Học phí tín chỉ",
                type: 3,
                checkD:true,
                nguoiCapNhat: "Quản trị viên",
                
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 4,
                reasonsCode: "0210",
                name: "Học lại tín chỉ",
                type: 4,
                checkD:true,
                nguoiCapNhat: "Quản trị viên",
                
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 5,
                reasonsCode: "0300",
                name: "Lệ phí thi lại",
                type: 5,
                checkD:true,
                nguoiCapNhat: "Quản trị viên",
                
                ngayCapNhat: new Date("2024-12-23")
            },

            // {
            //     id: 2,
            //     courseCode: "CNTT",
            //     name: "Công nghệ thông tin",
            //     khoaQuanLy: 2,
            //     nguoiCapNhat: "Quản trị viên",
            //     ngayCapNhat: new Date("2024-12-23")
            // },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã loại thu",
            accessorKey: "reasonsCode",
        },
        {
            header: "Tên loại thu",
            accessorKey: "name",
        },
        {
            header: "Ưu tiên phân bố",
            accessorKey: "type",
            // accessorFn: (row) => {
            //     if (row.type === "1") return "Quyết định vào mới";
               
            // }
        },
        {
            header: "Có cấp chứng chỉ chứng nhận",
            accessorKey: "checkD",
            Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",

        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },

        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
        enableRowSelection={true}
            columns={columns}
            data={query.data!}
            exportAble
            renderTopToolbarCustomActions={() =>
                <>
                   
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_gqurocczve_Update doituong={{ ...row.original, type: row.original.type?.toString() }} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
