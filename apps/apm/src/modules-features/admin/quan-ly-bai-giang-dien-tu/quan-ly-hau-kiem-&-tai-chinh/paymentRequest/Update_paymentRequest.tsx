"use client";
import { Center, Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MyActionIconUpdate, MyButton, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo } from 'react';
import DeleteList_paymentRequest from './DeleteList_paymentRequest';
import { IPaymentRequest } from './Read_paymentRequest';
import { IconInfoCircle, IconUsers } from '@tabler/icons-react';

export enum EnumRoleType {
    Man1 = '1',
    Man2 = '2',
}

export const RoleTypeLabel: Record<EnumRoleType, string> = {
    [EnumRoleType.Man1]: 'Trưởng ban',
    [EnumRoleType.Man2]: 'Thành viên',
};

export enum EditorialBoard {
    LOGISTICS_PROGRAM = '1',
    STRATEGIC_MANAGEMENT_COURSE = '2',
    SOFTWARE_ENGINEERING_REVIEW = '3',
}

export const EditorialBoardLabel: Record<EditorialBoard, string> = {
    [EditorialBoard.LOGISTICS_PROGRAM]: 'Ban Biên soạn CTĐT ngành Logistics và Quản lý chuỗi cung ứng',
    [EditorialBoard.STRATEGIC_MANAGEMENT_COURSE]: 'Ban Biên soạn ĐCCTHP môn Quản trị chiến lược',
    [EditorialBoard.SOFTWARE_ENGINEERING_REVIEW]: 'Ban Rà soát CTĐT ngành Kỹ thuật phần mềm (năm 2024)',
};

export enum paymentStatusEnum {
    Pending = '1',
    Approved = '2',
    Rejected = '3',
}

export const paymentStatusLabel: Record<paymentStatusEnum, string> = {
    [paymentStatusEnum.Pending]: 'Chờ duyệt',
    [paymentStatusEnum.Approved]: 'Đã phê duyệt',
    [paymentStatusEnum.Rejected]: 'Từ chối',
};

const codeOptions = [
    { value: "GV0258", label: "GV0258" },
    { value: "GV1253", label: "GV1253" },
]

export interface IPaymentMember {
    code: string;          // Mã NS
    name: string;    // Họ tên
    department: string;  // Đơn vị
    role: number;        // Vai trò
}


export default function Update_PaymentRequest({ data }: { data: IPaymentRequest }) {
    const form = useForm<IPaymentRequest>({
        initialValues: data,
        
    });

    const roleOptions = Object.entries(RoleTypeLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }))

    const boardOptions = Object.entries(EditorialBoardLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }))

    const paymentStatusOptions = Object.entries(paymentStatusLabel).map(([value, label]) => ({
        value: value.toString(),
        label,
    }));


    useEffect(() => {
        form.setValues(data);
    }, [data, form]);


    const columns = useMemo<MRT_ColumnDef<IPaymentMember>[]>(() => [
        {
            header: "Mã NS",
            id: "code",
            accessorFn: row => (
                <MySelect data={codeOptions}
                    defaultValue={row.code}
                    error={form.errors.code}
                />
            )
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
    ], [form.errors.code]);

    return (
            <MyActionIconUpdate
                title="Chi tiết đề nghị thanh toán"
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
                        <SimpleGrid py={30} cols={2}>
                            <Stack>
                                <MyTextInput label='Mã đề nghị thanh toán' {...form.getInputProps("paymentCode")} />
                                <MyTextInput label='Tên đề nghị thanh toán' {...form.getInputProps("paymentName")} />
                                <MySelect label='Đối tượng thanh toán' data={boardOptions}  {...form.getInputProps("paymentObject")}/>
                                <MySelect label='Trạng thái đề nghị' data={paymentStatusOptions} {...form.getInputProps("paymentStatus")}/>
                            </Stack>
                            <Stack>
                                <MyDateInput label='Ngày lập đề nghị' {...form.getInputProps("paymentDate")} />
                                <MyTextInput label='Tổng số tiền đề nghị thanh toán' {...form.getInputProps("paymentAmount")} />
                                <MyFileInput label='Đính kèm file' {...form.getInputProps("paymentFile")} />
                            </Stack>
                        </SimpleGrid>
                        <MyTextArea label='Ghi chú'  {...form.getInputProps("paymentNote")} />
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <MyDataTable
                            enableRowSelection={false}
                            enableRowNumbers={false}
                            columns={columns}
                            data={members || []}
                            renderRowActions={({ row }) => (
                                <Center>
                                    <DeleteList_paymentRequest code={row.original.code} />
                                </Center>
                            )}
                        />
                    </Tabs.Panel>
                </Tabs>
            </MyActionIconUpdate>
    );
}

const members: IPaymentMember[] = [
    {
        code: "GV0258",
        name: "Tô Ngọc Báo",
        department: "KCNTT",
        role: 1,
    },
    {
        code: "GV1253",
        name: "Tô Lanh",
        department: "KDDT",
        role: 2,
    }
];