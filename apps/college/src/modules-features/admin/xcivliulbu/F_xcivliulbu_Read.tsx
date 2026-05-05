'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_xcivliulbu_Create from "./F_xcivliulbu_Create";
import F_xcivliulbu_Delete from "./F_xcivliulbu_Delete";
import F_xcivliulbu_Update from "./F_xcivliulbu_Update";
export interface I {
    id?: number; // STT
    levelCode?: string; // Mã bậc
    name?: string //Tên bậc
    nameEg?: string //Tên bậc Eg
 
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_xcivliulbu_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const query = useQuery<I[]>({
        queryKey: [`ListOfLevels`],
        queryFn: async () => [
            {
                id: 1,
                levelCode: "CD",
                name: "Cao đẳng",
                nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
              
                // nguoiCapNhat: "Quản trị viên",
                // ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2,
                levelCode: "TC",
                name: "Trung cấp",
                nguoiCapNhat: "Quản trị viên 2",
                ngayCapNhat: new Date("2024-12-23")
            
                // nguoiCapNhat: "Quản trị viên",
                // ngayCapNhat: new Date("2024-12-23")
            },

        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã bậc",
            accessorKey: "levelCode",
        },
        {
            header: "Tên bậc",
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
                    <F_xcivliulbu_Create/>
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F_xcivliulbu_Update doituong={row.original} />
                        <F_xcivliulbu_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
