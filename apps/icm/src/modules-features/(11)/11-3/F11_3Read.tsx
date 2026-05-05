'use client'

import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F12_1Create from "./F11_3Create";
import F12_1Delete from "./F11_3Delete";
import F12_1Update from "./F11_3Update";

interface I {
    id?: number, name?: string, code?: string
}
export default function F11_3Read({ documentType }: { documentType: number }
) {
    const query = useQuery<I[]>({
        queryKey: ['F11_3Read', documentType],
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

