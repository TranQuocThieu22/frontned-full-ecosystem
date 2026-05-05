import { ActionIcon, Button, Group } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { MyDataTable, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

interface IExternalMember {
    code: string;
    name: string;
    unit: string;
    role: string;
}

const roleOptions = [
    { value: "Tác giả chính", label: "Tác giả chính" },
    { value: "Đồng tác giả", label: "Đồng tác giả" },
];

export default function ExternalMembersTable() {
    const [data, setData] = useState<IExternalMember[]>([]);

    const columns = useMemo<MRT_ColumnDef<IExternalMember>[]>(() => [
        {
            header: "Mã tác giả",
            accessorKey: "code",
            Cell: ({ row }) => (
                <MySelect
                    data={mockExternalAuthors.map(a => ({ value: a.code, label: a.code }))}
                    value={row.original.code}
                    onChange={(value: string | null) => {
                        const found = mockExternalAuthors.find(a => a.code === value);
                        setData(prev => prev.map(r =>
                            r === row.original
                                ? {
                                    ...r,
                                    code: found?.code || '',
                                    name: found?.name || '',
                                    unit: found?.unit || '',
                                }
                                : r
                        ));
                    }}
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
                    onChange={(value: string | null) => {
                        setData(prev => prev.map(r =>
                            r === row.original
                                ? { ...r, role: value || '' }
                                : r
                        ));
                    }}
                />
            ),
        },
        {
            header: "Thao tác",
            id: "actions",
            Cell: ({ row }) => (
                <ActionIcon color="red" variant="subtle" onClick={() => handleDelete(row.original)}>
                    <IconTrash size={16} />
                </ActionIcon>
            ),
            size: 60,
        },
    ], [data]);

    const handleAdd = () => {
        setData(prev => ([
            ...prev,
            { code: '', name: '', unit: '', role: 'Đồng tác giả' }
        ]));
    };

    const handleDelete = (row: IExternalMember) => {
        setData(prev => prev.filter(r => r !== row));
    };

    return (
        <>
            <Group mb={8}>
                <Button leftSection={<IconPlus size={18} />} onClick={handleAdd}>
                    Thêm thành viên
                </Button>
            </Group>
            <MyDataTable
                columns={columns}
                data={data}
                enableEditing={false}
                rowActionSize={40}
                exportAble={false}
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">Lưu</Button>
            </Group>
        </>
    );
} 

const mockExternalAuthors = [
    { code: "GV0258", name: "Tô Ngọc Báo", unit: "KCNTT", role: "Tác giả chính" },
    { code: "GV1253", name: "Tô Lanh", unit: "KDDT", role: "Đồng tác giả" },
];