import { MyButton } from "@/components/Buttons/Button/MyButton";
import { Select, SimpleGrid, Stack, Tabs, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyActionIcon, MyActionIconUpdate, MyButtonCreate, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function ExpenseSettlementCreate() {

    const expenseSettlementForm = useForm({
        initialValues: {  }
    });

    const expenseSettlementQuery = useQuery<IExpenseSettlementMember[]>({
        queryKey: ['ExpenseSettlementQuery'],
        queryFn: () => {
            return expenseSettlementMockData ?? []
        }
    });

    const columns = useMemo<MRT_ColumnDef<IExpenseSettlementMember>[]>(() => [
        {
            header: "Mã NS",
            id: "code",
            accessorFn: row => (
                <TextInput
                    value={row.code}
                    onChange={() => { }}
                />
            ),
        },
        {
            header: "Họ tên",
            accessorKey: "name",
            
        },
        {
            header: "Đơn vị",
            accessorKey: "department",
            
        },
        {
            header: "Vai trò",
            accessorKey: "role",
            
        },
        {
            header: "Số tiền",
            accessorKey: "money",
            
        },
    ], []);

    if (expenseSettlementQuery.isLoading) return "Đang tải . . .";
    if (expenseSettlementQuery.isError) return "Lỗi đã xảy ra";

    return (
        <MyButtonCreate
            onSubmit={() => { }}
            form={expenseSettlementForm}
            modalSize={"70%"}
            title="Chi tiết quyết toán"

        >
            <Tabs defaultValue="tab1" h={"55vh"}>
                <Tabs.List>
                    <Tabs.Tab
                        bg="rgba(131, 204, 235, 0.3)"
                        color="rgba(131, 204, 235, 1)"
                        flex={1}
                        leftSection={<IconInfoCircle />}
                        value="tab1">Thông tin chung</Tabs.Tab>
                    <Tabs.Tab
                        bg="rgba(247, 216, 54, 0.3)"
                        color="rgba(247, 216, 54, 1)"
                        flex={1}
                        leftSection={<IconUsers />}
                        value="tab2">Thành viên</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="tab1">
                    <SimpleGrid p={"md"} cols={2}>
                        <Stack>
                            <MyTextInput label='Mã quyết định quyết toán' {...expenseSettlementForm.getInputProps("approvalDecisionCode")} />
                            <MyTextInput label='Tên/Tiêu đề quyết định quyết toán' {...expenseSettlementForm.getInputProps("approvalDecisionTitle")} />
                            <MySelect label='Người/Đơn vị ra quyết định' data={["TS. Nguyễn Văn A", "TS. Nguyễn Văn B", "TS. Nguyễn Văn C"]} {...expenseSettlementForm.getInputProps("suggestion")} />
                        </Stack>
                        <Stack>
                            <MyDateInput label='Ngày quyết định' {...expenseSettlementForm.getInputProps("settlementDate")} />
                            <MyTextInput label='Tổng số tiền quyết toán' {...expenseSettlementForm.getInputProps("paymentAmountSettled")} />
                            <MyFileInput label='Tài liệu đính kèm' />
                        </Stack>
                    </SimpleGrid>
                    <SimpleGrid p={"md"} cols={2}>
                        <Stack>
                            <MyTextArea label='Tóm tắt quyết định' {...expenseSettlementForm.getInputProps("settlementProcess")} />
                        </Stack>
                        <Stack>
                            <MyTextArea label='Ghi chú' {...expenseSettlementForm.getInputProps("note")} />
                        </Stack>
                    </SimpleGrid>
                </Tabs.Panel>
                <Tabs.Panel value="tab2">
                    <MyDataTable
                        columns={columns}
                        data={[]}
                        enableRowSelection
                        enableRowNumbers={false}
                        exportAble={false}
                        renderTopToolbarCustomActions={() => (<>
                            <MyActionIcon crudType="create" color={"green"} onSubmit={() => { }} />
                        </>)}
                    >

                    </MyDataTable>
                </Tabs.Panel>
            </Tabs>
        </MyButtonCreate>
    )
}

export interface IExpenseSettlementMember {
    code: string;      // Mã NS
    name: string;      // Họ tên
    department: string; // Đơn vị
    role: string;      // Vai trò
    money: string;     // Số tiền
}

const expenseSettlementMockData: IExpenseSettlementMember[] = [
    {
        code: "GV0258",
        name: "Tô Ngọc Báo",
        department: "KCNTT",
        role: "Trưởng ban",
        money: "100.000.000",
    },
    {
        code: "GV1253",
        name: "Tô Lanh",
        department: "KDDT",
        role: "Thành viên",
        money: "200.000.000",
    },
];

export const roleOptions = [
    { value: "Trưởng ban", label: "Trưởng ban" },
    { value: "Thành viên", label: "Thành viên" },
];