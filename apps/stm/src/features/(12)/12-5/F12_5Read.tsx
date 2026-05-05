'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F12_5Create from "./F12_5Create";
import F12_5Delete from "./F12_5Delete";
import F12_5DeleteList from "./F12_5DeleteList";
import F12_5Update from "./F12_5Update";

interface ICreateUserViewModel {
    id?: number;
    code?: string;
    name?: string;
    chiNhanh?: string;
    day?: string;
    sucChuaHoc?: number;
    sucChuaThi?: number;
    tinhChatPhong?: string;
    note?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
//REVIEW: quuoc thieu review 47514

export default function F12_5Read() {
    const roomTypeQuery = useQuery<ICreateUserViewModel[]>({
        queryKey: [`F12_5Read`],
        queryFn: async () => {
            const response = await baseAxios.get("/roomType/getall");
            const result = response.data.data;
            return result
        },
    })

    const [isImportData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const columns = useMemo<MRT_ColumnDef<ICreateUserViewModel>[]>(
        () => [
            {
                accessorKey: "code",
                header: "Mã tính chất"
            },
            {
                accessorKey: "name",
                header: "Tên tính chất"
            },
            {
                accessorKey: "ngayCapNhat",
                header: "Ngày cập nhật",
                accessorFn(originalRow) {
                    return utils_date_dateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },

            },
            {
                accessorKey: "nguoiCapNhat",
                header: "Người cập nhật",
            },

        ],
        []
    );
    if (roomTypeQuery.isLoading) return "Đang tải dữ liệu..."
    if (roomTypeQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={roomTypeQuery.data!}

            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <F12_5Create />
                            <F12_5DeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                            <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                console.log(form_multiple.values);

                            }} >s</AQButtonCreateByImportFile>
                        </Group>
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_5Update data={row.original} />
                        <F12_5Delete dataId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
