'use client'
import baseAxios from "@/api/baseAxios";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F1_1ChangePermission from "./F1_1ChangePermission";
import F1_1Create from "./F1_1Create";
import F1_1DeleteUser from "./F1_1Delete";
import F1_1UpdateUser from "./F1_1Update";
import F1_PermissinoRead from "./F1_ReadPermissinon";

interface I {
    id?: number
    userName?: string,
    code?: string
    fullName?: string,
    email?: string,
    phoneNumber?: string
}

export default function F1_1Read() {
    const AllUserQuery = useQuery({
        queryKey: ["F1_1Read"],
        queryFn: async () => {
            const result = await baseAxios.get(`/Account/GetAdminAccount`, { params: { page: 5, pageNumber: 1 } });
            return result.data?.data || []
        }
    })
    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Tên tài khoản",
                accessorKey: "userName"
            },
            {
                header: "Họ và tên",
                accessorKey: "fullName"
            },
            {
                header: "Email",
                accessorKey: "email"
            },
            {
                header: "Quyền",
                accessorFn: (row) => {
                    return (<F1_1ChangePermission user={row}>
                    </F1_1ChangePermission>)
                }
            },
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    if (AllUserQuery.isError) return "Chưa có dữ liệu"
    return (
        <MyDataTable
            columns={columns}
            data={AllUserQuery.data!}
            renderTopToolbarCustomActions={() => {
                return (
                    <>
                        <F1_1Create />
                        <F1_PermissinoRead />
                    </>
                )
            }}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F1_1UpdateUser user={row.original} />
                        <F1_1DeleteUser id={row.original.id!} />
                    </MyCenterFull>
                )
            }}
        />
    )
}

