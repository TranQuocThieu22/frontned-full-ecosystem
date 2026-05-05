import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { useQuery } from "@tanstack/react-query";
import { MyActionIconDelete, MyCenterFull, MyDataTable, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { Text } from "@mantine/core";

interface IInternalMember {
    code: string;
    name: string;
    unit: string;
    role: string;
}

const roleOptions = [
    { value: "Tác giả chính", label: "Tác giả chính" },
    { value: "Đồng tác giả", label: "Đồng tác giả" },
];

export default function InternalMembersTable() {
    const [data, setData] = useState<IInternalMember[]>([]);

    const query = useQuery({
        queryKey: ["register-publication-internal-members"],
        queryFn: () => {
            return mockInternalAuthors;
        },
    })

    

    const columns = useMemo<MRT_ColumnDef<IInternalMember>[]>(() => [
        {
            header: "Mã tác giả",
            accessorKey: "code",
            Cell: ({ row }) => (
                <MySelect
                    data={mockInternalAuthors.map(a => ({ value: a.code, label: a.code }))}
                    value={row.original.code}
                    readOnly
                />
            ),
        },
        {
            header: "Họ tên tác giả",
            accessorKey: "name",
        },
        {
            header: "Đơn vị",
            accessorKey: "unit",
        },
        {
            header: "Vai trò",
            accessorKey: "role",
            Cell: ({ row }) => (
                <MySelect
                    data={roleOptions}
                    value={row.original.role}
                    readOnly
                />
            ),
        },
    ], [data]);

    useEffect(() => {
        setData(query.data || []);
    }, [query.data])

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <>
            <MyFlexColumn gap="xs" pb="md">
                <MyDataTable
                    columns={columns}
                    data={data}
                    rowActionSize={40}
                    exportAble={false}
                    renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <MyActionIconDelete onSubmit={()=>{}} />
                    </MyCenterFull>
                )}
                />
            </MyFlexColumn>
        </>
    );
}

const mockInternalAuthors = [
    { code: "GV0258", name: "Tô Ngọc Báo", unit: "KCNTT", role: "Tác giả chính" },
    { code: "GV1253", name: "Tô Lanh", unit: "KDDT", role: "Đồng tác giả" },
]; 