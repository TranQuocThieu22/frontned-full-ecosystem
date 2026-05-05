"use client";

import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonCreateByImportFile,
  AQButtonExportData,
  MyButton,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
  MyNumberFormatter
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import ExchangeProgramRoleButtonCreate from "./ExchangeProgramButtonCreate";
import ExchangeProgramRoleButtonDelete from "./ExchangeProgramButtonDelete";
import ExchangeProgramRoleButtonUpdate from "./ExchangeProgramButtonUpdate";
import { IExchangeProgram } from "./interface/ExchangeProgramViewModel";

export default function ExchangeProgramTable() {
  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });

  // query data
  const ExchangeProgramRoleTable = useQuery<
    IExchangeProgram[]
  >({
    queryKey: ["ExchangeProgramRoleTableData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });

  // table columns
  const columns = useMemo<MRT_ColumnDef<IExchangeProgram>[]>(() => [
    {
      header: "Mã CT Trao Đổi",
      accessorKey: "exchangeCode",
    },
    {
      header: "Tên CT Trao Đổi",
      accessorKey: "exchangeName",
    },
    {
      header: "Đối tác chính",
      accessorKey: "mainPartner",
    },
    {
      header: "Loại Đối Tượng",
      accessorKey: "targetType",
    },
    {
      header: "Chiều",
      accessorKey: "direction",
    },
    {
      header: "Hạn Nộp Hồ Sơ",
      accessorKey: "submissionDeadline",
    },
    {
      header: "Ngày Công Bố",
      accessorKey: "publishDate",
    },
    {
      header: "Trạng Thái CT",
      accessorKey: "status",
    },
    {
      header: "Số Suất Tối đa",
      accessorKey: "maxSlots",
    },
    {
      header: "Kinh phí HT (VND)",
      accessorKey: "supportCostVND",
      accessorFn: (row) => <MyNumberFormatter value={row.supportCostVND} suffix=" ₫" />,
    },
    {
      header: "Loại xét duyệt",
      accessorKey: "approvalType",
    },
  ], []);

  // table export button
  const exportConfig = {
    fields: [
      { "fieldName": "exchangeCode", "header": "Mã CT Trao Đổi" },
      { "fieldName": "exchangeName", "header": "Tên CT Trao Đổi" },
      { "fieldName": "mainPartner", "header": "Đối tác chính" },
      { "fieldName": "targetType", "header": "Loại Đối Tượng" },
      { "fieldName": "direction", "header": "Chiều" },
      { "fieldName": "submissionDeadline", "header": "Hạn Nộp Hồ Sơ" },
      { "fieldName": "publishDate", "header": "Ngày Công Bố" },
      { "fieldName": "status", "header": "Trạng Thái CT" },
      { "fieldName": "maxSlots", "header": "Số Suất Tối đa" },
      { "fieldName": "supportCostVND", "header": "Kinh phí HT (VND)" },
      { "fieldName": "approvalType", "header": "Loại kết duyệt" },
    ]
  };


  return (
    <MyFieldset title={`Danh sách chương trình trao đổi`}>
      <MyDataTable
        isError={ExchangeProgramRoleTable.isError}
        isLoading={ExchangeProgramRoleTable.isLoading}
        data={ExchangeProgramRoleTable.data || []}
        enableRowSelection={true}
        enableRowNumbers={false}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <Group>
            <ExchangeProgramRoleButtonCreate />
            <AQButtonCreateByImportFile onSubmit={() => { console.log("import data: ", importData) }} form={form_multiple}
              setImportedData={setImportData}></AQButtonCreateByImportFile>
            {/* <AQButtonExportData isAllData={true} objectName={"Danh sách chương trình trao đổi"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData> */}
            <MyButton color="red" leftSection={<IconTrash />}>
              Xóa
            </MyButton>
          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <ExchangeProgramRoleButtonUpdate values={row.original} />
            <ExchangeProgramRoleButtonDelete ExchangeProgram={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

export const sampleData: IExchangeProgram[] = [
  {
    id: 1,
    exchangeCode: "CTTCB-2025-001",
    exchangeName: "Chương trình Trao Đổi SV Kỹ thuật",
    mainPartner: "Siemena AG",
    targetType: "Sinh viên",
    direction: "Hai chiều",
    submissionDeadline: "2025-04-15",
    publishDate: "2025-03-01",
    status: "Đang mở",
    maxSlots: 10,
    supportCostVND: 500000000,
    approvalType: "QTSV-TCB",
  },
  {
    id: 2,
    exchangeCode: "CTTCB-2025-002",
    exchangeName: "Trao Đổi GV Nghiên cứu Y",
    mainPartner: "NUS",
    targetType: "Giảng viên",
    direction: "Hai chiều",
    submissionDeadline: "2025-07-30",
    publishDate: "2025-06-01",
    status: "Đang mở",
    maxSlots: 2,
    supportCostVND: 200000000,
    approvalType: "QTSV-VHC",
  },
  {
    id: 3,
    exchangeCode: "CTTCB-2024-005",
    exchangeName: "Trao Đổi SV Ngắn hạn CNTT",
    mainPartner: "IBM",
    targetType: "Sinh viên",
    direction: "Đi",
    submissionDeadline: "2024-10-01",
    publishDate: "2024-08-15",
    status: "Đã đóng",
    maxSlots: 5,
    supportCostVND: 150000000,
    approvalType: "QTSV-TCB",
  },
  {
    id: 4,
    exchangeCode: "CTTCB-2025-006",
    exchangeName: "Trao Đổi NCS (Inbound)",
    mainPartner: "ĐH California",
    targetType: "Nghiên cứu sinh",
    direction: "Đến",
    submissionDeadline: "2025-09-15",
    publishDate: "2025-07-01",
    status: "Đang mở",
    maxSlots: 3,
    supportCostVND: 0,
    approvalType: "QT_INBOUND",
  },
];