'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_hkrnoszyoo_Create from "./F_hkrnoszyoo_Create";
import F_hkrnoszyoo_Delete from "./F_hkrnoszyoo_Delete";
import F_hkrnoszyoo_Update from "./F_hkrnoszyoo_Update";



export interface I_hkrnoszyoo_Read {
    id?: number;
    code?: string;
    name?: string;
    khoa?: number;
    note?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_hkrnoszyoo_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const form = useForm<I_hkrnoszyoo_Read>({
        initialValues: {},
    });

    // Query to fetch the mock data
    const AllUserQuery = useQuery<I_hkrnoszyoo_Read[]>({
        queryKey: ["F_hkrnoszyoo_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_hkrnoszyoo_Read>[]>(() => [
        { header: "Mã lớp", accessorKey: "code" },
        { header: "Tên lớp", accessorKey: "name" },
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
        }
    ], []);


    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <MyFlexColumn>
            <MyDataTable
                exportAble
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Group>
                                <F_hkrnoszyoo_Create />
                                <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                    console.log(form_multiple.values);

                                }} >s</AQButtonCreateByImportFile>
                            </Group>
                        </>
                    )
                }}
                columns={columns}
                data={AllUserQuery.data || []}
                renderRowActions={({ row }) => {
                    return (

                        <MyCenterFull>
                            <F_hkrnoszyoo_Update values={row.original} />
                            <F_hkrnoszyoo_Delete id={row.original.id!} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFlexColumn>
    );
}

const data: I_hkrnoszyoo_Read[] = [
    {
        id: 1,
        code: "IT2024-1",
        name: "Công nghệ thông tin khóa 24",
        khoa: 1,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    }
];
