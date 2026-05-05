'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_larliztxrk_Create from "./F_larliztxrk_Create";
import F_larliztxrk_Delete from "./F_larliztxrk_Delete";
import F_larliztxrk_Update from "./F_larliztxrk_Update";
export interface I {
    id?: number; // STT
    fieldCode?: string; // Mã lĩnh vực
    name?: string //Tên lĩnh vực

 
    // nguoiCapNhat?: string;
    // ngayCapNhat?: Date | undefined;
}

export default function F_larliztxrk_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I[]>({
        queryKey: [`ListOfFields`],
        queryFn: async () => [
            {
                id: 1,
                fieldCode: "KTCN",
                name: "Kỹ thuật và Công nghệ",
              
                // nguoiCapNhat: "Quản trị viên",
                // ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2,
                fieldCode: "SXCB",
                name: "Sản xuất và Chế biến",
            
                // nguoiCapNhat: "Quản trị viên",
                // ngayCapNhat: new Date("2024-12-23")
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã lĩnh vực",
            accessorKey: "fieldCode",
        },
        {
            header: "Tên lĩnh vực",
            accessorKey: "name",
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat",

        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        //     accessorFn(originalRow) {
        //         return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
        //     },

        // },
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
                    <F_larliztxrk_Create/>
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_larliztxrk_Update doituong={row.original} />
                        <F_larliztxrk_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
