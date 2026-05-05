'use client'

import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F34Create from "./F34Create";
export interface ScientificProfileResearchProject {

  id?: number;
  code?: string | undefined;
  name?: string | undefined;
}
const staticData: ScientificProfileResearchProject[] = [
  {
    "id": 1,
    "code": "string",
    "name": "string",

  },
  {

    "id": 1,
    "code": "string",
    "name": "string",

  }
]
export default function F34Read() {

  const scientificProfileResearchProject = useQuery<ScientificProfileResearchProject[]>({
    queryKey: [`userNCKHs?isExternal=false`],
    queryFn: async () => staticData,
  })

  const exportConfig = {
    fields: [
      {
        fieldName: "code",
        header: "Mã đề tài"
      },
      {
        fieldName: "name",
        header: "Tên đề tài"
      },
      {
        fieldName: "id",
        header: "File minh chứng",
      },

    ]
  };

  const columns = useMemo<MRT_ColumnDef<ScientificProfileResearchProject>[]>(
    () => [
      {
        header: "Mã đề tài",
        accessorKey: "code"
      },
      {
        header: "Tên đề tài",
        accessorKey: "name"
      },
      {
        header: "File minh chứng",
        accessorKey: "id",

      },

    ],
    []
  );
  if (scientificProfileResearchProject.isLoading) return "Đang tải dữ liệu..."
  if (scientificProfileResearchProject.isError) return "Không có dữ liệu..."
  return (
    <MyDataTable
      enableRowSelection={true}
      columns={columns}
      enableRowNumbers={true}
      data={scientificProfileResearchProject.data!}
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <>
            <Group>
              <F34Create />
              <AQButtonExportData
                isAllData={true}
                objectName="dsGiangVienVaChuyenGia"
                data={scientificProfileResearchProject.data!}
                exportConfig={exportConfig}
              />
              <AQButtonExportData
                isAllData={false}
                objectName="dsGiangVienVaChuyenGia"
                data={table.getSelectedRowModel().rows.map((row) => row.original)}
                exportConfig={exportConfig}
              />

            </Group>
          </>
        )
      }}

    />
  )
}
