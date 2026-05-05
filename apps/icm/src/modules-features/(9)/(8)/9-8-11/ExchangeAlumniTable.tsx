"use client";

import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonExportData,
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useState } from "react";
import ExchangeAlumniButtonUpdate from "./ExchangeAlumniButtonUpdate";
import { IExchangeAlumni } from "./interface/ExchangeAlumniViewModel";

export default function ExchangeAlumniTable() {
  const [importData, setImportData] = useState(false);

  // import button
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });

  // query data
  const ExchangeAlumniTable = useQuery<
    IExchangeAlumni[]
  >({
    queryKey: ["ExchangeAlumniTableData"],
    queryFn: async () => {
      return sampleData;
    },
    refetchOnWindowFocus: false,
  });

  // table columns
  const columns: MRT_ColumnDef<IExchangeAlumni>[] = [
    { header: "Mã Người Dùng", accessorKey: "userCode" },
    { header: "Tên Người Dùng", accessorKey: "userName" },
    { header: "Email", accessorKey: "email" },
    { header: "Chức Vụ/Khoa", accessorKey: "position" },
    { header: "Có Kinh Nghiệm Trao Đổi?", accessorKey: "hasExchangeExperience" },
    { header: "Chiều Trao đổi Gần nhất", accessorKey: "direction" },
    { header: "Đối Tác Trao Đổi Gần Nhất", accessorKey: "partner" },
    { header: "Lĩnh vực Chuyên Môn/Kỹ Năng", accessorKey: "expertise" },
    { header: "Sẵn Sàng Hỗ Trợ Thế Hệ Sau ?", accessorKey: "isWillingToSupport" },
    { header: "Ghi Chú", accessorKey: "notes" },
  ];

  // export button
  const exportConfig = {
    fields: [
      { fieldName: "userCode", header: "Mã Người Dùng" },
      { fieldName: "userName", header: "Tên Người Dùng" },
      { fieldName: "email", header: "Email" },
      { fieldName: "position", header: "Chức Vụ/Khoa" },
      { fieldName: "hasExchangeExperience", header: "Có Kinh Nghiệm Trao Đổi?" },
      { fieldName: "direction", header: "Chiều Trao đổi Gần nhất" },
      { fieldName: "partner", header: "Đối Tác Trao Đổi Gần Nhất" },
      { fieldName: "expertise", header: "Lĩnh vực Chuyên Môn/Kỹ Năng" },
      { fieldName: "isWillingToSupport", header: "Sẵn Sàng Hỗ Trợ Thế Hệ Sau ?" },
      { fieldName: "notes", header: "Ghi Chú" },
    ]
  };



  return (
    <MyFieldset title={`Danh sách cựu trao đổi`}>
      <MyDataTable
        isLoading={ExchangeAlumniTable.isLoading}
        isError={ExchangeAlumniTable.isFetching}
        data={ExchangeAlumniTable.data || []}
        enableRowSelection={true}
        enableRowNumbers={false}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <Group>
            {/* <AQButtonExportData isAllData={true} objectName={"Danh sách cựu trao đổi"} data={sampleData} exportConfig={exportConfig}></AQButtonExportData> */}

          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <ExchangeAlumniButtonUpdate values={row.original} />
            {/* <ExchangeAlumniButtonDelete ExchangeAlumni={row.original} /> */}
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

export const sampleData: IExchangeAlumni[] = [
  {
    id: 1,
    userCode: "SV001",
    userName: "Nguyễn Văn A",
    email: "nguyen.a@edu.vn",
    position: "Sinh viên Kỹ thuật",
    hasExchangeExperience: "Có",
    direction: "Đi",
    partner: "Siemens AG",
    expertise: "Tự động hóa; IoT; Tiếng Đức",
    isWillingToSupport: "Có",
    notes: "Có thể chia sẻ kinh nghiệm xin visa Đức.",
  },
  {
    id: 2,
    userCode: "GV002",
    userName: "TS. Lê Văn B",
    email: "le.b@edu.vn",
    position: "Giảng viên Y",
    hasExchangeExperience: "Có",
    direction: "Đi",
    partner: "NUS",
    expertise: "Vật liệu Nano; Tiếng Anh",
    isWillingToSupport: "Có",
    notes: "Sẵn sàng cố vấn nghiên cứu.",
  },
  {
    id: 3,
    userCode: "SV010",
    userName: "Li Wei",
    email: "li.wei@partner.com",
    position: "Sinh viên CNTT",
    hasExchangeExperience: "Có",
    direction: "Đến",
    partner: "Trường bạn",
    expertise: "Lập trình; Văn hóa Việt Nam",
    isWillingToSupport: "Không áp dụng",
    notes: "Là sinh viên inbound.",
  },
];