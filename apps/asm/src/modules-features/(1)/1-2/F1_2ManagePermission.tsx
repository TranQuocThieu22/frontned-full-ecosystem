import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useMemo, useState } from "react";

interface IDsQuyen {
    id?: number
    ma?: string,
    quyen?: string,
}
export default function F1_2ManagePermission() {
    const dis = useDisclosure();
    const AllUserQuery = useQuery({
        queryKey: ['F1_2ManagePermission'],
        queryFn: async () => permissions
    });

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const columns = useMemo<MRT_ColumnDef<IDsQuyen>[]>(
        () => [
            {
                header: "Nhóm quyền",
                accessorKey: "quyen",
                size: 60
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

    )
}
const permissions: IDsQuyen[] = [
    {
        id: 1,
        ma: "ADMIN",
        quyen: "Administrator ",
    },
    {
        id: 2,
        ma: "EDITOR",
        quyen: "Editor",
    },
    {
        id: 3,
        ma: "VIEWER",
        quyen: "Viewer ",
    },
    {
        id: 4,
        ma: "MODERATOR",
        quyen: "Moderator",
    },
    {
        id: 5,
        ma: "SUPPORT",
        quyen: "Support",
    },
];
