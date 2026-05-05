"use client";
import {
    Group,
    Select,
    SimpleGrid,
    Stack,
    Tabs
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMemo } from "react";

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import {
    MyButton,
    MyDataTable,
    MyDateInput,
    MyFileInput,
    MyFlexColumn,
    MySelect,
    MyTextArea,
    MyTextInput
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { I_ReviewBoard } from "../../xet-duyet-de-xuat/ReviewBoard/ReadReviewBoard";
// Enums
export enum RequestNSidEnum {
    id1 = 1,
    id2 = 2,
}
export const RequestNSIdLabel: Record<RequestNSidEnum, string> = {
    [RequestNSidEnum.id1]: "GV0258",
    [RequestNSidEnum.id2]: "GV1253",
};

export interface I_Member {
    id?: number;
    code: number;
    name: string;
    department: string;
    role: string;
    price: string;
}

export default function PaymentAdvanceCreate() {
    const form = useForm<I_ReviewBoard>({});

    const RecommentNSId = Object.entries(RequestNSIdLabel).map(([value, label]) => ({ value: value.toString(), label }));

    const memberColumns = useMemo<MRT_ColumnDef<I_Member>[]>(() => [
        {
            header: "Mã NS",
            accessorKey: "code",
            Cell: () => (
                <Select data={RecommentNSId} />
            )
        },
        {
            header: "Họ tên",
            accessorKey: "name",
            Cell: () => <MyTextInput placeholder="Họ tên" readOnly variant="unstyled" />,
        },
        {
            header: "Đơn vị",
            accessorKey: "department",
            Cell: () => <MyTextInput placeholder="Đơn vị" readOnly variant="unstyled" />,
        },
        {
            header: "Vai trò",
            accessorKey: "role",
            Cell: () => <MyTextInput placeholder="Vai trò" readOnly variant="unstyled" />,
        }, {
            header: "Số tiền",
            accessorKey: "price",
            Cell: ({ row }: any) => (
                <MyTextInput
                    readOnly
                    variant='unstyled'
                    onChange={(e) => { }} />
            )
        },
    ], []);

    return (
        <Group>
            <MyButtonCreate form={form} onSubmit={() => { }} modalSize="80%" title="Chi tiết đề nghị thanh toán">
                <Tabs defaultValue="tab1">
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
                        <SimpleGrid p="md" cols={2}>
                            <Stack>
                                <MyTextInput label="Mã Đề nghị thanh toán" />
                                <MyTextInput label="Tên đề nghị thanh toán" />
                                <MySelect label="Đối tượng đề nghị thanh toán" data={["Ban biên soạn GT nguyên lý kế toán", "Hội đồng thẩm định GT dược lý học", "Hội đồng thẩm định GT phân tích dữ liệu"]} />
                                <MySelect label="Trạng thái đề nghị" data={["đã phê duyệt", "đã từ chối"]} />
                            </Stack>
                            <Stack>
                                <MyDateInput label="Ngày lập đề nghị thanh toán" />
                                <MyTextInput label="Tổng số tiền thanh toán" />
                                <MyFileInput label="Tài liệu/ minh chứng đi kèm" />
                                <MyTextArea label="Ghi chú" />
                            </Stack>
                        </SimpleGrid>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <MyFlexColumn>
                            <MyDataTable
                                columns={memberColumns}
                                getRowId={(row) => row.id?.toString() ?? row.code.toString()}
                                enableRowSelection={false}
                                enableRowNumbers={false}
                                data={[]} />
                        </MyFlexColumn>
                    </Tabs.Panel>
                </Tabs>
            </MyButtonCreate>
        </Group>
    );
}