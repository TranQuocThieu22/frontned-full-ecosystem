"use client";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import {
  Center,
  Group,
  SimpleGrid,
  Stack,
  Tabs
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  MyButton,
  MyButtonCreate,
  MyDataTable,
  MyDateInput,
  MyFlexColumn,
  MySelect,
  MyTextArea,
  MyTextInput
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
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
export const RequestNSIdLabel: Record<RequestIdEnum, string> = {
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

export default function ReviewBoardCreate() {

  const form = useForm<I_ReviewBoard>({

  })

  const roleOptions = Object.entries(RoleTypeLabel).map(([key, label]) => ({
    value: key,
    label,
  }));

  const RecommentNSId = Object.entries(RequestNSIdLabel).map(([value, label]) => ({
    value: value.toString(),
    label,
  }));

  const RecommentId = Object.entries(RequestIdLabel).map(([value, label]) => ({
    value: value.toString(),
    label,
  }));

  const memberColumns = useMemo<MRT_ColumnDef<I_CouncilPayeeMember>[]>(() => [
    {
      header: "Mã NS",
      accessorKey: "code",
      Cell: () => (
        <MySelect data={RecommentNSId} />
      ),
    },
    {
      header: "Họ tên",
      accessorKey: "name",
      Cell: () => <MyTextInput placeholder="Họ tên" />,
    },
    {
      header: "Đơn vị",
      accessorKey: "department",
      Cell: () => <MyTextInput placeholder="Đơn vị" />,
    },
    {
      header: "Vai trò",
      accessorKey: "role",
      Cell: () => <MySelect data={roleOptions} />,
    },
  ], []);

  const proposalColumns = useMemo<MRT_ColumnDef<I_Pupose>[]>(() => [
    {
      header: "Mã đề xuất",
      accessorKey: "code",
      Cell: () => <MySelect data={RecommentId} />,
    },
    {
      header: "Tên giáo trình",
      accessorKey: "name",
      Cell: () => <MyTextInput />,
    },
  ], []);

  // Tab 1
  function TabGeneral() {
    return (
      <SimpleGrid p="md" cols={2}>
        <Stack>
          <MyTextInput label="Mã hội đồng" />
          <MyTextInput label="Tên hội đồng" />
          <MySelect label="Trạng thái hội đồng" data={["đã thành lập, đang chờ họp", "chưa thành lập"]} />
          <MyTextArea label="Ghi chú" />
        </Stack>
        <Stack>
          <MyDateInput label="Ngày họp dự kiến" />
          <MyTextInput label="Thời gian họp" />
          <MyTextInput label="Địa điểm họp" />
          <MyFileInput label="Đính kèm file" />
        </Stack>
      </SimpleGrid>
    );
  }

  // Tab 2
  function TabMembers() {
    return (
      <MyFlexColumn>
        <MyDataTable
          enableRowSelection={false}
          enableRowNumbers={false}
          columns={memberColumns}
          data={[]} // No mock data
          renderTopToolbarCustomActions={() => (
            <Group>
              <MyButton crudType="delete" onSubmit={() => { }} />
            </Group>
          )}
          renderRowActions={({ row }) => (
            <Center>
              <MemberDelete id={row.original.id ?? 0} />
            </Center>
          )}
        />
      </MyFlexColumn>
    );
  }

  // Tab 3
  function TabProposals() {
    return (
      <MyFlexColumn>
        <MyDataTable
          enableRowSelection={false}
          enableRowNumbers={false}
          columns={proposalColumns}
          data={[]} // No mock data
          renderTopToolbarCustomActions={() => (
            <Group>
              <MyButton crudType="delete" onSubmit={() => { }} />
            </Group>
          )}
          renderRowActions={({ row }) => (
            <Center>
              <PupposeListDelete id={row.original.id ?? 0} />
            </Center>
          )}
        />
      </MyFlexColumn>

    );
  }

  return (
    <Group>
      <MyButtonCreate
        form={form}
        onSubmit={() => { }}
        modalSize="80%"
      >
        <Tabs defaultValue="tab1">
          <Tabs.List>
            <Tabs.Tab value="tab1">Thông tin chung</Tabs.Tab>
            <Tabs.Tab value="tab2">Thành viên</Tabs.Tab>
            <Tabs.Tab value="tab3">Danh sách đề xuất</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="tab1"><TabGeneral /></Tabs.Panel>
          <Tabs.Panel value="tab2"><TabMembers /></Tabs.Panel>
          <Tabs.Panel value="tab3"><TabProposals /></Tabs.Panel>
        </Tabs>
      </MyButtonCreate>
    </Group>
  );
}
