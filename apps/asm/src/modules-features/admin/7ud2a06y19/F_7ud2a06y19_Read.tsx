'use client'
import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_7ud2a06y19_Create from "./F_7ud2a06y19_Create";
import F_7ud2a06y19_Delete from "./F_7ud2a06y19_Delete";
import F_7ud2a06y19_Update from "./F_7ud2a06y19_Update";


interface I {
    id?: number
    code?: string
    name?: string,
}

export default function F_7ud2a06y19_Read() {
    const query = useQuery<I[]>({
        queryKey: [`F_7ud2a06y19_Read`],
        queryFn: async () => {
            const result = await baseAxios.get('/Role/GetAdminRole')
            return result.data.data
        }
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã",
                accessorKey: "code",
            },
            {
                header: "Tên quyền",
                accessorKey: "name"
            },
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            exportAble
            renderTopToolbarCustomActions={() => (
                <Group>
                    <F_7ud2a06y19_Create />
                </Group>
            )}
            renderRowActions={({ row }) => { // Nếu table có update delete thì bỏ thêm render row action
                return (
                    <MyCenterFull>
                        <F_7ud2a06y19_Update values={row.original} />
                        <F_7ud2a06y19_Delete id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
