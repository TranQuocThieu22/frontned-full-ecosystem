'use client'

import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F11_1DeleteRoleActivityCategory from "./F11_1DeleteRoleActivityCategory";
import F11_1UpdateRoleActivityCategory from "./F11_1UpdateRoleActivityCategory";

interface Role {
    id?: number;
    code?: string | undefined;
    name?: string | undefined;
    concurrencyStamp?: string | undefined;
    isEnabled?: boolean;
    notes?: string | undefined;
}
export default function F11_1ReadRoleActivityCategory() {
    const roleQuery = useQuery<Role[]>({
        queryKey: [`Role/getall`],
        queryFn: async () => {
            const result = await baseAxios.get("/Role/getall");
            return result.data.data
        },
    })
    const columns = useMemo<MRT_ColumnDef<Role>[]>(
        () => [
            {
                header: "Mã vai trò",
                accessorKey: "code"
            },
            {
                header: "Tên vai trò",
                accessorKey: "name"
            },
            {
                header: "Ghi chú",
                accessorKey: "notes"
            }
        ],
        []
    );
    console.log(process.env.NEXT_PUBLIC_API_HOST);

    if (roleQuery.isLoading) return "Đang tải dữ liệu..."
    if (roleQuery.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            columns={columns}
            enableRowNumbers={true}
            data={roleQuery.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F11_1UpdateRoleActivityCategory values={row.original} />
                        <F11_1DeleteRoleActivityCategory roleActivityId={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}
