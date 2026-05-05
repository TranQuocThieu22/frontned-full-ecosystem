import { Select, SimpleGrid, Stack, Tabs, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyActionIcon, MyActionIconDelete, MyButton, MyButtonModal, MyCenterFull, MyDataTable, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { I_CommitteeMemberTable, roleOptions } from "./CommitteeUpdate";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";

export default function CommitteeTableCreate() {
    const disclosure = useDisclosure(false);
    const committeeAssignmentForm = useForm({
            initialValues: {  }
        });

        const columns = useMemo<MRT_ColumnDef<I_CommitteeMemberTable>[]>(() => [
        {
            header: "Mã NS",
            id: "code",
            accessorFn: row => (
                <TextInput
                    value={row.code}
                    onChange={() => { }}
                />
            ),
        },
        {
            header: "Họ tên",
            id: "name",
            accessorFn: row => (
                <TextInput
                    value={row.name}
                    onChange={() => { }}
                />
            ),
        },
        {
            header: "Đơn vị",
            id: "department",
            accessorFn: row => (
                <TextInput
                    value={row.department}
                    onChange={() => { }}
                />
            ),
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
    return(
        <MyButtonModal crudType="create" disclosure={disclosure} modalSize={"80%"}>
                <Tabs defaultValue="tab1" h={"55vh"}>
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
                    <SimpleGrid p={"md"} cols={2}>
                        <Stack>
                            <MyTextInput label='Mã ban biên soạn' {...committeeAssignmentForm.getInputProps("id")} />
                            <MyTextInput label='Tên ban biên soạn' {...committeeAssignmentForm.getInputProps("name")} />
                            <MySelect label='Đề xuất' data={["Bài báo tạp chí uy tín"]} {...committeeAssignmentForm.getInputProps("suggestion")} />
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
                        data={[]}
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
            <MyButton crudType="save" onSubmit={() => { }} w={"100%"}/>
        </MyButtonModal>
    )
}