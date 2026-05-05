"use client";
import { Center, Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyActionIconUpdate, MyButton, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo } from 'react';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import { I_PaymentProposal } from './PaymentRequestTable';
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

// Enum Editorial Board
export enum EnumEditorialBoard {
    LOGISTICS_PROGRAM = '1',
    STRATEGIC_MANAGEMENT_COURSE = '2',
    SOFTWARE_ENGINEERING_REVIEW = '3',
}

export const EditorialBoardLabel: Record<EnumEditorialBoard, string> = {
    [EnumEditorialBoard.LOGISTICS_PROGRAM]: 'Ban Biên soạn CTĐT ngành Logistics và Quản lý chuỗi cung ứng',
    [EnumEditorialBoard.STRATEGIC_MANAGEMENT_COURSE]: 'Ban Biên soạn ĐCCTHP môn Quản trị chiến lược',
    [EnumEditorialBoard.SOFTWARE_ENGINEERING_REVIEW]: 'Ban Rà soát CTĐT ngành Kỹ thuật phần mềm (năm 2024)',
};

// Enum Request Type
export enum RequestTypeEnum {
    WAITING_APPROVAL = 1,        // Chờ duyệt
    APPROVED = 2,         // Đã phê duyệt
    REJECTED = 3,            // Đã từ chối
}

export const RequestTypeLabel: Record<RequestTypeEnum, string> = {
    [RequestTypeEnum.WAITING_APPROVAL]: 'Chờ duyệt',
    [RequestTypeEnum.APPROVED]: 'Đã phê duyệt',
    [RequestTypeEnum.REJECTED]: 'Đã từ chối',
};


// Interface Council Member
export interface I_CouncilPayeeMember {
    id?: number;
    code: string;          // Mã NS
    name: string;    // Họ tên
    department: string;  // Đơn vị
    role: number;        // Vai trò
    paymentFee: number;  // Phí thanh toán
}

export default function PaymentRequestUpdate({ data }: { data: I_PaymentProposal }) {
    const form = useForm<I_PaymentProposal>({
        initialValues: data,
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

    useEffect(() => {
        form.setValues(data);
    }, [data]);

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
            <MyActionIconUpdate
                form={form}
                onSubmit={() => {
                }}
                title="Chi tiết đề nghị thanh toán"
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
                            data={members || []}
                        />
                    </Tabs.Panel>
                </Tabs>
            </MyActionIconUpdate>
        </Group>
    );
}


const members: I_CouncilPayeeMember[] = [
    {
        code: "GV0258",
        name: "Tô Ngọc Báo",
        department: "KCNTT",
        role: 1,
        paymentFee: 15000000
    },
    {
        code: "GV1253",
        name: "Tô Lanh",
        department: "KDDT",
        role: 2,
        paymentFee: 2000000
    }
];
