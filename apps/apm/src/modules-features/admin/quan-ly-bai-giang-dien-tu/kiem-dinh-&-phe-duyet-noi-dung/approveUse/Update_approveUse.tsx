"use client";
import { Center, Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle, IconLibrary } from '@tabler/icons-react';
import { MyActionIconUpdate, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { I_ApproveUse } from './Read_approveUse';
import Update_delete from './Update_delete';

export enum EnumRoleType {
    Man1 = '1',
    Man2 = '2',
}

export const RoleTypeLabel: Record<EnumRoleType, string> = {
    [EnumRoleType.Man1]: 'Tô Ngọc Lan',
    [EnumRoleType.Man2]: 'Lưu Quang Tấn',
};

export enum EditorialBoard {
    Decision = '1',
    Approved = '2',
}

export const EditorialBoardLabel: Record<EditorialBoard, string> = {
    [EditorialBoard.Decision]: 'Chờ quyết định',
    [EditorialBoard.Approved]: 'Đã phê duyệt',
};

export interface I_Member {
    id?: string;            // ID của thành viên
    lectureCode: string;      // Mã Bài giảng
    lectureName: string;    // Tên bài giảng
    role: number;         // Vai trò ( người phụ trách )
}

const lectureOptions = [
    { value: "PYB-2025-001", label: "PYB-2025-001" },
    { value: "AIH-2025-002", label: "AIH-2025-002" },
]

export default function Update_approveUse({ data }: { data: I_ApproveUse }) {
    const form = useForm<I_ApproveUse>({
        initialValues: data,
        validate: {
            lectureCode: (value) => value ? null : 'Không được để trống',
            lectureName: (value) => value ? null : 'Không được để trống',
        }
    });

    const roleOptions = Object.entries(RoleTypeLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }))
    const boardOptions = Object.entries(EditorialBoardLabel).map(([key, value]) => ({
        value: key.toString(),
        label: value,
    }))

    const columns = useMemo<MRT_ColumnDef<I_Member>[]>(() => [
        {
            header: "Mã bài giảng",
            accessorKey: "lectureCode",
            accessorFn: (row) => <MySelect
                placeholder="Mã Bài giảng"
                defaultValue={row.lectureCode}
                data={lectureOptions}
            />,
        },
        {
            header: "Tên bài giảng",
            accessorKey: "lectureName",

        },
        {
            header: "Người phụ trách",
            id: "personInCharge",
            accessorFn: (row) => (
                <MySelect
                    placeholder="Người phụ trách"
                    defaultValue={"Tô Ngọc Lan"}
                    data={["Tô Ngọc Lan"]}
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
                modalSize={"70%"}
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
                            leftSection={<IconLibrary />}
                            value="tab2">Danh sách bài giảng điện tử</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="tab1">
                        <SimpleGrid p={"md"} cols={2}>
                            <Stack>
                                <MyTextInput label='Số Quyết định' {...form.getInputProps("code")} />
                                <MyTextInput label='Tên Quyết định' {...form.getInputProps("name")} />
                                <MyFileInput label='File Quyết định' />
                            </Stack>
                            <Stack>
                                <MySelect label='Trạng thái phê duyệt' data={boardOptions} defaultValue={boardOptions[0]?.value} />
                                <MyDateInput label='Ngày ban hành quyết định' {...form.getInputProps("decisionDate")} />
                                <MyTextInput label='Người ký duyệt/Ban hành quyết định' {...form.getInputProps("signer")} />
                            </Stack>
                        </SimpleGrid>
                        <SimpleGrid p={"md"} cols={2}>
                            <Stack>
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
                            renderRowActions={({ row }) => (
                                <Center>
                                    <Update_delete id={row.original.id ?? ""} code={row.original.lectureCode ?? ""} />
                                </Center>
                            )}
                        />
                    </Tabs.Panel>
                </Tabs>
            </MyActionIconUpdate>
        </Group>
    );
}

const members: I_Member[] = [
    {
        lectureCode: "PYB-2025-001",
        lectureName: "Lập trình Python cơ bản",
        role: 1,
    },
    // {
    //     lectureCode: "AIH-2025-002",
    //     lectureName: "Trí tuệ nhân tạo trong Y học",
    //     role: 2,
    // }
];