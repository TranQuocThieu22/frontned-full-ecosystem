import { SimpleGrid, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
    MyActionIcon,
    MyActionIconUpdate,
    MyDataTable,
    MyDateInput,
    MyFileInput,
    MyNumberFormatter,
    MySelect,
    MyTextArea,
    MyTextInput,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { Text } from "@mantine/core"

export interface I_ExpenseSettleMember {
    code: string;
    name: string;
    department: string;
    role: string;
    expense: number;
}

export default function ExpenseSettlementUpdateButton({ data }: { data: any }) {
    const form = useForm({
        initialValues: { ...data }
    })

    const query = useQuery<I_ExpenseSettleMember[]>({
        queryKey: ['query'],
        queryFn: () => {
            return mockDataUpdate ?? [];
        }
    });

    const codeOptions = mockDataUpdate.map(item => ({
        value: item.code,
        label: item.code
    }));

    const columns = useMemo<MRT_ColumnDef<I_ExpenseSettleMember>[]>(() => [
        {
            header: "Mã NS",
            id: "code",
            accessorFn: (row) => (
                <MySelect data={codeOptions} value={row.code} />
            )
        },
        {
            header: "Họ tên",
            id: "name",
            accessorFn: row => (
                <Text>{row.name}</Text>
            ),
        },
        {
            header: "Đơn vị",
            id: "department",
            accessorFn: row => (
                <Text>{row.department}</Text>
            ),
        },
        {
            header: "Vai trò",
            id: "role",
            accessorFn: row => (
                <Text>{row.role}</Text>
            ),
        },
        {
            header: "Số tiền",
            id: "expense",
            accessorFn: row => (
                <MyNumberFormatter value={row.expense} />
            ),
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Lỗi đã xảy ra";

    return (
        <MyActionIconUpdate
           title="Chi tiết quyết toán"
            modalSize={"80%"}
            form={form}
            onSubmit={(values) => console.log(values)}
        >
            <Tabs defaultValue="general">
                <Tabs.List>
                    <Tabs.Tab
                        bg="rgba(131, 204, 235, 0.3)"
                        color="rgba(131, 204, 235, 1)"
                        flex={1}
                        leftSection={<IconInfoCircle />}
                        value="general">Thông tin chung</Tabs.Tab>
                    <Tabs.Tab
                        bg="rgba(247, 216, 54, 0.3)"
                        color="rgba(247, 216, 54, 1)"
                        flex={1}
                        leftSection={<IconUsers />}
                        value="details">Thành viên</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="general">
                    <SimpleGrid p={"md"} cols={2}>
                        <Stack>
                            <MyTextInput label='Mã quyết định quyết toán' {...form.getInputProps("code")} />
                            <MyTextInput label='Tên/Tiêu đề quyết định quyết toán' {...form.getInputProps("name")} />
                            <MyTextInput label='Người/Đơn vị ra quyết định' {...form.getInputProps("settledBy")} />
                            <MyTextArea label='Tóm tắt quyết định cuối cùng' {...form.getInputProps("description")} />
                        </Stack>
                        <Stack>
                            <MyDateInput label='Ngày quyết định/Ngày ký duyệt' {...form.getInputProps("date")} />
                            <MyTextInput label='Tổng số tiền đã quyết toán' {...form.getInputProps("settlementAmount")} />
                            <MyFileInput label='Tài liệu/minh chứng đính kèm' />
                            <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
                        </Stack>
                    </SimpleGrid>
                </Tabs.Panel>
                <Tabs.Panel value="details">
                    <MyDataTable
                        columns={columns}
                        data={query.data!}
                        enableRowSelection={false}
                        enableRowNumbers={false}
                        exportAble={false}
                        renderTopToolbarCustomActions={() => (
                            <MyActionIcon crudType="create" color={"green"} onSubmit={() => { }} />
                        )}
                    >
                    </MyDataTable>
                </Tabs.Panel>
            </Tabs>
        </MyActionIconUpdate>

    )
}

const mockDataUpdate: I_ExpenseSettleMember[] = [
    {
        code: "GV0258",
        name: "Tô Ngọc Báo",
        department: "KCNTT",
        role: "Trưởng ban",
        expense: 15000000,
    },
    {
        code: "GV1253",
        name: "Tô Lanh",
        department: "KDDT",
        role: "Thành viên",
        expense: 2000000
    },
];
export const roleOptions = [
    { value: "Trưởng ban", label: "Trưởng ban" },
    { value: "Thành viên", label: "Thành viên" },
]