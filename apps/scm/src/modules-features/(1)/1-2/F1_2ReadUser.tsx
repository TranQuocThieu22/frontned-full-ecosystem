'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useMemo, useState } from "react";
export interface I1_2User {
    id?: number
    userName?: string,
    fullName?: string,
    email?: string
}

const users: I1_2User[] = [
    {
        id: 1,
        userName: "nguyentrang",
        fullName: "Nguyễn Tráng",
        email: "nguyen.trang@example.com"
    },
    {
        id: 2,
        userName: "lehien",
        fullName: "Lê Hiền",
        email: "le.hien@example.com"
    },
    {
        id: 3,
        userName: "tranminh",
        fullName: "Trần Minh",
        email: "tran.minh@example.com"
    },
    {
        id: 4,
        userName: "phamthuy",
        fullName: "Phạm Thúy",
        email: "pham.thuy@example.com"
    },
    {
        id: 5,
        userName: "hoangtuan",
        fullName: "Hoàng Tuấn",
        email: "hoang.tuan@example.com"
    }
];

export default function F1_2ReadUser() {
    const AllUserQuery = useQuery({
        queryKey: ['F1_2ReadUser'],
        queryFn: async () => users
    });

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const columns = useMemo<MRT_ColumnDef<I1_2User>[]>(
        () => [
            {
                header: "Họ và tên",
                accessorKey: "fullName",
                size: 60
            },
            {
                header: "Email",
                accessorKey: "email",
            },
        ],
        []
    );

    const handleRowClick = (rowId: string) => {
        setRowSelection({ [rowId]: true }); // Chọn dòng hiện tại và xóa các dòng khác
    };

    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <Container fluid w={'35%'}>
            <MyDataTable
                columns={columns}
                data={AllUserQuery.data!}
                getRowId={(row) => row.id?.toString()}
                mantineTableBodyRowProps={({ row }) => ({
                    onClick: () => handleRowClick(row.id),
                    style: {
                        cursor: 'pointer',
                        backgroundColor: rowSelection[row.id] ? '#d0e7ff' : 'transparent',
                    },
                })}
                state={rowSelection}
            />
        </Container>
    );
}
