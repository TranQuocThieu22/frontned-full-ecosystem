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
import SubjectMatterContentReviewButtonUpdate from "./SubjectMatterContentReviewButtonUpdate";
import { ISubjectMatterContentReview } from "./interface/SubjectMatterContentReviewViewModel";

export default function SubjectMatterContentReviewTable() {

  const SubjectMatterContentReviewTable = useQuery<
    ISubjectMatterContentReview[]
  >({
    queryKey: ["SubjectMatterContentReviewTableData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });

  const columns = useMemo<MRT_ColumnDef<ISubjectMatterContentReview>[]>(() => [

    { header: "Mã Bài giảng", accessorKey: "lessonCode" },
    { header: "Tên Bài giảng", accessorKey: "lessonName" },
    { header: "Mã Hội Đồng Thẩm Định", accessorKey: "councilCode" },
    { header: "Tên Hội Đồng Thẩm Định", accessorKey: "councilName" },
    { header: "Chuyên gia Thẩm định (tôi là)", accessorKey: "chiefAppraiser" },
    { header: "Ngày giao nộp sản phẩm thô", accessorKey: "rawProductSubmissionDate" },
    { header: "Trạng thái Bài giảng (hiện tại)", accessorKey: "currentLessonStatus" },
    { header: "Nhận xét chi tiết của chuyên gia", accessorKey: "detailedExpertComments" },
    { header: "Đề xuất kết luận", accessorKey: "conclusionProposal" },
    { header: "Ngày thẩm định", accessorKey: "appraisalDate" },
  ], []);
  const exportConfig = {
    fields: [
      { fieldName: "id", header: "STT" },
      { fieldName: "lessonCode", header: "Mã Bài giảng" },
      { fieldName: "lessonName", header: "Tên Bài giảng" },
      { fieldName: "councilCode", header: "Mã Hội Đồng Thẩm Định" },
      { fieldName: "councilName", header: "Tên Hội Đồng Thẩm Định" },
      { fieldName: "chiefAppraiser", header: "Chuyên gia Thẩm định (tôi là)" },
      { fieldName: "rawProductSubmissionDate", header: "Ngày giao nộp sản phẩm thô" },
      { fieldName: "currentLessonStatus", header: "Trạng thái Bài giảng (hiện tại)" },
      { fieldName: "detailedExpertComments", header: "Nhận xét chi tiết của chuyên gia" },
      { fieldName: "conclusionProposal", header: "Đề xuất kết luận" },
      { fieldName: "appraisalDate", header: "Ngày thẩm định" },
    ]
  };



  return (
    <MyFieldset title={`Danh sách nội dung biên soạn`}>
      <MyDataTable
        isError={SubjectMatterContentReviewTable.isError}
        isLoading={SubjectMatterContentReviewTable.isLoading}
        data={SubjectMatterContentReviewTable.data || []}
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <Group>
            <MyButton color="blue">Tạo nhiệm vụ hoàn thiện</MyButton>
            {/* <AQButtonExportData isAllData={true} objectName={"Danh sách nội dung biên soạn"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData> */}

          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <SubjectMatterContentReviewButtonUpdate values={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

export const sampleData: ISubjectMatterContentReview[] = [
  {
    id: 1,
    lessonCode: "PYB-2025-001",
    lessonName: "Lập trình Python cơ bản",
    councilCode: "HDTD-BGĐT-001",
    councilName: "HĐ Thẩm Định BGĐT Python Cơ bản",
    chiefAppraiser: "TS. Phạm Quang Z",
    rawProductSubmissionDate: "2025-11-01",
    currentLessonStatus: "Đang thẩm định",
    detailedExpertComments: "Nội dung chính xác, bố cục hợp lý. Tuy nhiên, nên thêm một số bài tập thực hành nhỏ ở cuối mỗi module để tăng tính tương tác.",
    conclusionProposal: "Đạt yêu cầu",
    appraisalDate: "2025-11-15",
  },
  {
    id: 2,
    lessonCode: "AIH-2025-002",
    lessonName: "Trí tuệ nhân tạo trong Y học",
    councilCode: "HDTD-BGĐT-002",
    councilName: "HĐ Thẩm Định BGĐT AI trong Y học",
    chiefAppraiser: "GS.TS. Hoàng Kim E",
    rawProductSubmissionDate: "2025-11-05",
    currentLessonStatus: "Đang thẩm định",
    detailedExpertComments: "Nội dung chưa cập nhật các thành tựu mới nhất về AI trong chẩn đoán hình ảnh. Cần bổ sung các case study thực tế từ các bệnh viện lớn.",
    conclusionProposal: "Cần chỉnh sửa lại",
    appraisalDate: "2025-11-30",
  },
  {
    id: 3,
    lessonCode: "VLIT-2025-006",
    lessonName: "Lịch sử Văn học Việt Nam",
    councilCode: "HDTD-BGĐT-003",
    councilName: "HĐ Thẩm Định BGĐT Lịch sử VH VN",
    chiefAppraiser: "TS. Mai Thị K",
    rawProductSubmissionDate: "2025-10-15",
    currentLessonStatus: "Đang thẩm định",
    detailedExpertComments: "",
    conclusionProposal: "Chưa bắt đầu thẩm định",
    appraisalDate: "",
  },
];