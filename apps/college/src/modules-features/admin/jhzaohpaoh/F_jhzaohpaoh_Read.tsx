'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_jhzaohpaoh_Create from "./F_jhzaohpaoh_Create";
import F_jhzaohpaoh_Delete from "./F_jhzaohpaoh_Delete";
import F_jhzaohpaoh_Update from "./F_jhzaohpaoh_Update";
export interface I {
    id?: number; // STT
    languageCode?: string; // Mã ngôn ngữ
    name?: string //Tên ngôn ngữ

 
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_jhzaohpaoh_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I[]>({
        queryKey: [`ListOfLanguages`],
        queryFn: async () => [
            {
                id: 1,
                languageCode: "VN",
                name: "Tiếng Việt",
              
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2,
                languageCode: "Eg",
                name: "Tiếng Anh",
            
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 3,
                languageCode: "Cn",
                name: "Tiếng trung",
            
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã ngôn ngữ",
            accessorKey: "languageCode",
        },
        {
            header: "Tên ngôn ngữ",
            accessorKey: "name",
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
        exportAble = {true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() =>
                <>
                    <F_jhzaohpaoh_Create/>
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_jhzaohpaoh_Update doituong={row.original} />
                        <F_jhzaohpaoh_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
