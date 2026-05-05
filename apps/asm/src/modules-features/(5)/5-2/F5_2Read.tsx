'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { Fieldset } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_2Create from "./F5_2Create";
import F5_2Delete from "./F5_2Delete";
import F5_2Update from "./F5_2Update";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { Group, Title } from '@mantine/core';
import { U0DateToDDMMYYYString } from '@/utils/date';

export interface I {
    id?: number;
    ngayChungTu?: Date;
    soChungTu?: string;
    ghiChu?: string;
}

export default function F5_2Read() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            {
                id: 1,
                ngayChungTu: new Date("2025-01-15"),
                soChungTu: "PBCT029",
                ghiChu: "Phân bố chi phí công cụ dụng cụ 1/2025",
            }
        ],
    });



    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Ngày chứng từ",
            accessorFn: (row) => U0DateToDDMMYYYString(row.ngayChungTu!)
        },
        {
            header: "Số chứng từ",
            accessorKey: "soChungTu",
        },
        {
            header: "Ghi chú",
            accessorKey: "ghiChu",
        },

    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Fieldset legend="Danh sách kỳ phân bố">
            <MyDataTable
                exportAble
                columns={columns}
                data={query.data!}
                renderTopToolbarCustomActions={() => {
                    return (
                        <Group>
                            <F5_2Create />
                            <MyButton crudType="delete" />
                        </Group>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F5_2Update
                            // values={row.original}
                            />
                            <F5_2Delete id={row.original.id!} />
                        </MyCenterFull>
                    );
                }}
            />
        </Fieldset>
    );
}
