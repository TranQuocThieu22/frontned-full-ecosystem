"use client";
import { Center, Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle, IconUsers } from '@tabler/icons-react';
import { MyActionIconUpdate, MyButton, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useEffect, useMemo } from 'react';
import { I_AppraisalCouncil } from './AppraisalCouncilTable';
import CouncilMemberDelete from './CouncilMemberDelete';

export enum EnumRoleType {
    CHAIRMAN = '1',
    SECRETARY = '2',
    MEMBER_DEBATE = '3',
}

export const RoleTypeLabel: Record<EnumRoleType, string> = {
    [EnumRoleType.CHAIRMAN]: 'Chủ tịch',
    [EnumRoleType.SECRETARY]: 'Thư ký',
    [EnumRoleType.MEMBER_DEBATE]: 'Ủy viên phản biện',
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

export enum CompilationTypeEnum {
    MONOGRAPH_ORIGINAL = 1,        // Sách chuyên khảo (viết lần đầu)
    MONOGRAPH_REVISED = 2,         // Sách chuyên khảo (sửa chữa)
    REFERENCE_BOOK = 3,            // Sách tham khảo (viết lần đầu)
    CASEBOOK = 4,                  // Sách tình huống (viết lần đầu)
    TEXTBOOK = 5,                  // Giáo trình (viết lần đầu)
}

export const CompilationTypeLabel: Record<CompilationTypeEnum, string> = {
    [CompilationTypeEnum.MONOGRAPH_ORIGINAL]: 'Sách chuyên khảo (viết lần đầu)',
    [CompilationTypeEnum.MONOGRAPH_REVISED]: 'Sách chuyên khảo (sửa chữa)',
    [CompilationTypeEnum.REFERENCE_BOOK]: 'Sách tham khảo (viết lần đầu)',
    [CompilationTypeEnum.CASEBOOK]: 'Sách tình huống (viết lần đầu)',
    [CompilationTypeEnum.TEXTBOOK]: 'Giáo trình (viết lần đầu)',
};

export interface I_CouncilMember {
    id?: number;
    code: string;        // Mã NS
    name: string;        // Họ tên
    department: string;  // Đơn vị
    role: number;        // Vai trò
}

export default function AppraisalCouncilUpdate({ data }: { data: I_AppraisalCouncil }) {
    const form = useForm<I_AppraisalCouncil>({
        initialValues: data,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',

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

    const compilationTypeOptions = Object.entries(CompilationTypeLabel).map(([value, label]) => ({
        value: value.toString(),
        label,
    }));


    useEffect(() => {
        form.setValues(data);
    }, [data]);

    const columns = useMemo<MRT_ColumnDef<I_CouncilMember>[]>(() => [
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
                    <MySelect data={roleOptions}
                        defaultValue={originalRow.role?.toString() || ""}
                        error={form.errors.role}
                    />
                );
            },
        },
    ], []);

    return (
        <Group>
            <MyActionIconUpdate
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
                                <MyTextInput label='Mã hội đồng thẩm định' {...form.getInputProps("code")} />
                                <MyTextInput label='Tên hội đồng thẩm định' {...form.getInputProps("name")} />
                                <MySelect label='Ban biên soạn' data={boardOptions} defaultValue={boardOptions[0]?.value} />
                                <MySelect label='Tài liệu biên soạn' data={compilationTypeOptions} defaultValue={compilationTypeOptions[0]?.value} />
                            </Stack>
                            <Stack>
                                <MyDateInput label='Ngày họp' {...form.getInputProps("meetingDate")} />
                                <MyFileInput label='Đính kèm file' />
                                <MyTextInput label='Địa điểm họp' {...form.getInputProps("meetingLocation")} />
                            </Stack>
                        </SimpleGrid>
                        <SimpleGrid p={"md"} cols={2}>
                            <Stack>
                                <MyTextArea label='Ghi chú' {...form.getInputProps("note")} />
                            </Stack>
                            <Stack>
                                <MyTextArea label='Mục tiêu/ Yêu cầu công việc' {...form.getInputProps("evaluationPurpose")} />
                            </Stack>
                        </SimpleGrid>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <MyDataTable
                            enableRowSelection={false}
                            enableRowNumbers={false}
                            columns={columns}
                            data={members || []}
                            renderTopToolbarCustomActions={({ }) => (
                                <Group>
                                    <MyButton crudType="delete" onSubmit={() => { }} >Xóa</MyButton>
                                </Group>
                            )}
                            renderRowActions={({ row }) => (
                                <Center>
                                    <CouncilMemberDelete id={row.original.id ?? 0} code={row.original.code} />
                                </Center>
                            )}
                        />
                    </Tabs.Panel>
                </Tabs>
            </MyActionIconUpdate>
        </Group>
    );
}


const members: I_CouncilMember[] = [
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
        role: 3,
    }
];
