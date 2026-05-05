'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_6_1_1CreateProjectReviewCommitteeMembers from "./F5_6_1_1CreateProjectReviewCommitteeMembers";
import FeatDeleteProjectReviewCommitteeMembers from './F5_6_1_1DeleteProjectReviewCommitteeMembers';
import FeatUpdateProjectReviewCommitteeMembers from './F5_6_1_1UpdateProjectReviewCommitteeMembers';

export interface I6_5_1_1ProjectReviewCommitteeMembers {
  id?: number; // STT
  decisionNumber?: string; // Số quyết định
  decisionDate?: string; // Ngày quyết định
  decisionName?: string; // Tên quyết định
  topicName?: string; // Tên đề tài
}

export default function F5_6_1_1ReadProjectReviewCommitteeMembers() {
  const query = useQuery<I6_5_1_1ProjectReviewCommitteeMembers[]>({
    queryKey: [`ReadProjectReviewCommitteeMembers`],
    queryFn: async () => [
      {
        id: 1,
        decisionNumber: "QD/KT001",
        decisionDate: "01/01/2000",
        decisionName: "V/v Xác định danh sách đề xuất đề tàoi NCKH định hướng",
        topicName: "Đề tài A",
      },

    ],
  });

  const columns = useMemo<MRT_ColumnDef<I6_5_1_1ProjectReviewCommitteeMembers>[]>(() => [
    {
      header: "Số quyết định",
      accessorKey: "decisionNumber",
    },
    {
      header: "Ngày quyết định",
      accessorKey: "decisionDate",
    },
    {
      header: "Tên quyết định",
      accessorKey: "decisionName",
    },
    {
      header: "Tên đề tài",
      accessorKey: "topicName",
    },
    {
      header: "File quyết định",
      accessorFn: () =>
        <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
    }
  ], []);

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";

  return (
    <MyDataTable
      columns={columns}
      data={query.data!}
      renderTopToolbarCustomActions={() => <F5_6_1_1CreateProjectReviewCommitteeMembers />}
      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>

            <FeatUpdateProjectReviewCommitteeMembers values={row.original} />
            <FeatDeleteProjectReviewCommitteeMembers id={row.original.id!} />
          </MyCenterFull>
        );
      }}
    />
  );
}
