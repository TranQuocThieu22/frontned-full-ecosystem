'use client'
import baseAxios from "@/api/config/baseAxios";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F12_4Create from "./F12_2Create";
import F12_2Delete from "./F12_2Delete";
import F12_2DeleteList from "./F12_2DeleteList";
import F12_2Update from "./F12_2Update";

interface ICreateUserViewModel {
    id?: number;
    code?: string;
    name?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
    note?: string;
}

//REVIEW: quuoc thieu review 47513
export default function F12_2Read() {
    const skillCenterQuery = useQuery<ICreateUserViewModel[]>({
        queryKey: [`F3_1ReadExternalUserCategory`],
        queryFn: async () => {
            const response = await baseAxios.get("/skillCenter/getall");
            const result = response.data.data;

            return result
        },
    })
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const columns = useMemo<MRT_ColumnDef<ICreateUserViewModel>[]>(
        () => [
            {
                header: "Mã trung tâm",
                accessorKey: "code"
            },
            {
                header: "Tên trung tâm",
                accessorKey: "name"
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
    if (skillCenterQuery.isLoading) return "Đang tải dữ liệu..."
    if (skillCenterQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={skillCenterQuery.data!}
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F12_4Create />
                            <F12_2DeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple}
                                onSubmit={() => {
                                    console.log(form_multiple.values);
                                }} >s</AQButtonCreateByImportFile>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_2Update data={row.original} />
                        <F12_2Delete dataId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
