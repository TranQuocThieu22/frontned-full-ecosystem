'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_xwzcqjqvhv_Create from "./F_xwzcqjqvhv_Create";
import F_xwzcqjqvhv_Delete from "./F_xwzcqjqvhv_Delete";
import F_xwzcqjqvhv_Update from "./F_xwzcqjqvhv_Update";
export interface I {
    id?: number; // STT
    reasonsCode?: string; // Mã lý do
    name?: string //Tên lý do
    type?: string; // loại vào,ra
   
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_xwzcqjqvhv_Read() {
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
                reasonsCode: "TT",
                name: "Quyết định trúng tuyển",
                type: "Quyết định vào mới",
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
            header: "Mã lý do",
            accessorKey: "reasonsCode",
        },
        {
            header: "Tên lý do",
            accessorKey: "name",
        },
        {
            header: "Loại vào / ra",
            accessorKey: "type",
            // accessorFn: (row) => {
            //     if (row.type === "1") return "Quyết định vào mới";
               
            // }
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
            renderTopToolbarCustomActions={() =>
                <>
                    <F_xwzcqjqvhv_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_xwzcqjqvhv_Update doituong={row.original} />
                        <F_xwzcqjqvhv_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
