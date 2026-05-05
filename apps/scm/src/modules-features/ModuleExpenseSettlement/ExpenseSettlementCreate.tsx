"use client";
import { Center, Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyActionIconUpdate, MyButton, MyButtonCreate, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo } from 'react';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import { I_PaymentSettlement } from './ExpenseSettlementTable';
import { IconInfoCircle, IconUsers } from '@tabler/icons-react';

// Enum Role Type
export enum EnumRoleType {
    PREFECT = '1',
    MEMBER = '2',
}

export const RoleTypeLabel: Record<EnumRoleType, string> = {
    [EnumRoleType.PREFECT]: 'Trưởng ban',
    [EnumRoleType.MEMBER]: 'Thành viên',
};

// Interface Council Member
export interface I_CouncilPayeeMember {
    id?: number;
    code: string;        // Mã NS
    name: string;        // Họ tên
    department: string;  // Đơn vị
    role: number;        // Vai trò
    paymentFee: number;  // Phí thanh toán
}

export default function ExpenseSettlementCreate() {
    const form = useForm<I_PaymentSettlement>({
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    });

    const roleOptions = Object.entries(RoleTypeLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }))

    const columns = useMemo<MRT_ColumnDef<I_CouncilPayeeMember>[]>(() => [
        {
            header: "Mã NS",
            accessorKey: "code",
            Cell: ({ cell }) => (
                <MySelect data={["GV0258", "GV1253"]} value={cell.getValue<string>()} />
            )
        },
        {
            header: "Họ tên",
            accessorKey: "name",
            Cell: ({ cell }) => (
                <MyTextInput
                    placeholder="Họ tên"
                    {...form.getInputProps('name')}
                />
            )
        },
        {
            header: "Đơn vị",
            accessorKey: "department",
            Cell: ({ cell }) => (
                <MyTextInput
                    placeholder="Đơn vị"
                    defaultValue={cell.getValue<string>()}
                />
            )
        },
        {
            header: "Vai trò",
            accessorKey: "role",
            accessorFn(originalRow) {
                return (
                    <MyTextInput
                        placeholder="Vai trò"
                        defaultValue={RoleTypeLabel[originalRow.role?.toString() as EnumRoleType] ?? ""}
                        readOnly
                    />
                );
            },
        },
        {
            header: "Số tiền",
            accessorKey: "paymentFee",
            Cell: ({ cell }) => (
                <MyTextInput
                    placeholder="Phí thanh toán"
                    defaultValue={cell.getValue<string>()}
                />
            )
        },
    ], []);

    return (
        <Group>
            <MyButtonCreate
                title="Tạo đề nghị thanh toán"
                form={form}
                onSubmit={() => {
                }}
                modalSize={"80%"}
            >
                <Tabs defaultValue="tab1" >
                    <Tabs.List >
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
                                <MyTextInput label='Mã quyết định quyết toán' {...form.getInputProps("code")} />
                                <MyTextInput label='Tên/Tiêu đề quyết định quyết toán' {...form.getInputProps("name")} />
                                <MyTextInput label='Người/Đơn vị ra quyết định' {...form.getInputProps("decisionBy")} />
                                <MyTextArea label='Tóm tắt quyết định cuối cùng' {...form.getInputProps("decisionSummary")} />
                            </Stack>
                            <Stack>
                                <MyDateInput label='Ngày quyết định/Ngày ký duyệt' {...form.getInputProps("decisionDate")} />
                                <MyNumberInput label='Tổng số tiền đã quyết toán' {...form.getInputProps("totalFinalAmount")} />
                                <MyFileInput label='Tài liệu/minh chứng đính kèm' {...form.getInputProps("attachmentFile")} />
                                <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
                            </Stack>
                        </SimpleGrid>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <MyDataTable
                            enableRowSelection={false}
                            enableRowNumbers={false}
                            columns={columns}
                            data={[]}
                        />
                    </Tabs.Panel>
                </Tabs>
            </MyButtonCreate>
        </Group>
    );
}
