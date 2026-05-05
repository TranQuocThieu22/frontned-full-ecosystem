"use client";

import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
    AQButtonCreateByImportFile,
    AQButtonExportData,
    MyButton,
    MyButtonViewPDF,
    MyCenterFull,
    MyDataTable,
    MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import RelatedDocumentsRoleButtonCreate from "./RelatedDocumentsButtonCreate";
import RelatedDocumentsRoleButtonDelete from "./RelatedDocumentsButtonDelete";
import RelatedDocumentsRoleButtonUpdate from "./RelatedDocumentsButtonUpdate";
import { IRelatedDocuments } from "./interface/RelatedDocumentsViewModel";

export default function RelatedDocumentsTable() {
  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });
  const RelatedDocumentsTable = useQuery<
    IRelatedDocuments[]
  >({
    queryKey: ["RelatedDocumentsTableData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });
  const columns = useMemo<MRT_ColumnDef<IRelatedDocuments>[]>(() => [
    {
      header: "Mã IP",
      accessorKey: "ipCode",
    },
    {
      header: "Tên IP",
      accessorKey: "ipName",
    },
    {
      header: "Loại tài liệu",
      accessorKey: "documentType",
    },
    {
      header: "File minh chứng",
      accessorKey: "proofFile",
      accessorFn: (row) => <MyCenterFull >
        <MyButtonViewPDF
          label="Xem"
          src={row.proofFile} />
      </MyCenterFull>
    },
    {
      header: "Ngày tải lên",
      accessorKey: "uploadDate",
    },
    {
      header: "Người tải lên",
      accessorKey: "uploaderName",
    },
    {
      header: "Mô tả ngắn",
      accessorKey: "shortDescription",
    },
  ], []);
  const exportConfig = {
    fields: [
      { "fieldName": "ipCode", "header": "Mã IP" },
      { "fieldName": "ipName", "header": "Tên IP" },
      { "fieldName": "documentType", "header": "Loại tài liệu" },
      { "fieldName": "proofFile", "header": "File minh chứng" },
      { "fieldName": "uploadDate", "header": "Ngày tải lên" },
      { "fieldName": "uploaderName", "header": "Người tải lên" },
      { "fieldName": "shortDescription", "header": "Mô tả ngắn" },
    ]
  };



  return (
    <MyFieldset title={`Danh sách tài liệu liên quan sở hữu trí tuệ`}>
      <MyDataTable
        isError={RelatedDocumentsTable.isError}
        isLoading={RelatedDocumentsTable.isLoading}
        data={RelatedDocumentsTable.data || []}
        enableRowSelection={true}
        enableRowNumbers={false}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <Group>
            <RelatedDocumentsRoleButtonCreate />
            <AQButtonCreateByImportFile onSubmit={() => { console.log("import data: ", importData) }} form={form_multiple}
              setImportedData={setImportData}></AQButtonCreateByImportFile>
            <AQButtonExportData  objectName={"Danh sách tài liệu liên quan sở hữu trí tuệ"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData>
            <MyButton color="red" leftSection={<IconTrash />}>
              Xóa
            </MyButton>
          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <RelatedDocumentsRoleButtonUpdate values={row.original} />
            <RelatedDocumentsRoleButtonDelete RelatedDocuments={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

export const sampleData: IRelatedDocuments[] = [
  {
    id: 1,
    ipCode: "IP-SC-2023-001",
    ipName: "Hệ thống quản lý chất thải thông minh",
    documentType: "Bản mô tả sáng chế",
    proofFile: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
    uploadDate: "2023-03-01",
    uploaderName: "Nguyễn Thị B",
    shortDescription: "File PDF bản mô tả đầy đủ",
  },
  {
    id: 2,
    ipCode: "IP-SC-2023-001",
    ipName: "Hệ thống quản lý chất thải thông minh",
    documentType: "Văn bằng bảo hộ",
    proofFile: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
    uploadDate: "2024-12-20",
    uploaderName: "Nguyễn Thị B",
    shortDescription: "Scan bản gốc bằng độc quyền",
  },
  {
    id: 3,
    ipCode: "IP-SC-2024-002",
    ipName: "Thuật toán nhận dạng khuôn mặt bằng AI",
    documentType: "Quyết định chấp nhận đơn",
    proofFile: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
    uploadDate: "2024-02-25",
    uploaderName: "Trần Văn C",
    shortDescription: "Quyết định chấp nhận đơn hợp lệ",
  },
  {
    id: 4,
    ipCode: "IP-CL-2023-001",
    ipName: "Sách giáo trình 'Cơ sở vật lý y sinh'",
    documentType: "Chứng nhận đăng ký quyền tác giả",
    proofFile: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
    uploadDate: "2024-02-15",
    uploaderName: "Lê Thị D",
    shortDescription: "Scan chứng nhận",
  },
  {
    id: 5,
    ipCode: "IP-KDCN-2025-001",
    ipName: "Thiết kế bình lọc nước thông minh",
    documentType: "Bản vẽ kỹ thuật",
    proofFile: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
    uploadDate: "2025-06-01",
    uploaderName: "Nguyễn Thị B",
    shortDescription: "File CAD và PDF",
  },
];