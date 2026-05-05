"use client";
import { Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle, IconUsers } from '@tabler/icons-react';
import { MyButton, MyButtonCreate, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { I_AppraisalCouncil } from './AppraisalCouncilTable';

export interface I_CouncilMember {
    code: string;        // Mã NS
    name: string;        // Họ tên
    department: string;  // Đơn vị
    role: string;        // Vai trò
}

export default function AppraisalCouncilCreate() {
    const form = useForm<I_AppraisalCouncil>({
        initialValues: {
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
            documentTitle: (value) => value ? null : 'Không được để trống',
            evaluationPurpose: (value) => value ? null : 'Không được để trống',
            meetingDate: (value) => value ? null : 'Không được để trống',
            meetingLocation: (value) => value ? null : 'Không được để trống',
            members: (value) => value ? null : 'Không được để trống',
            attachedFileData: (value) => value ? null : 'Không được để trống',
        }
    });

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
                    <MySelect data={roleTypeData?.map((unit) => ({
                        value: unit.id?.toString() || "",
                        label: unit.name?.trim() || "Không có tên",
                    })) || []}
                        defaultValue={roleTypeData[0]?.id?.toString() || ""}
                        onChange={(value) => originalRow.role = value?.toString() || ""}
                    />
                );
            },
        },
    ], []);

    return (
        <Group>
            <MyButtonCreate
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
                                <MySelect label='Ban biên soạn' data={[]} />
                                <MySelect label='Tài liệu biên soạn' data={[]} />
                            </Stack>
                            <Stack>
                                <MyDateInput label='Ngày họp' {...form.getInputProps("meetingDate")} />
                                <MyFileInput label='Đính kèm file' {...form.getInputProps("attachedFileData")} />
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
                            data={[]}
                            renderTopToolbarCustomActions={({ }) => (
                                <Group>
                                    <MyButton crudType="delete" onSubmit={() => { }} >Xóa</MyButton>
                                </Group>
                            )}
                        />
                    </Tabs.Panel>
                </Tabs>
            </MyButtonCreate>
        </Group>
    );
}
const roleTypeData = [
    { id: '1', name: 'Chủ tịch' },
    { id: '2', name: 'Thư ký' },
    { id: '3', name: 'Ủy viên' },
]