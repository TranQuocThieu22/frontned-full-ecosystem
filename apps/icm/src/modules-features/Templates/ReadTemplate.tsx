'use client'
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";


interface I {
    id?: number
    code?: string
    name?: string
}

export default function ReadTemplate() {
    const query = useQuery<I[]>({
        queryKey: [`ReadTemplate`],
        queryFn: async () => [
            { id: 1, code: "gv001", name: "Trần Quốc Thiệu" },
            { id: 2, code: "gv002", name: "Nguyễn Văn Định" },
            { id: 3, code: "gv003", name: "Đặng Tuấn Kiệt" },
        ]
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(
        () => [
            {
                header: "Mã giáo viên",
                accessorKey: "code"
            },
            {
                header: "Tên giáo viên",
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
            renderRowActions={({ row }) => { // Nếu table có update delete thì bỏ thêm render row action
                return (
                    <MyCenterFull>
                        Your update and delete feat here
                        {/* <F11_1UpdateRoleActivityCategory values={row.original} />
                        <F11_1DeleteRoleActivityCategory roleActivityId={row.original.id!} /> */}
                    </MyCenterFull>
                )
            }}
        />
    )
}
