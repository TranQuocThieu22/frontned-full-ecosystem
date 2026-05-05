"use client";
import { Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyButtonCreate, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import { I_PaymentProposal } from './PaymentRequestTable';
import { RoleTypeLabel, EditorialBoardLabel, RequestTypeLabel, EnumRoleType } from './PaymentRequestUpdate';
import { IconInfoCircle, IconUsers } from '@tabler/icons-react';



// Interface Council Member
export interface I_CouncilPayeeMember {
    id?: number;
    code: string;          // Mã NS
    name: string;    // Họ tên
    department: string;  // Đơn vị
    role: number;        // Vai trò
    paymentFee: number;  // Phí thanh toán
}

export default function PaymentRequestCreate() {
    const form = useForm<I_PaymentProposal>({
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    });

    const boardOptions = Object.entries(EditorialBoardLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }))

    const recommendStatusOptions = Object.entries(RequestTypeLabel).map(([value, label]) => ({
        value: value.toString(),
        label,
    }));

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
                    defaultValue={cell.getValue<string>()}
                    readOnly
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
                    readOnly
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
                    readOnly
                />
            )
        },
    ], []);

    return (
        <Group>
            <MyButtonCreate
                form={form}
                objectName='đề nghị thanh toán'
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
                                <MyTextInput label='Mã đề nghị thanh toán' {...form.getInputProps("code")} />
                                <MyTextInput label='Tên đề nghị thanh toán' {...form.getInputProps("name")} />
                                <MySelect label='Đối tượng đề nghị thanh toán' data={boardOptions} defaultValue={boardOptions[0]?.value} />
                                <MySelect label='Trạng thái đề nghị' data={recommendStatusOptions} defaultValue={recommendStatusOptions[0]?.value} />
                            </Stack>
                            <Stack>
                                <MyDateInput label='Ngày lập đề nghị thanh toán' {...form.getInputProps("createdDate")} />
                                <MyNumberInput label='Tổng số tiền đề nghị thanh toán' {...form.getInputProps("totalAmount")} />
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
