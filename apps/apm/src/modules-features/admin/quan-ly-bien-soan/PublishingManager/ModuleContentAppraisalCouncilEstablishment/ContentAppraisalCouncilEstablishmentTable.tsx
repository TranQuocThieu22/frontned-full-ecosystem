"use client";

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonCreateByImportFile,
  AQButtonExportData,
  MyButton,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ContentAppraisalCouncilEstablishmentButtonCreate from "./ContentAppraisalCouncilEstablishmentButtonCreate";
import ContentAppraisalCouncilEstablishmentButtonDelete from "./ContentAppraisalCouncilEstablishmentButtonDelete";
import ContentAppraisalCouncilEstablishmentButtonUpdate from "./ContentAppraisalCouncilEstablishmentButtonUpdate";
import { IContentAppraisalCouncilEstablishment } from "./interface/ContentAppraisalCouncilEstablishmentViewModel";

export default function ContentAppraisalCouncilEstablishment() {
  // used for import button
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const ContentAppraisalCouncilEstablishment = useQuery<
    IContentAppraisalCouncilEstablishment[]
  >({
    queryKey: ["ContentAppraisalCouncilEstablishmentData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });

  const columns: MRT_ColumnDef<IContentAppraisalCouncilEstablishment>[] = useMemo(() => [
    { header: "Mã Hội đồng Thẩm định", accessorKey: "councilCode" },
    { header: "Tên Hội đồng Thẩm định", accessorKey: "councilName" },
    { header: "Ngày bắt đầu thẩm định (dự kiến)", accessorKey: "expectedStartDate" },
    { header: "Ngày kết thúc thẩm định (dự kiến)", accessorKey: "expectedEndDate" },
    { header: "Chủ tịch hội đồng", accessorKey: "chairman" },
    { header: "Thư ký hội đồng", accessorKey: "secretary" },
    { header: "Danh sách ủy viên thẩm định", accessorKey: "appraisalMembers" },
    { header: "Bài giảng được phân công thẩm định (Mã - Tên)", accessorKey: "textbooksForAppraisal" },
    { header: "Trạng thái Hội đồng Thẩm định", accessorKey: "councilStatus" },
  ], []);
  const exportConfig = {
    fields: [
      { fieldName: "id", header: "STT" },
      { fieldName: "councilCode", header: "Mã Hội đồng Thẩm định" },
      { fieldName: "councilName", header: "Tên Hội đồng Thẩm định" },
      { fieldName: "expectedStartDate", header: "Ngày bắt đầu thẩm định (dự kiến)" },
      { fieldName: "expectedEndDate", header: "Ngày kết thúc thẩm định (dự kiến)" },
      { fieldName: "chairman", header: "Chủ tịch hội đồng" },
      { fieldName: "secretary", header: "Thư ký hội đồng" },
      { fieldName: "appraisalMembers", header: "Danh sách ủy viên thẩm định" },
      { fieldName: "textbooksForAppraisal", header: "Bài giảng được phân công thẩm định (Mã - Tên)" },
      { fieldName: "councilStatus", header: "Trạng thái Hội đồng Thẩm định" },
    ]
  };


  return (
    <MyFieldset title={`Danh sách hội đồng thẩm định`}>
      <MyDataTable
        isLoading={ContentAppraisalCouncilEstablishment.isLoading}
        isError={ContentAppraisalCouncilEstablishment.isError}
        data={ContentAppraisalCouncilEstablishment.data || []}
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <Group>
            <ContentAppraisalCouncilEstablishmentButtonCreate />
            <AQButtonCreateByImportFile
              form={form_multiple}
              onSubmit={() => console.log(form_multiple.values)}
            >
              Import
            </AQButtonCreateByImportFile>
            <AQButtonExportData objectName={"Danh sách hội đồng thẩm định"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData>
            <MyButton crudType="delete">Xóa</MyButton>
          </Group>
        )}
        renderRowActions={({ row }) => (
          // <Group gap={"space-evenly"}>
          <MyCenterFull>

            <ContentAppraisalCouncilEstablishmentButtonUpdate values={row.original} />
            <ContentAppraisalCouncilEstablishmentButtonDelete councilCode={row.original.councilCode} />
          </MyCenterFull>
          // </Group>


        )}
      />
    </MyFieldset>
  );
}

export const sampleData: IContentAppraisalCouncilEstablishment[] = [
  {
    id: 1,
    councilCode: "HĐTD-BGDT-001",
    councilName: "HĐ Thẩm Định BGDT Python Cơ bản",
    expectedStartDate: "2025-11-10",
    expectedEndDate: "2025-11-25",
    chairman: "TS. Phạm Quang Z",
    secretary: "ThS. Lê Thị R",
    appraisalMembers: "TS. Trần Văn S, PGS.TS. Đỗ Thị T",
    textbooksForAppraisal: "PYB-2025-001 - Lập trình Python cơ bản",
    councilStatus: "Chờ Thẩm Định",
  },
  {
    id: 2,
    councilCode: "HĐTD-BGDT-002",
    councilName: "HĐ Thẩm Định BGDT AI trong Y học",
    expectedStartDate: "2025-11-15",
    expectedEndDate: "2025-12-05",
    chairman: "GS.TS. Hoàng Kim E",
    secretary: "ThS. Bùi Minh V",
    appraisalMembers: "TS. Hồ Văn W, TS. Nguyễn Thị X",
    textbooksForAppraisal: "AIH-2025-002 - Trí tuệ nhân tạo trong Y học",
    councilStatus: "Chờ Thẩm Định",
  },
  {
    id: 3,
    councilCode: "HĐTD-BGDT-003",
    councilName: "HĐ Thẩm Định BGDT Lịch sử VH VN",
    expectedStartDate: "2025-10-20",
    expectedEndDate: "2025-11-10",
    chairman: "PGS.TS. Bùi Minh K",
    secretary: "ThS. Cao Xuân M",
    appraisalMembers: "TS. Đào Thị L, ThS. Trịnh Văn N",
    textbooksForAppraisal: "VLIT-2025-006 - Lịch sử Văn học Việt Nam",
    councilStatus: "Đã hoàn thành thẩm định",
  },
];