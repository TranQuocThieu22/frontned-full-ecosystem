"use client";

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonCreateByImportFile,
  AQButtonExportData,
  MyButton,
  MyButtonViewPDF,
  MyCheckbox,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IScientificResearchTopicRegistrationAnnouncement } from "./interfaces/ScientificResearchTopicRegistrationAnnouncementViewModel";
import ScientificResearchTopicRegistrationAnnouncementButtonCreate from "./ScientificResearchTopicRegistrationAnnouncementCreateButton";
import ScientificResearchTopicRegistrationAnnouncementButtonDelete from "./ScientificResearchTopicRegistrationAnnouncementDeleteButton";
import ScientificResearchTopicRegistrationAnnouncementButtonUpdate from "./ScientificResearchTopicRegistrationAnnouncementUpdateButton";
import ScientificResearchTopicRegistrationAnnouncementButtonViewDetails from "./ScientificResearchTopicRegistrationAnnouncementViewDetailsButton";

export default function ScientificResearchTopicRegistrationAnnouncementTable() {
  // used for import button
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const ScientificResearchTopicRegistrationAnnouncement = useQuery<
    IScientificResearchTopicRegistrationAnnouncement[]
  >({
    queryKey: ["ScientificResearchTopicRegistrationAnnouncementData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });

  const columns: MRT_ColumnDef<IScientificResearchTopicRegistrationAnnouncement>[] = useMemo(() => [
    { header: "Mã thông báo", accessorKey: "notificationCode" },
    { header: "Tiêu đề thông báo", accessorKey: "notificationTitle" },
    { header: "Nội dung chính", accessorKey: "mainContent" },
    {
      header: "File đính kèm", accessorKey: "hehe", accessorFn: (row) => <MyCenterFull>

        <MyButtonViewPDF src={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf"} />
      </MyCenterFull>
    },
    { header: "Ngày ban hành", accessorKey: "issueDate" },
    { header: "Ngày bắt đầu nhận đề xuất", accessorKey: "proposalStartDate" },
    { header: "Ngày hết hạn đề xuất", accessorKey: "proposalEndDate" },
    { header: "Đã gửi thông báo", accessorKey: "hasNotificationSent", accessorFn: (row) => <MyCenterFull> <MyCheckbox readOnly checked={row.hasNotificationSent} /></MyCenterFull> },
  ], []);
  const exportConfig = {
    fields: [
      { fieldName: "id", header: "STT" },
      { fieldName: "notificationCode", header: "Mã thông báo" },
      { fieldName: "notificationTitle", header: "Tiêu đề thông báo" },
      { fieldName: "mainContent", header: "Nội dung chính" },
      { fieldName: "attachmentFile", header: "File đính kèm" },
      { fieldName: "issueDate", header: "Ngày ban hành" },
      { fieldName: "proposalStartDate", header: "Ngày bắt đầu nhận đề xuất" },
      { fieldName: "proposalEndDate", header: "Ngày hết hạn đề xuất" },
      { fieldName: "hasNotificationSent", header: "Đã gửi thông báo" },
    ]
  };


  return (
    <MyFieldset title={`Danh sách thông báo`}>
      <MyDataTable
        isLoading={ScientificResearchTopicRegistrationAnnouncement.isLoading}
        isError={ScientificResearchTopicRegistrationAnnouncement.isError}
        data={ScientificResearchTopicRegistrationAnnouncement.data || []}
        enableRowSelection={true}
        enableRowNumbers={true}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <Group>
            <ScientificResearchTopicRegistrationAnnouncementButtonCreate />
            <AQButtonCreateByImportFile
              form={form_multiple}
              onSubmit={() => console.log(form_multiple.values)}
            >
              Import
            </AQButtonCreateByImportFile>
            {/* <AQButtonExportData isAllData={true} objectName={"Danh sách thông báo"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData> */}
            <MyButton crudType="delete">Xóa</MyButton>
          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <ScientificResearchTopicRegistrationAnnouncementButtonViewDetails values={row.original} />
            <ScientificResearchTopicRegistrationAnnouncementButtonUpdate values={row.original} />
            <ScientificResearchTopicRegistrationAnnouncementButtonDelete code={row.original.notificationCode} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

export const sampleData: IScientificResearchTopicRegistrationAnnouncement[] = [
  {
    id: 1,
    notificationCode: "TBĐX2025001",
    notificationTitle: "Thông báo tuyển chọn nhiệm vụ KH&CN cấp cơ sở năm 2025 đợt 1",
    mainContent: "Kính gửi quý Thầy/Cô, Nhà trường thông báo tuyển chọn đề tài cấp cơ sở đợt 1. Thời gian nộp từ 01/08/2025 đến 30/09/2025; Chi tiết xem file đính kèm",
    attachmentFile: "Xem file",
    issueDate: "2025-07-20",
    proposalStartDate: "2025-08-01",
    proposalEndDate: "2025-09-30",
    hasNotificationSent: true,
  },
  {
    id: 2,
    notificationCode: "TBĐX2025002",
    notificationTitle: "Thông báo về việc đặt hàng đề tài trọng điểm năm học 2025-2026",
    mainContent: "Nhà trường thông báo danh mục các đề tài trọng điểm cần đặt hàng; Chi tiết về mục tiêu và yêu cầu xem tại file đính kèm.",
    attachmentFile: "Xem file",
    issueDate: "2025-08-01",
    proposalStartDate: "2025-08-01",
    proposalEndDate: "2025-09-30",
    hasNotificationSent: true,
  },
  {
    id: 3,
    notificationCode: "TBĐX2024003",
    notificationTitle: "Thông báo điều chỉnh quy định quy định nộp đề xuất KH&CN",
    mainContent: "Nhà trường điều chỉnh một số quy định về hồ sơ nộp đề xuất; Chi tiết thay đổi xem file đính kèm; Áp dụng từ 01/01/2024",
    attachmentFile: "Xem file",
    issueDate: "2024-01-01",
    proposalStartDate: "2024-01-01",
    proposalEndDate: "2024-12-31",
    hasNotificationSent: true,
  },
  {
    id: 4,
    notificationCode: "TBĐX2025004",
    notificationTitle: "Dự thảo thông báo tuyển chọn nhiệm vụ KH&CN cấp cơ sở đợt 2",
    mainContent: "Dự kiến các nội dung chính cho đợt tuyển chọn thứ 2 trong năm. Chuẩn bị ban hành vào cuối năm.",
    attachmentFile: "",
    issueDate: "",
    proposalStartDate: "2025-10-10",
    proposalEndDate: "2025-11-30",
    hasNotificationSent: false,
  },
];