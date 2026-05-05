import { SimpleGrid, Stack, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
import {
    MyActionIcon,
    MyActionIconDelete,
    MyButton,
    MyButtonModal,
    MyCenterFull,
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
import { I_ExpenseSettleMember } from "./ExpenseSettlementUpdateButton";
import { Text } from "@mantine/core";

export default function ExpenseSettlementCreateButton() {
    const disclosure = useDisclosure(false);
    const form = useForm({
        initialValues: {}
    });

    const columns = useMemo<MRT_ColumnDef<I_ExpenseSettleMember>[]>(() => [
        {
            header: "Mã NS",
            id: "code",
            accessorFn: (row) => (
                <MySelect data={[]} value={row.code} />
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

    return (
        <MyButtonModal objectName="quyết toán" crudType="create" disclosure={disclosure} modalSize={"80%"}>
            <Tabs defaultValue="general" h={"55vh"}>
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
                        data={[]}
                        enableRowSelection={false}
                        enableRowNumbers={false}
                        exportAble={false}
                        renderRowActions={({ row }) => (
                            <MyCenterFull>
                                <MyActionIconDelete onSubmit={() => { }} />
                            </MyCenterFull>
                        )}
                        renderTopToolbarCustomActions={() => (
                            <MyActionIcon crudType="create" color={"green"} onSubmit={() => { }} />
                        )}
                    >
                    </MyDataTable>
                </Tabs.Panel>
            </Tabs>
            <MyButton crudType="save" onSubmit={() => { }} w={"100%"} />
        </MyButtonModal>

    )
}