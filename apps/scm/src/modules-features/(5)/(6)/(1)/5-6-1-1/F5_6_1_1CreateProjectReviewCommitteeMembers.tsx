'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import FeatDeleteListOfMember from './F5_6_1_1DeleteListOfMembers';
import FeatDeleteListOfTopic from './F5_6_1_1DeleteListOfTopic';
import { I6_5_1_1ProjectReviewCommitteeMembers } from "./F5_6_1_1ReadProjectReviewCommitteeMembers";
import FeatUpdateListOfMember from './F5_6_1_1UpdateListMembers';
import FeatUpdateListOfTopic from './F5_6_1_1UpdateListOfTopic';
export interface I6_5_1_1ListOfMember {
  id?: number //STT
  code?: string //Mã giảng viên
  name?: string //Họ tên'
  title?: string //Học hàm - học vị
  collaborationUnit?: string // Đơn vị cộng tác
  role?: string // Vai trò
}

export interface I6_5_1_1ListOfTopic {
  id?: number //STT
  code?: string //Mã đề tài
  topicname?: string // Tên đề tài
  leaderName?: string //Chủ nhiệm đề tài

}

export default function F6_5_1_1CreateProjectReviewCommitteeMembers() {
  const form = useForm<I6_5_1_1ProjectReviewCommitteeMembers>({
    initialValues: {
      id: 0,
      decisionNumber: "",
      decisionDate: "",
      decisionName: "",
      topicName: "",
    }
  })
  const query = useQuery<I6_5_1_1ListOfMember[]>({
    queryKey: [`ReadI6_5_1_1ListOfMember`],
    queryFn: async () => [
      {
        id: 1,
        code: "GV001",
        name: "Nguyễn Văn A",
        title: "Phó Giáo sư - Tiến sĩ",
        collaborationUnit: "Trường đại học Văn Lang",
        role: "Chủ nhiệm"
      },

    ],
  });
  const query1 = useQuery<I6_5_1_1ListOfTopic[]>({
    queryKey: [`ReadI6_5_1_1ListOfTopic`],
    queryFn: async () => [
      {
        id: 1,
        code: "DT001",
        topicname: "Đổi mới giáo dục Đại học",
        leaderName: "Nguyễn Hữu Luân",
      },

    ],
  });
  const columns = useMemo<MRT_ColumnDef<I6_5_1_1ListOfMember>[]>(() => [
    {
      header: "Mã giảng viên",
      accessorKey: "code",
    },
    {
      header: "Họ tên",
      accessorKey: "name",
    },
    {
      header: "Học hàm - học vị",
      accessorKey: "title",
    },
    {
      header: "Đơn vị cộng tác",
      accessorKey: "collaborationUnit",
    },
    {
      header: "Vai trò",
      accessorKey: "role",
    },
    {
      header: "Lý lịch",
      accessorFn: () =>
        <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
    }
  ], []);
  const columns1 = useMemo<MRT_ColumnDef<I6_5_1_1ListOfTopic>[]>(() => [
    {
      header: "Mã đề tài",
      accessorKey: "code",
    },
    {
      header: "Tên đề tài",
      accessorKey: "topicname",
    },
    {
      header: "Chủ nhiệm đề tài",
      accessorKey: "leaderName",
    },

  ], []);

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";
  if (query1.isLoading) return "Đang tải dữ liệu...";
  if (query1.isError) return "Không có dữ liệu...";




  return (
    <MyButtonCreate objectName="Quyết định Thành lập hội đồng nghiệm thu đề tài cấp trường" form={form} onSubmit={() => { }} modalSize={"100%"}>
      <MyFlexRow >
        <MyTextInput label="Số quyết định" {...form.getInputProps("decisionNumber")} />
        <MyDateInput label="Ngày quyết định" {...form.getInputProps("decisionDate")} />
      </MyFlexRow>
      <MyTextInput label="Tên quyết định" {...form.getInputProps("topicName")} />
      <MyDataTable
        columns={columns}
        data={query.data!}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>

              <FeatUpdateListOfMember values={row.original} />
              <FeatDeleteListOfMember id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      />
      <MyDataTable
        columns={columns1}
        data={query1.data!}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>

              <FeatUpdateListOfTopic values={row.original} />
              <FeatDeleteListOfTopic id={row.original.id!} />
            </MyCenterFull>
          );
        }}
      />
    </MyButtonCreate>

  )
}