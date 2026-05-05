"use client";

import MySelect from "@/components/Combobox/Select/MySelect";
import { Group, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonExportData,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DeliverRawDeliverablesButtonUpdate from "./DeliverRawDeliverablesButtonUpdate";
import { IdeliverRawDeliverables } from "./interface/deliverRawDeliverablesViewModel";

export enum EnumCommitteeName {
  LOGISTICS_SUPPLY_CHAIN = 1,
  STRATEGIC_MANAGEMENT_COURSE = 2,
  SOFTWARE_ENGINEERING_REVIEW = 3,
}

export const CommitteeNameLabel: Record<EnumCommitteeName, string> = {
  [EnumCommitteeName.LOGISTICS_SUPPLY_CHAIN]: "Ban Biên soạn CTĐT ngành Logistics và Quản lý chuỗi cung ứng",
  [EnumCommitteeName.STRATEGIC_MANAGEMENT_COURSE]: "Ban Biên soạn ĐCCTHP môn Quản trị chiến lược",
  [EnumCommitteeName.SOFTWARE_ENGINEERING_REVIEW]: "Ban Rà soát CTĐT ngành Kỹ thuật phần mềm (năm 2024)",
};


export default function DeliverRawDeliverablesTable() {

  const deliverRawDeliverablesTable = useQuery<
    IdeliverRawDeliverables[]
  >({
    queryKey: ["deliverRawDeliverablesTableData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });

  const committeeOptions = Object.entries(CommitteeNameLabel).map(([key, value]) => ({
    value: key.toString(),
    label: value,
  }));

  const columns = useMemo<MRT_ColumnDef<IdeliverRawDeliverables>[]>(() => [
    { header: "Mã Bài giảng", accessorKey: "lessonCode" },
    { header: "Tên Bài giảng", accessorKey: "lessonName" },
    { header: "Trưởng ban biên soạn", accessorKey: "chiefCompiler" },
    { header: "Tên file Sản phẩm thô", accessorKey: "rawProductFileName" },
    { header: "Ngày giao nộp thực tế", accessorKey: "actualSubmissionDate" },
    { header: "Ghi chú khi giao nộp", accessorKey: "submissionNotes" },
    { header: "Trạng thái giao nộp", accessorKey: "submissionStatus" },
  ], []);
  const exportConfig = {
    fields: [
      { fieldName: "lessonCode", header: "Mã Bài giảng" },
      { fieldName: "lessonName", header: "Tên Bài giảng" },
      { fieldName: "chiefCompiler", header: "Trưởng ban biên soạn" },
      { fieldName: "rawProductFileName", header: "Tên file Sản phẩm thô" },
      { fieldName: "actualSubmissionDate", header: "Ngày giao nộp thực tế" },
      { fieldName: "submissionNotes", header: "Ghi chú khi giao nộp" },
      { fieldName: "submissionStatus", header: "Trạng thái giao nộp" },
    ]
  };


  return (
    <MyFieldset title={`Danh sách công việc`}>
      <Group mb={"md"}>
        <Text fw={700}>Chọn ban biên soạn</Text>
        <MySelect style={{ width: "30vw" }} data={committeeOptions} defaultValue={committeeOptions[2]?.value} />
      </Group>
      <MyDataTable
        isLoading={deliverRawDeliverablesTable.isLoading}
        isError={deliverRawDeliverablesTable.isError}
        data={deliverRawDeliverablesTable.data || []}
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <Group>
            <AQButtonExportData objectName={"Danh sách công việc"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData>

          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <DeliverRawDeliverablesButtonUpdate values={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

export const sampleData: IdeliverRawDeliverables[] = [
  {
    id: 1,
    lessonCode: "PYB-2025-001",
    lessonName: "Lập trình Python cơ bản",
    chiefCompiler: "TS. Nguyễn Văn A",
    rawProductFileName: "BGDT_PythonCoBan_SanPhamTho_v1.zip",
    actualSubmissionDate: "2025-11-01",
    submissionNotes: "Đã bao gồm đầy đủ video, tài liệu, và bài tập. Yêu cầu kiểm tra lỗi chính tả",
    submissionStatus: "Đã giao nộp - Chờ kiểm định",
  },
  {
    id: 2,
    lessonCode: "AIH-2025-002",
    lessonName: "Trí tuệ nhân tạo trong Y học",
    chiefCompiler: "PGS.TS. Trần Thị D",
    rawProductFileName: "AIY_RawContent_20251105.rar",
    actualSubmissionDate: "2025-11-05",
    submissionNotes: "Nội dung video đã hoàn tất, phần bài tập đang được hiệu đính.",
    submissionStatus: "Đã giao nộp - Chờ kiểm định",
  },
  {
    id: 3,
    lessonCode: "VLIT-2025-006",
    lessonName: "Lịch sử văn học Việt Nam",
    chiefCompiler: "PGS.TS. Bùi Minh K",
    rawProductFileName: "",
    actualSubmissionDate: "",
    submissionNotes: "",
    submissionStatus: "Chưa giao nộp",
  },
];