'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F1_1DeleteUser from "./F1_1DeleteUser";
import F1_1UpdateUser from "./F1_1UpdateUser";

export interface I1_1User {
    id?: number
    userName?: string,
    fullName?: string,
    email?: string
}
const users: I1_1User[] = [
    {
        id: 1,
        userName: "john_doe",
        fullName: "John Doe",
        email: "john.doe@example.com",
    },
    {
        id: 2,
        userName: "jane_smith",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
    },
    {
        id: 3,
        userName: "michael_lee",
        fullName: "Michael Lee",
        email: "michael.lee@example.com",
    },
    {
        id: 4,
        userName: "sarah_connor",
        fullName: "Sarah Connor",
        email: "sarah.connor@example.com",
    },
    {
        id: 5,
        userName: "david_clark",
        fullName: "David Clark",
        email: "david.clark@example.com",
    },
];

export default function F1_1ReadUser() {
    const AllUserQuery = useQuery({
        queryKey: ["userNCKHs"],
        queryFn: async () => users
    })
    const columns = useMemo<MRT_ColumnDef<I1_1User>[]>(
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
        ],
        []
    );
    if (AllUserQuery.isLoading) return "Loading..."
    return (
        <MyDataTable

            columns={columns}
            data={AllUserQuery.data!}
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

