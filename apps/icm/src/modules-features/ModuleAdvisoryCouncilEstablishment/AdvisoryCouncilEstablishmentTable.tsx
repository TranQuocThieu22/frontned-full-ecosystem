"use client";

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonCreateByImportFile,
  AQButtonExportData,
  MyButtonViewPDF,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AdvisoryCouncilEstablishmentButtonCreate from "./AdvisoryCouncilEstablishmentCreateButton";
import AdvisoryCouncilEstablishmentButtonDelete from "./AdvisoryCouncilEstablishmentDeleteButton";
import AdvisoryCouncilEstablishmentDeleteListButton from "./AdvisoryCouncilEstablishmentDeleteListButton";
import AdvisoryCouncilEstablishmentButtonUpdate from "./AdvisoryCouncilEstablishmentUpdateButton";
import { IAdvisoryCouncilEstablishment } from "./interfaces/AdvisoryCouncilEstablishmentViewModel";


export default function AdvisoryCouncilEstablishmentTable() {
  // used for import button
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const AdvisoryCouncilEstablishment = useQuery<
    IAdvisoryCouncilEstablishment[]
  >({
    queryKey: ["AdvisoryCouncilEstablishmentData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });

  const columns: MRT_ColumnDef<IAdvisoryCouncilEstablishment>[] = useMemo(() => [

    { header: "Mã Hội đồng", accessorKey: "councilCode" },
    { header: "Tên Hội đồng", accessorKey: "councilName" },
    { header: "Ngày họp", accessorKey: "meetingDate" },
    { header: "Thời gian họp", accessorKey: "meetingTime" },
    { header: "Địa điểm họp", accessorKey: "location" },
    { header: "Chủ tịch Hội đồng", accessorKey: "chairman" },
    { header: "Thư ký Hội đồng", accessorKey: "secretary" },
    { header: "Danh sách thành viên", accessorKey: "memberList" },
    { header: "Các Mã đề xuất được xét duyệt", accessorKey: "registeredProposalCodes" },
    { header: "Trạng thái Hội đồng", accessorKey: "councilStatus" },
    {
      header: "File quyết định thành lập hội đồng tư vấn", accessorKey: "approvalFile", accessorFn: (row) => <MyCenterFull>

        <MyButtonViewPDF src={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
      </MyCenterFull>
    },
  ], []);

  const exportConfig = {
    fields: [
      { fieldName: "councilCode", header: "Mã Hội đồng" },
      { fieldName: "councilName", header: "Tên Hội đồng" },
      { fieldName: "meetingDate", header: "Ngày họp" },
      { fieldName: "meetingTime", header: "Thời gian" },
      { fieldName: "location", header: "Địa điểm" },
      { fieldName: "secretary", header: "Thư ký Hội đồng" },
      { fieldName: "memberList", header: "Danh sách thành viên" },
      { fieldName: "registeredProposalCodes", header: "Các Mã đề xuất ĐK đề xuất" },
      { fieldName: "councilStatus", header: "Trạng thái Hội đồng" },
      { fieldName: "approvalFile", header: "File duyệt thành lập hội đồng" },
    ]
  };


  return (
    <MyFieldset title={`Danh sách hội đồng xét duyệt`}>
      <MyDataTable
        isLoading={AdvisoryCouncilEstablishment.isLoading}
        isError={AdvisoryCouncilEstablishment.isError}
        data={AdvisoryCouncilEstablishment.data || []}
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
        renderTopToolbarCustomActions={({ table }) => (
          <Group>
            <AdvisoryCouncilEstablishmentButtonCreate />
            <AQButtonCreateByImportFile
              form={form_multiple}
              onSubmit={() => console.log(form_multiple.values)}
            >
              Import
            </AQButtonCreateByImportFile>
            {/* <AQButtonExportData isAllData={true} objectName={"Danh sách hội đồng xét duyệt"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData> */}
            <AdvisoryCouncilEstablishmentDeleteListButton values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>

            <AdvisoryCouncilEstablishmentButtonUpdate values={row.original} />
            <AdvisoryCouncilEstablishmentButtonDelete code={row.original.councilCode} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

export const sampleData: IAdvisoryCouncilEstablishment[] = [
  {
    id: 1,
    councilCode: "HDGT2025001",
    councilName: "Hội đồng duyệt ĐXĐT Khoa CNTT 2025",
    meetingDate: "2025-07-15",
    meetingTime: "09:00 - 11:00",
    location: "Phòng họp A201",
    chairman: "GS. Lê Văn X (GV.10001)",
    secretary: "ThS. Nguyễn Thị Y (NV.QLKH01)",
    memberList: "PGS Phạm A (GV.20002), TS Hoàng B (GV.30003)",
    registeredProposalCodes: "GT2025001, GT2025002",
    councilStatus: "Đang chờ họp",
    approvalFile: "Xem file",
  },
  {
    id: 2,
    councilCode: "HDGT2025002",
    councilName: "Hội đồng duyệt ĐXĐT Khoa Kinh tế 2025",
    meetingDate: "2025-07-15",
    meetingTime: "14:00 - 16:00",
    location: "Phòng họp B305",
    chairman: "PGS. Trần Văn Z (GV.40004)",
    secretary: "ThS. Hồ M (NV.QLKH02)",
    memberList: "PGS. Phạm C (GV.50005), PGS. Trần D (GV.60006)",
    registeredProposalCodes: "GT2025003, GT2025004",
    councilStatus: "Đang chờ họp",
    approvalFile: "Xem file",
  },
];