"use client";

import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonExportData,
  MyButton,
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import TechnicalQualityControlButtonUpdate from "./TechnicalQualityControlButtonUpdate";
import { ITechnicalQualityControl } from "./interface/TechnicalQualityControlViewModel";

export default function TechnicalQualityControlTable() {

  const TechnicalQualityControlTable = useQuery<
    ITechnicalQualityControl[]
  >({
    queryKey: ["TechnicalQualityControlTableData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });

  const columns = useMemo<MRT_ColumnDef<ITechnicalQualityControl>[]>(() => [
    { header: "Mã Bài giảng", accessorKey: "lessonCode" },
    { header: "Tên Bài giảng", accessorKey: "lessonName" },
    { header: "Tên Ban Biên soạn", accessorKey: "compilerName" },
    { header: "Ngày sản phẩm được giao nộp", accessorKey: "submissionDate" },
    { header: "Trạng thái Bài giảng (hiện tại)", accessorKey: "currentLessonStatus" },
    { header: "Chuyên viên Kiểm tra Kỹ thuật", accessorKey: "technicalChecker" },
    { header: "Kết quả kiểm tra chi tiết", accessorKey: "detailedCheckResult" },
    { header: "Đề xuất kết luận kỹ thuật", accessorKey: "technicalConclusionProposal" },
    { header: "Ngày Kiểm tra", accessorKey: "checkDate" },
  ], []);
  const exportConfig = {
    fields: [
      { fieldName: "lessonCode", header: "Mã Bài giảng" },
      { fieldName: "lessonName", header: "Tên Bài giảng" },
      { fieldName: "compilerName", header: "Tên Ban Biên soạn" },
      { fieldName: "submissionDate", header: "Ngày sản phẩm được giao nộp" },
      { fieldName: "currentLessonStatus", header: "Trạng thái Bài giảng (hiện tại)" },
      { fieldName: "technicalChecker", header: "Chuyên viên Kiểm tra Kỹ thuật" },
      { fieldName: "detailedCheckResult", header: "Kết quả kiểm tra chi tiết" },
      { fieldName: "technicalConclusionProposal", header: "Đề xuất kết luận kỹ thuật" },
      { fieldName: "checkDate", header: "Ngày Kiểm tra" },
    ]
  };



  return (
    <MyFieldset title={`Danh sách nội dung biên soạn`}>
      <MyDataTable
        isLoading={TechnicalQualityControlTable.isLoading}
        isError={TechnicalQualityControlTable.isError}
        data={TechnicalQualityControlTable.data || []}
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <Group>
            <MyButton color="blue">Tạo nhiệm vụ hoàn thiện</MyButton>
            <AQButtonExportData objectName={"Danh sách nội dung biên soạn"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData>

          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <TechnicalQualityControlButtonUpdate values={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

export const sampleData: ITechnicalQualityControl[] = [
  {
    id: 1,
    lessonCode: "PYB-2025-001",
    lessonName: "Lập trình Python cơ bản",
    compilerName: "Ban Biên soạn Bài giảng Python Cơ bản",
    submissionDate: "2025-11-01",
    currentLessonStatus: "Đã thẩm định - Chờ kiểm tra kỹ thuật",
    technicalChecker: "Nguyễn Văn T",
    detailedCheckResult: "Video Module 1 bị hiện tượng giật nhẹ trên Chrome (phiên bản cũ). Nút bấm bài tập cuối Module 2 không phản hồi trên di động",
    technicalConclusionProposal: "Cần chỉnh sửa kỹ thuật nhỏ",
    checkDate: "2025-11-28",
  },
  {
    id: 2,
    lessonCode: "AIH-2025-002",
    lessonName: "Trí tuệ nhân tạo trong Y học",
    compilerName: "Nhóm Phát triển AI trong Y học",
    submissionDate: "2025-11-05",
    currentLessonStatus: "Đã thẩm định - Chờ kiểm tra kỹ thuật",
    technicalChecker: "Lê Thị U",
    detailedCheckResult: "Không có lỗi về kỹ thuật nghiêm trọng. Tương thích tốt trên các thiết bị.",
    technicalConclusionProposal: "Đạt yêu cầu kỹ thuật",
    checkDate: "2025-11-29",
  },
  {
    id: 3,
    lessonCode: "VLIT-2025-006",
    lessonName: "Lịch sử Văn học Việt Nam",
    compilerName: "Ban Biên soạn Lịch sử Văn học VN",
    submissionDate: "",
    currentLessonStatus: "Đã thẩm định - Chờ kiểm tra kỹ thuật",
    technicalChecker: "",
    detailedCheckResult: "",
    technicalConclusionProposal: "Chưa kiểm tra",
    checkDate: "",
  },
];