'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F8_2_3CheckApprovalEventPlanAndBudget from "./F8_2_3CheckApprovalEventPlanAndBudget";

export interface I8_2_3ApprovalEventPlanAndBudget {
  name?: string; // Tên hội nghị hội thảo
  hostUnit?: string; // Đơn vị chủ trì
  organizingUnit?: string; // Đơn vị tổ chức
  coordinatingUnit?: string; // Đơn vị phối hợp
  numberOfDelegates?: number; // Số lượng đại biểu dự kiến
  content?: string; // Nội dung hội nghị hội thảo
  time?: string; // Thời gian thực hiện
  address?: string; // Địa điểm tổ chức
  expense?: number; // Tổng kinh phí
  status?: string; // Trạng thái kiểm tra
  comment?: string; // Nhận xét kiểm tra
  note?: string; // Ghi chú duyệt
}

export default function F8_2_3ReadApprovalEventPlanAndBudget() {
  const query = useQuery<I8_2_3ApprovalEventPlanAndBudget[]>({
    queryKey: [`ApprovalEventPlanAndBudget`],
    queryFn: async () => [
      {
        name: "Nâng cao chất lượng dạy học",
        hostUnit: "Khoa công nghệ thông tin",
        organizingUnit: "NLU",
        coordinatingUnit: "VLU",
        numberOfDelegates: 75,
        content: "Trình bày giải pháp ứng dụng AI trong giáo dục đại học.",
        time: "01/01/2024",
        address: "NLU Phượng Vĩ",
        expense: 150000000,
        status: "Hợp lệ / Không hợp lệ / Chưa kiểm tra",
        comment: "Đủ thông tin",
        note: "Đủ điều kiện tổ chức",
      },
    ],
  });

  const columns = useMemo<MRT_ColumnDef<I8_2_3ApprovalEventPlanAndBudget>[]>(() => [
    {
      header: "Tên hội nghị hội thảo",
      accessorKey: "name",
    },
    {
      header: "Đơn vị chủ trì",
      accessorKey: "hostUnit",
    },
    {
      header: "Đơn vị tổ chức",
      accessorKey: "organizingUnit",
    },
    {
      header: "Đơn vị phối hợp",
      accessorKey: "coordinatingUnit",
    },
    {
      header: "Số lượng đại biểu dự kiến",
      accessorKey: "numberOfDelegates",
    },
    {
      header: "Nội dung hội nghị hội thảo",
      accessorKey: "content",
    },
    {
      header: "Thời gian thực hiện",
      accessorKey: "time",
    },
    {
      header: "Địa điểm tổ chức",
      accessorKey: "address",
    },
    {
      header: "Tổng kinh phí",
      accessorKey: "expense",
      Cell: ({ cell }) => cell.getValue<number>()?.toLocaleString("vi-VN"),
    },
    {
      header: "File đăng ký",
      accessorFn: () =>
        <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
    },
    {
      header: "File kế hoạch",
      accessorFn: () =>
        <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
    },
    {
      header: "Trạng thái kiểm tra",
      accessorKey: "status",
    },
    {
      header: "Nhận xét kiểm tra",
      accessorKey: "comment",
    },
    {
      header: "Duyệt",
      accessorFn: () =>
        <Checkbox />
    },
    {
      header: "Ghi chú duyệt",
      accessorKey: "note",
    },
    {
      header: "Thao tác",
      accessorFn: () =>
        <F8_2_3CheckApprovalEventPlanAndBudget />
    }
  ], []);

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";

  return (
    <MyDataTable
      columns={columns}
      data={query.data!}
    />
  );
}
