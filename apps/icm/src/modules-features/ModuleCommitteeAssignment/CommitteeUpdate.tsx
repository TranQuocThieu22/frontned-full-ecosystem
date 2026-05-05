import { Select, SimpleGrid, Stack, Tabs, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyActionIcon, MyActionIconDelete, MyActionIconUpdate, MyCenterFull, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export default function CommitteeUpdate({ data }: { data: any }) {

    const committeeAssignmentForm = useForm({
        initialValues: { ...data }
    });

    const CommitteeMemeberQuery = useQuery<I_CommitteeMemberTable[]>({
        queryKey: ['CommitteeMemberQuery'],
        queryFn: () => {
            return committeeMemberMockData ?? []
        }
    });

    const columns = useMemo<MRT_ColumnDef<I_CommitteeMemberTable>[]>(() => [
        {
            header: "Mã NS",
            id: "code",
            accessorFn: row => (
                <Select
                    data={userOptions}
                    value={row.code}
                    onChange={() => { }}
                />
            ),
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
            id: "role",
            accessorFn: row => (
                <Select
                    data={roleOptions}
                    value={row.role}
                    onChange={() => { }}
                />
            ),
        },
    ], []);

    if (CommitteeMemeberQuery.isLoading) return "Đang tải . . .";
    if (CommitteeMemeberQuery.isError) return "Lỗi đã xảy ra";

    return (
        <MyActionIconUpdate
            onSubmit={() => { }}
            form={committeeAssignmentForm}
            modalSize={"80%"}
        >
            <Tabs defaultValue="tab1" m={10}>
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
                <Tabs.Panel value="tab1" >
                    <SimpleGrid p={"md"} cols={2}>
                        <Stack>
                            <MyTextInput label='Mã ban biên soạn' {...committeeAssignmentForm.getInputProps("code")} />
                            <MyTextInput label='Tên ban biên soạn' {...committeeAssignmentForm.getInputProps("name")} />
                            <MySelect label='Đề xuất' data={["Bài báo tạp chí uy tín"]} defaultValue={"Bài báo tạp chí uy tín"} {...committeeAssignmentForm.getInputProps("suggestion")} />
                        </Stack>
                        <Stack>
                            <MyDateInput label='Thời gian hoàn thành' {...committeeAssignmentForm.getInputProps("deadline")} />
                            <MyFileInput label='Đính kèm file' />
                        </Stack>
                    </SimpleGrid>
                    <SimpleGrid p={"md"} cols={2}>
                        <Stack>
                            <MyTextArea label='Mục tiêu/ Yêu cầu công việc' {...committeeAssignmentForm.getInputProps("objectives")} />
                        </Stack>
                        <Stack>
                            <MyTextArea label='Ghi chú' {...committeeAssignmentForm.getInputProps("note")} />
                        </Stack>
                    </SimpleGrid>
                </Tabs.Panel>
                <Tabs.Panel value="tab2">
                    <MyDataTable
                        columns={columns}
                        data={CommitteeMemeberQuery.data!}
                        enableRowSelection={false}
                        enableRowNumbers={false}
                        exportAble={false}

                        renderRowActions={({ row }) => (
                            <MyCenterFull>

                                <MyActionIconDelete onSubmit={() => { }} />
                            </MyCenterFull>
                        )}
                        renderTopToolbarCustomActions={() => (<>
                            <MyActionIcon crudType="create" color={"green"} onSubmit={() => { }} />
                        </>)}
                    >

                    </MyDataTable>
                </Tabs.Panel>
            </Tabs>
        </MyActionIconUpdate>
    )
}

export interface I_CommitteeMemberTable {
    code: string;      // Mã NS
    name: string;      // Họ tên
    department: string; // Đơn vị
    role: string;      // Vai trò
}

const committeeMemberMockData: I_CommitteeMemberTable[] = [
    {
        code: "GV0258",
        name: "Tô Ngọc Báo",
        department: "KCNTT",
        role: "Trưởng ban",
    },
    {
        code: "GV1253",
        name: "Tô Lanh",
        department: "KDDT",
        role: "Thành viên",
    },
];

export const userOptions = [
    { value: "GV0258", label: "GV0258" },
    { value: "GV1253", label: "GV1253" },
];

export const roleOptions = [
    { value: "Trưởng ban", label: "Trưởng ban" },
    { value: "Thành viên", label: "Thành viên" },
];