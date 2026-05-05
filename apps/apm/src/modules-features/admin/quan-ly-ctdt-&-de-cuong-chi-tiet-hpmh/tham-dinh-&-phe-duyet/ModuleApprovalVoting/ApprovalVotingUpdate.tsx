import MyButtonImport from "@/components/Buttons/ButtonImport/MyButtonImport";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import { Flex, SimpleGrid, Stack, Tabs, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MyActionIconUpdate, MyCenterFull, MyDataTable, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { I_ApprovalVotingTable } from "./ApprovalVotingTable";

export default function ApprovalVotingUpdate({ data }: { data: I_ApprovalVotingTable }) {
    const updateForm = useForm({
        initialValues: data,
    });

    const votingMemberQuery = useQuery<I_VotingMemberTable[]>({
        queryKey: ["votingMemberQuery"],
        queryFn: async () => votingMemberMockData ?? []
    });

    const memberColumns = useMemo<MRT_ColumnDef<I_VotingMemberTable>[]>(() => [
        { header: "Mã NS", accessorKey: "code" },
        { header: "Họ tên", accessorKey: "name" },
        { header: "Đơn vị", accessorKey: "department" },
        { header: "Vai trò", accessorKey: "role" },
        {
            header: "Biểu quyết",
            accessorFn: row => (
                <MySelect
                    data={voteOptions}
                    value={row.vote}
                />
            ),
            id: "vote"
        }
    ], []);

    if (votingMemberQuery.isLoading) {
        return <MyCenterFull>Đang tải dữ liệu...</MyCenterFull>;
    }
    if (votingMemberQuery.isError) {
        return <MyCenterFull>Có lỗi đã xảy ra</MyCenterFull>;
    }
    return (
        <MyActionIconUpdate onSubmit={() => { }} form={updateForm} modalSize={"100%"} title="Chi tiết hội đồng thẩm định">
            <Tabs defaultValue="tab1" >
                <Tabs.List>
                    <Tabs.Tab
                        bg="rgba(131, 204, 235, 0.3)"
                        color="rgba(131, 204, 235, 1)"
                        flex={1}
                        value="tab1">Thông tin chung</Tabs.Tab>
                    <Tabs.Tab
                        bg="rgba(247, 216, 54, 0.3)"
                        color="rgba(247, 216, 54, 1)"
                        flex={1}
                        value="tab2">Thành viên</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="tab1">
                    <SimpleGrid cols={2} p={5}>
                        <Stack>
                            <MyTextInput disabled label="Mã hội đồng thẩm định" {...updateForm.getInputProps("code")} />
                            <MyTextInput disabled label="Tên hội đồng thẩm định" {...updateForm.getInputProps("name")} />
                            <MySelect
                                data={["Đang thực hiện", "Đã hoàn tất", "Đã hủy"]}
                                label="Trạng thái thẩm định"
                                defaultValue={updateForm.getInputProps("status").value}
                            />
                            <MyTextInput label="Quyết định cuối cùng" {...updateForm.getInputProps("finalDecision")} />
                            <MyTextArea label="Yêu cầu chỉnh sửa chi tiết" {...updateForm.getInputProps("editRequestDetail")} />
                            <MyTextArea label="Lý do từ chối (nếu có)" />
                        </Stack>
                        <Stack>
                            <MyDateInput label="Ngày họp" {...updateForm.getInputProps("date")} />
                            <Stack gap={0}>
                                <Text >File đính kèm (biên bản: tổng hợp điểm)</Text>
                                <Flex><MyButtonImport onImport={() => { }} /></Flex>
                            </Stack>
                            <MyTextInput label="Địa điểm họp" />


                            <MyTextArea pt={76} label="Ghi chú của người tổng hợp" {...updateForm.getInputProps("reviewerNote")} />
                        </Stack>
                    </SimpleGrid>
                </Tabs.Panel>
                <Tabs.Panel value="tab2">
                    <MyDataTable
                        columns={memberColumns}
                        data={votingMemberQuery.data!}
                        enableRowSelection={false}
                        enableRowNumbers={false}
                        exportAble={false}
                    >
                    </MyDataTable>
                </Tabs.Panel>
            </Tabs>
        </MyActionIconUpdate>
    )
}

export interface I_VotingMemberTable {
    code: string;         // Mã NS
    name: string;         // Họ tên
    department: string;   // Đơn vị
    role: string;         // Vai trò
    vote: string;         // Biểu quyết ("Tán thành", "Không tán thành"), non-text (sử dụng select trong columns)
}

const votingMemberMockData: I_VotingMemberTable[] = [
    {
        code: "GV0258",
        name: "Tô Ngọc Báo",
        department: "KCNTT",
        role: "Chủ tịch",
        vote: "Tán thành"
    },
    {
        code: "GV1253",
        name: "Tô Lanh",
        department: "KDDT",
        role: "Ủy viên phản biện",
        vote: "Không tán thành"
    }
];

const voteOptions = [
    { value: "Tán thành", label: "Tán thành" },
    { value: "Không tán thành", label: "Không tán thành" }
];