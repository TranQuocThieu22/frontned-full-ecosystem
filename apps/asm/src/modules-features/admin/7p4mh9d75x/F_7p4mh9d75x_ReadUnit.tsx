'use client'
import baseAxios from "@/api/baseAxios";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import useS_7p4mh9d75x from "./S_7p4mh9d75x";


interface I {
    id?: number
    code?: string,
    name?: string,
    ngayCapNhat?: Date, // bạn hãy tự thêm nếu interface thiếu
    nguoiCapNhat?: string // bạn hãy tự thêm nếu interface thiếu
}

export default function F_7p4mh9d75x_ReadUnit() {
    const store = useS_7p4mh9d75x()
    const query = useQuery<I[]>({
        queryKey: [`F_7p4mh9d75x_ReadUnit`],
        queryFn: async () => {
            const result = await baseAxios.get('/Role/GetAdminRole')
            return result.data.data || []
        }
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã",
                accessorKey: "code",
            },
            {
                header: "Tên nhóm quyền",
                accessorKey: "name"
            },
        ],
        []
    );
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const handleRowClick = (rowId: string) => {
        setRowSelection({ [rowId]: true }); // Chọn dòng hiện tại và xóa các dòng khác
    };
    useEffect(() => {
        if (query.data == undefined) return
        if (rowSelection[String(query.data![0]?.id)]) return
        handleRowClick(String(query.data![0]?.id) || "0")
        store.setProperty("userId", parseInt(String(query.data![0]?.id)))
    }, [query.data])

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            getRowId={(row) => row.id?.toString()}
            state={rowSelection}
            mantineTableBodyRowProps={({ row }) => ({
                onClick: () => {
                    handleRowClick(row.id)
                    store.setProperty("userId", parseInt(row.id))
                },
                style: {
                    cursor: 'pointer',
                    backgroundColor: rowSelection[row.id] ? '#d0e7ff' : 'transparent',
                },
            })}
        />
    )
}
