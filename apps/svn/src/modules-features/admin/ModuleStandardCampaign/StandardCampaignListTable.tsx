"use client";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonCreateByImportFile,
  AQButtonExportData,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IStandardCampaignListTable } from "./Interfaces/IStandardCampaignViewModel";
import StandardCampaignCreateButton from "./StandardCampaignCreateButton";
import StandardCampaignDeleteButton from "./StandardCampaignDeleteButton";
import StandardCampaignUpdateButton from "./StandardCampaignUpdateButton";

export default function StandardCampaignListTable() {
  const query = useQuery<IStandardCampaignListTable[]>({
    queryKey: ["StandardCampaignListTableData"],
    queryFn: async () => sampleData,
  });
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });

  const columns = useMemo<MRT_ColumnDef<IStandardCampaignListTable>[]>(
    () => [
      {
        header: "Mã chiến dịch",
        accessorKey: "campaignCode",
      },
      {
        header: "Tên chiến dịch",
        accessorKey: "campaignName",
      },
      {
        header: "Mã phiếu",
        accessorKey: "formCode",
      },
      {
        header: "Tên phiếu",
        accessorKey: "formName",
      },
      {
        header: "Loại phiếu",
        accessorKey: "formType",
      },
      {
        header: "Ghi chú",
        accessorKey: "note",
      },
    ],
    []
  );
  const exportConfig = {
    fields: [
      { fieldName: "campaignCode", header: "Mã chiến dịch" },
      { fieldName: "campaignName", header: "Tên chiến dịch" },
      { fieldName: "formCode", header: "Mã phiếu" },
      { fieldName: "formName", header: "Tên phiếu" },
      { fieldName: "formType", header: "Loại phiếu" },
      { fieldName: "note", header: "Ghi chú" },
    ],
  };

  // Kiểm tra trạng thái của query
  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";

  return (
    <>
      <MyFieldset title={`Danh sách chiến dịch chuẩn`}>
        <MyDataTable
          enableRowSelection
          columns={columns}
          data={query.data!}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Group>
                <StandardCampaignCreateButton />
                <AQButtonCreateByImportFile
                  setImportedData={() => { }}
                  form={form_multiple}
                  onSubmit={() => {
                    console.log(form_multiple.values);
                  }}
                ></AQButtonCreateByImportFile>
                <AQButtonExportData
                  objectName="Danh sách chiến dịch chuẩn"
                  data={query.data!}
                  exportConfig={exportConfig}
                />
                <Button color="red" leftSection={<IconTrash />}>
                  Xóa
                </Button>
              </Group>
            );
          }}
          renderRowActions={({ row }) => {
            return (
              <MyCenterFull>
                <StandardCampaignUpdateButton values={row.original} />
                <StandardCampaignDeleteButton
                  id={row.original.id!}
                  code={row.original.campaignCode!}
                />
              </MyCenterFull>
            );
          }}
        />
      </MyFieldset>
    </>
  );
}

export const sampleData: IStandardCampaignListTable[] = [
  {
    campaignCode: "SV-NH",
    campaignName: "Sinh viên đánh giá giảng viên giảng dạy môn học",
    formCode: "sv-mh-01",
    formName: "Sinh viên đánh giá môn học",
    formType: "01. Sinh viên đánh giá CBGD & Môn học",
    note: "",
    updatedBy: "Admin",
    updatedDate: "2023-10-26",
  },
  {
    campaignCode: "C01",
    campaignName: "Vãng lai đánh giá trường",
    formCode: "P01",
    formName: "Vãng lai đánh giá trường",
    formType: "00. Khảo sát tự do",
    note: "",
    updatedBy: "User1",
    updatedDate: "2023-10-25",
  },
  {
    campaignCode: "C02",
    campaignName: "Sinh viên đánh giá CTDT",
    formCode: "P02",
    formName: "Sinh viên đánh giá CTDT",
    formType: "06. Sinh viên đánh giá CTDT",
    note: "",
    updatedBy: "User2",
    updatedDate: "2023-10-24",
  },
  {
    campaignCode: "C03",
    campaignName: "Sinh viên đánh giá trường",
    formCode: "P03",
    formName: "Sinh viên đánh giá trường",
    formType: "07. Sinh viên đánh giá trường",
    note: "",
    updatedBy: "Admin",
    updatedDate: "2023-10-23",
  },
  {
    campaignCode: "C04",
    campaignName: "CBCNV đánh giá trường",
    formCode: "P04",
    formName: "CBCNV đánh giá trường",
    formType: "08. CBCNV đánh giá trường",
    note: "",
    updatedBy: "User3",
    updatedDate: "2023-10-22",
  },
  {
    campaignCode: "C05",
    campaignName: "GV-MH đánh giá SV",
    formCode: "P05",
    formName: "GV-MH đánh giá SV",
    formType: "17. GV-MH đánh giá SV",
    note: "",
    updatedBy: "User1",
    updatedDate: "2023-10-21",
  },
  {
    campaignCode: "C06",
    campaignName: "Người học đánh giá CLO IT2563",
    formCode: "P06",
    formName: "Người học đánh giá CLO IT2563",
    formType: "22. Người học đánh giá CLO Môn học (xử lý riêng)",
    note: "",
    updatedBy: "Admin",
    updatedDate: "2023-10-20",
  },
  {
    campaignCode: "C07",
    campaignName: "Người học đánh giá PLO CNTT24",
    formCode: "P07",
    formName: "Người học đánh giá PLO CNTT24",
    formType: "23. Người học đánh giá PLO CDT (xử lý riêng)",
    note: "",
    updatedBy: "User2",
    updatedDate: "2023-10-19",
  },
  {
    campaignCode: "C08",
    campaignName: "Nhà tuyển dụng đánh giá PLO CNTT24",
    formCode: "P08",
    formName: "Nhà tuyển dụng đánh giá PLO CNTT24",
    formType: "24. Nhà tuyển dụng đánh giá PLO CDT (xử lý riêng)",
    note: "",
    updatedBy: "User3",
    updatedDate: "2023-10-18",
  },
];
