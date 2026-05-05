"use client";
import {
    Group,
    Select,
    SimpleGrid,
    Stack,
    Tabs,
    TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useMemo, useState } from "react";

import {
    MyActionIconUpdate,
    MyButton,
    MyDataTable,
    MyDateInput,
    MyFileInput,
    MyFlexColumn,
    MyNumberInput,
    MySelect,
    MyTextArea,
    MyTextInput,
} from "aq-fe-framework/components";
import { I_PaymentAdvance } from "./ReadPaymentAdvance";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
// Enums
export enum RequestNSidEnum {
    id1 = 1,
    id2 = 2,
}
export const RequestNSIdLabel: Record<RequestNSidEnum, string> = {
    [RequestNSidEnum.id1]: "GV0258",
    [RequestNSidEnum.id2]: "GV1253",
};

export interface I_CouncilPayeeMember {
    id?: number;
    code: number;
    name: string;
    department: string;
    role: string;
    price: string;
}

export default function PaymentAdvanceUpdate({ values }: { values: I_PaymentAdvance }) {
    const form = useForm({ initialValues: values });

    const [memberData, setMemberData] = useState<I_CouncilPayeeMember[]>([{
        id: 1, code: 1, name: "Nguyễn Văn A", department: "CNTT", role: 'Trưởng ban', price: '15.000.000'
    }, {
        id: 2, code: 2, name: "Trần Thị B", department: "Khoa Học", role: 'Thành viên', price: '2.000.000'
    }]);

    const RecommentNSId = Object.entries(RequestNSIdLabel).map(([value, label]) => ({ value, label }));

    const handleMemberChange = useCallback((index: number, field: keyof I_CouncilPayeeMember, value: string) => {
        setMemberData(prev => {
            const updated = [...prev];

            if(!updated[index]){
                return updated
            }

            updated[index] = { ...updated[index], [field]: field === 'code' ? Number(value) : value };
            return updated;
        });
    }, []);


    const memberColumns = useMemo(() => [
        {
            header: "Mã NS",
            accessorKey: "code",
            Cell: ({ row }: any) => (
                <Select data={RecommentNSId} value={memberData[row.index]?.code.toString() || ""}
                    onChange={(val) => val && handleMemberChange(row.index, "code", val)} />
            )
        },
        {
            header: "Họ tên",
            accessorKey: "name",
            Cell: ({ row }: any) => (
                <MyTextInput
                    readOnly
                    variant='unstyled'
                    value={memberData[row.index]?.name || ""}
                    onChange={(e) => handleMemberChange(row.index, "name", e.currentTarget.value)}  />
            )
        },
        {
            header: "Đơn vị",
            accessorKey: "department",
            Cell: ({ row }: any) => (
                <MyTextInput
                    readOnly
                    variant='unstyled'
                    value={memberData[row.index]?.department || ""}
                    onChange={(e) => handleMemberChange(row.index, "department", e.currentTarget.value)} />
            )
        },
        {
            header: "Vai trò",
            accessorKey: "role",
            Cell: ({ row }: any) => (
                <MyTextInput
                    readOnly
                    variant='unstyled'
                    value={memberData[row.index]?.role || ""}
                    onChange={(e) => handleMemberChange(row.index, "role", e.currentTarget.value)} />
            )
        },
        {
            header: "Số tiền",
            accessorKey: "price",
            Cell: ({ row }: any) => (
                <MyTextInput
                    readOnly
                    variant='unstyled'
                    value={memberData[row.index]?.price || ""}
                    onChange={(e) => handleMemberChange(row.index, "price", e.currentTarget.value)} />
            )
        },
    ], [memberData]);

    return (
        <Group>
            <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize="80%" title="Chi tiết đề nghị thanh toán">
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
                                <MyTextInput label="Mã Đề nghị thanh toán" {...form.getInputProps("code")} />
                                <MyTextInput label="Tên đề nghị thanh toán" {...form.getInputProps("name")} />
                                <MySelect label="Đối tượng đề nghị thanh toán" data={["Ban Biên soạn GT nguyên lý kế toán", "Hội đồng thẩm định GT dược lý học", "Hội đồng thẩm định GT phân tích dữ liệu"]} {...form.getInputProps("object")} />
                                <MySelect label="Trạng thái đề nghị" data={["Đang chờ duyệt", "Đã duyệt", "Đã từ chối"]} {...form.getInputProps("status")} />
                            </Stack>
                            <Stack>
                                <MyDateInput label="Ngày lập đề nghị thanh toán" {...form.getInputProps("date")} />
                                <MyNumberInput label="Tổng số tiền thanh toán" {...form.getInputProps("price")} />
                                <MyFileInput label="Tài liệu/ minh chứng đi kèm" />
                                <MyTextArea label="Ghi chú" {...form.getInputProps("notes")} />
                            </Stack>
                        </SimpleGrid>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <MyFlexColumn>
                            <MyDataTable
                                data={memberData}
                                columns={memberColumns}
                                getRowId={(row) => row.id?.toString() ?? row.code.toString()}
                                enableRowSelection={false}
                                enableRowNumbers={false}
                            />
                        </MyFlexColumn>
                    </Tabs.Panel>
                </Tabs>
            </MyActionIconUpdate>
        </Group>
    );
}