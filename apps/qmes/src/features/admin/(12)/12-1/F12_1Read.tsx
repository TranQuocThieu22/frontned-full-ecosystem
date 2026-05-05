'use client'

import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/ui/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F12_1Create from "./F12_1Create";
import F12_1Delete from "./F12_1Delete";
import F12_1Update from "./F12_1Update";

interface I {
    id?: number, name?: string, code?: string
}
export default function F12_1Read({ documentType }: { documentType: number }
) {
    const query = useQuery<I[]>({
        queryKey: ['F12_1Read', documentType],
        queryFn: async () => {
            const result = await baseAxios.get("/DocumentAttribute/GetByType?", { params: { documentType } })
            return result.data?.data || []
        },
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã loại văn bản",
                accessorKey: "code"
            },
            {
                header: "Tên Loại Văn Bản",
                accessorKey: "name"
            }
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MyDataTable
            columns={columns}
            enableRowNumbers={true}
            data={query.data!}
            renderTopToolbarCustomActions={() => <F12_1Create documentType={documentType} />}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F12_1Update values={row.original} />
                        <F12_1Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

