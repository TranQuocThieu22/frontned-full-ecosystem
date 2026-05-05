"use client";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonExportData,
  MyButtonViewPDF,
  MyCenterFull,
  MyCheckbox,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PreliminaryCheckOfRawDeliverablesButtonUpdate from "./PreliminaryCheckOfRawDeliverablesButtonUpdate";
import { IPreliminaryCheckOfRawDeliverables } from "./interface/PreliminaryCheckOfRawDeliverablesViewModel";

export default function PreliminaryCheckOfRawDeliverablesTable() {

  const PreliminaryCheckOfRawDeliverablesTable = useQuery<
    IPreliminaryCheckOfRawDeliverables[]
  >({
    queryKey: ["PreliminaryCheckOfRawDeliverablesTableData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });

  const columns = useMemo<MRT_ColumnDef<IPreliminaryCheckOfRawDeliverables>[]>(() => [
    { header: "Mã Bài giảng", accessorKey: "lessonCode" },
    { header: "Tên Bài giảng", accessorKey: "lessonName" },
    { header: "Trưởng ban biên soạn", accessorKey: "chiefCompiler" },
    {
      header: "File Sản phẩm thô (đã nộp)", accessorKey: "rawProductSubmittedFile", accessorFn: (row) => <MyCenterFull>
        {
          row.isNull == false ?
            <MyButtonViewPDF src={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/5992cv.signed.pdf"} /> : ""
        }
      </MyCenterFull>
    },
    { header: "Ngày giao nộp thực tế", accessorKey: "actualSubmissionDate" },
    { header: "Trạng thái Bài giảng (trước kiểm tra)", accessorKey: "lessonStatusBeforeCheck" },
    { header: "Trạng thái kiểm duyệt (sơ bộ)", accessorKey: "preliminaryApprovalStatus" },
    { header: "Thông tin nhận xét duyệt", accessorKey: "approvalComments" },
    {
      header: "Đã gửi thông báo", accessorKey: "hasNotificationSent", accessorFn: (row) => <MyCenterFull>
        {row.isNull == false ?
          <MyCheckbox readOnly checked={row.hasNotificationSent} />
          : ""}
      </MyCenterFull>
    },
    { header: "Ngày kiểm tra sơ bộ", accessorKey: "preliminaryCheckDate" },
    { header: "Tên cán bộ kiểm tra", accessorKey: "checkerStaffName" },
  ], []);
  const exportConfig = {
    fields: [
      { fieldName: "lessonCode", header: "Mã Bài giảng" },
      { fieldName: "lessonName", header: "Tên Bài giảng" },
      { fieldName: "chiefCompiler", header: "Trưởng ban biên soạn" },
      { fieldName: "rawProductSubmittedFile", header: "File Sản phẩm thô (đã nộp)" },
      { fieldName: "actualSubmissionDate", header: "Ngày giao nộp thực tế" },
      { fieldName: "lessonStatusBeforeCheck", header: "Trạng thái Bài giảng (trước kiểm tra)" },
      { fieldName: "preliminaryApprovalStatus", header: "Trạng thái kiểm duyệt (sơ bộ)" },
      { fieldName: "approvalComments", header: "Thông tin nhận xét duyệt" },
      { fieldName: "hasNotificationSent", header: "Đã gửi thông báo" },
      { fieldName: "preliminaryCheckDate", header: "Ngày kiểm tra sơ bộ" },
      { fieldName: "checkerStaffName", header: "Tên cán bộ kiểm tra" },
    ]
  };

  return (
    <MyFieldset title={`Danh sách đăng ký`}>
      <MyDataTable
        isError={PreliminaryCheckOfRawDeliverablesTable.isError}
        isLoading={PreliminaryCheckOfRawDeliverablesTable.isLoading}
        data={PreliminaryCheckOfRawDeliverablesTable.data || []}
        enableRowSelection={true}
        enableRowNumbers={false}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <Group>
            <AQButtonExportData objectName={"Danh sách đăng ký"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData>

          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <PreliminaryCheckOfRawDeliverablesButtonUpdate values={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

export const sampleData: IPreliminaryCheckOfRawDeliverables[] = [
  {
    id: 1,
    lessonCode: "PYB-2025-001",
    lessonName: "Lập trình Python cơ bản",
    chiefCompiler: "TS. Nguyễn Văn A",
    rawProductSubmittedFile: "Xem file",
    actualSubmissionDate: "2025-11-01",
    lessonStatusBeforeCheck: "Đã giao nộp - Chờ kiểm định",
    preliminaryApprovalStatus: "Hợp lệ (sẵn sàng thẩm định)",
    approvalComments: "",
    hasNotificationSent: true,
    preliminaryCheckDate: "2025-11-06",
    checkerStaffName: "Nguyễn Văn X",
    isNull: false
  },
  {
    id: 2,
    lessonCode: "AIH-2025-002",
    lessonName: "Trí tuệ nhận tạo trong Y học",
    chiefCompiler: "PGS.TS. Trần Thị D",
    rawProductSubmittedFile: "Xem file",
    actualSubmissionDate: "2025-11-05",
    lessonStatusBeforeCheck: "Đã giao nộp - Chờ kiểm định",
    preliminaryApprovalStatus: "Cần bổ sung/Chỉnh sửa",
    approvalComments: "Video Module 2 bị lỗi âm thanh, cần quay lại. Tài liệu bài tập thiếu đáp án",
    hasNotificationSent: false,
    preliminaryCheckDate: "2025-11-06",
    checkerStaffName: "Lê Thị Y",
    isNull: false
  },
  {
    id: 3,
    lessonCode: "VLIT-2025-006",
    lessonName: "Lịch sử Văn học Việt Nam",
    chiefCompiler: "PGS.TS. Đinh Minh K",
    rawProductSubmittedFile: "",
    actualSubmissionDate: "",
    lessonStatusBeforeCheck: "",
    preliminaryApprovalStatus: "Chưa giao nộp",
    approvalComments: "",
    hasNotificationSent: false,
    preliminaryCheckDate: "",
    checkerStaffName: "",
    isNull: true
  },
];