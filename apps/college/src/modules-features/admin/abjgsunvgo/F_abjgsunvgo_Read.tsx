'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_abjgsunvgo_Create from "./F_abjgsunvgo_Create";
import F_abjgsunvgo_Delete from "./F_abjgsunvgo_Delete";
import F_abjgsunvgo_Update from "./F_abjgsunvgo_Update";
export interface I {
    id?: number; // STT
    bacHeCode?: string; // Mã sinh viên
    name?: string //tên bậc hệ
    quyChe?: string 
    bac?: string 
    he?: string 
   
    soHocKyCT?: number 
    soHocKyMax?: number 
    soHocKyNamHoc?: number 
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_abjgsunvgo_Read() {
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
                bacHeCode: "CDCQ",
                name: "Cao đẳng chính quy",
                quyChe:"TT08",
                bac:"CD",
                he:"CQ",
                soHocKyCT: 7,
                soHocKyMax: 11,
                soHocKyNamHoc: 2,
    
     
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
            header: "Mã bậc hệ",
            accessorKey: "bacHeCode",
        },
        {
            header: "Tên bậc hệ",
            accessorKey: "name",
        },
        
        {
            header: "Quy chế",
            accessorKey: "quyChe",
            // accessorFn: (row) => {
            //     if (row.type === "1") return "Quyết định vào mới";
               
            // }
        },
        {
            header: "Bậc",
            accessorKey: "bac",
        },
        {
            header: "Hệ",
            accessorKey: "he",
        },
        {
            header: "Số học kỳ chương trình",
            accessorKey: "soHocKyCT",
        },
        {
            header: "Số học kỳ tối đa",
            accessorKey: "soHocKyMax",
        },
        {
            header: "Số học kỳ năm học",
            accessorKey: "soHocKyNamHoc",
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
        exportAble
        enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <F_abjgsunvgo_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                       
                        <F_abjgsunvgo_Update doituong={row.original} />
                        <F_abjgsunvgo_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
