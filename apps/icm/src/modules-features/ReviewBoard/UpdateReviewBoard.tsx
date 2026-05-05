"use client";
import {
    Center,
    Group,
    Select,
    SimpleGrid,
    Stack,
    Tabs,
    TextInput,
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
    MySelect,
    MyTextArea,
    MyTextInput,
} from "aq-fe-framework/components";
import MemberDelete from "./DeleteMember";
import PupposeListDelete from "./DeletePuposeList";
import { I_ReviewBoard } from "./ReadReviewBoard";

// Enums
export enum EnumRoleType {
    CHAIRMAN = "1",
    SECRETARY = "2",
    MEMBER_DEBATE = "3",
}
export const RoleTypeLabel: Record<EnumRoleType, string> = {
    [EnumRoleType.CHAIRMAN]: "Chủ tịch",
    [EnumRoleType.SECRETARY]: "Thư ký",
    [EnumRoleType.MEMBER_DEBATE]: "Ủy viên phản biện",
};

export enum RequestIdEnum {
    id1 = 1,
    id2 = 2,
}
export const RequestIdLabel: Record<RequestIdEnum, string> = {
    [RequestIdEnum.id1]: "PYB-2025-001",
    [RequestIdEnum.id2]: "AIH-2025-002",
};

export enum RequestNSidEnum {
    id1 = 1,
    id2 = 2,
}
export const RequestNSIdLabel: Record<RequestNSidEnum, string> = {
    [RequestNSidEnum.id1]: "GV0258",
    [RequestNSidEnum.id2]: "GV1253",
};

// Interfaces
export interface I_Pupose {
    id?: number;
    code?: number;
    name?: string;
}
export interface I_CouncilPayeeMember {
    id?: number;
    code: number;
    name: string;
    department: string;
    role: number;
}

export default function ReviewBoardUpdate({ values }: { values: I_ReviewBoard }) {
    const form = useForm({ initialValues: values });

    const [memberData, setMemberData] = useState<I_CouncilPayeeMember[]>([{
        id: 1, code: 1, name: "Nguyễn Văn A", department: "CNTT", role: Number(EnumRoleType.CHAIRMAN),
    }, {
        id: 2, code: 2, name: "Trần Thị B", department: "Khoa Học", role: Number(EnumRoleType.SECRETARY),
    }]);

    const [proposalData, setProposalData] = useState<I_Pupose[]>([{
        id: 1, code: 1, name: "Lập trình python cơ bản",
    }, {
        id: 2, code: 2, name: "Trí tuệ nhân tạo trong Y học",
    }]);

    const roleOptions = Object.entries(RoleTypeLabel).map(([value, label]) => ({ value, label }));
    const RecommentNSId = Object.entries(RequestNSIdLabel).map(([value, label]) => ({ value, label }));
    const RecommentId = Object.entries(RequestIdLabel).map(([value, label]) => ({ value, label }));

    const handleMemberChange = useCallback((index: number, field: keyof I_CouncilPayeeMember, value: string) => {
        setMemberData(prev => {
            const updated = [...prev];

            if(!updated[index]) return updated;

            updated[index] = { ...updated[index], [field]: field === 'role' || field === 'code' ? Number(value) : value };
            return updated;
        });
    }, []);

    const handleProposalChange = useCallback((index: number, field: keyof I_Pupose, value: string) => {
        setProposalData(prev => {
            const updated = [...prev];
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
                <TextInput value={memberData[row.index]?.name || ""}
                    readOnly
                    variant="unstyled"
                    />
            )
        },
        {
            header: "Đơn vị",
            accessorKey: "department",
            Cell: ({ row }: any) => (
                <TextInput value={memberData[row.index]?.department || ""}
                    readOnly
                    variant="unstyled" />
            )
        },
        {
            header: "Vai trò",
            accessorKey: "role",
            Cell: ({ row }: any) => (
                <Select data={roleOptions} value={memberData[row.index]?.role.toString() || ""}
                    onChange={(val) => val && handleMemberChange(row.index, "role", val)} />
            )
        },
    ], [memberData]);

    const proposalColumns = useMemo(() => [
        {
            header: "Mã đề xuất",
            accessorKey: "code",
            Cell: ({ row }: any) => (
                <Select data={RecommentId} value={proposalData[row.index]?.code?.toString() || ""}
                    onChange={(val) => val && handleProposalChange(row.index, "code", val)} />
            )
        },
        {
            header: "Tên giáo trình",
            accessorKey: "name",
            Cell: ({ row }: any) => (
                <TextInput value={proposalData[row.index]?.name || ""}
                    readOnly
                    variant="unstyled" />
            )
        }
    ], [proposalData]);

    return (
        <Group>
            <MyActionIconUpdate form={form} onSubmit={() => { }} modalSize="80%">
                <Tabs defaultValue="tab1">
                    <Tabs.List>
                        <Tabs.Tab value="tab1">Thông tin chung</Tabs.Tab>
                        <Tabs.Tab value="tab2">Thành viên</Tabs.Tab>
                        <Tabs.Tab value="tab3">Danh sách đề xuất</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="tab1">
                        <SimpleGrid p="md" cols={2}>
                            <Stack>
                                <MyTextInput label="Mã hội đồng" {...form.getInputProps("code")} />
                                <MyTextInput label="Tên hội đồng" {...form.getInputProps("name")} />
                                <MySelect label="Trạng thái hội đồng" data={["Đã thành lập; Đang chờ họp", "Chưa thành lập"]} {...form.getInputProps("status")} />
                                <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
                            </Stack>
                            <Stack>
                                <MyDateInput label="Ngày họp dự kiến" {...form.getInputProps("meetingdate")} />
                                <MyTextInput label="Thời gian họp" {...form.getInputProps("meetingTime")} />
                                <MyTextInput label="Địa điểm họp" {...form.getInputProps("meetingLocation")} />
                                <MyFileInput label="Đính kèm file" />
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
                                renderRowActions={({ row }) => (
                                    <Center><MemberDelete id={row.original.id ?? 0} /></Center>
                                )}
                            />
                        </MyFlexColumn>
                    </Tabs.Panel>

                    <Tabs.Panel value="tab3">
                        <MyFlexColumn>
                            <MyDataTable
                                data={proposalData}
                                columns={proposalColumns}
                                getRowId={(row) => row.id?.toString() ?? row.code?.toString() ?? row.name}
                                enableRowSelection={false}
                                enableRowNumbers={false}
                                renderRowActions={({ row }) => (
                                    <Center><PupposeListDelete id={row.original.id ?? 0} /></Center>
                                )}
                            />
                        </MyFlexColumn>
                    </Tabs.Panel>
                </Tabs>
            </MyActionIconUpdate>
        </Group>
    );
}