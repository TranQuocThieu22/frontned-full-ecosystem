'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_drcwtvzsom_Create from "./F_drcwtvzsom_Create";
import F_drcwtvzsom_Delete from "./F_drcwtvzsom_Delete";
import F_drcwtvzsom_Update from "./F_drcwtvzsom_Update";

export interface I_drcwtvzsom_Read {
  maNganHang?: string; // Mã ngân hàng
  tenNganHang?: string; // Tên ngân hàng
}

const mockData: I_drcwtvzsom_Read[] = [
  {
    maNganHang: "001",
    tenNganHang: "Ngân hàng A",
  },
  {
    maNganHang: "002",
    tenNganHang: "Ngân hàng B",
  },
  {
    maNganHang: "003",
    tenNganHang: "Ngân hàng C",
  },
  {
    maNganHang: "004",
    tenNganHang: "Ngân hàng D",
  }
];
export default function F_drcwtvzsom_Read() {

  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  })
  const query = useQuery<I_drcwtvzsom_Read[]>({
    queryKey: ["F_drcwtvzsom_Read"], // Khóa cache dữ liệu
    queryFn: () => { return mockData }
  });
  const exportConfig = {
    fields: [
      {
        fieldName: "maNganHang",
        header: "Mã ngân hàng"
      },
      {
        fieldName: "tenNganHang",
        header: "Tên ngân hàng"
      }
    ]
  };
  const columns = useMemo<MRT_ColumnDef<I_drcwtvzsom_Read>[]>(
    () => [
      {
        header: "Mã ngân hàng", // Tên cột
        accessorKey: "maNganHang",
      },
      {
        header: "Tên ngân hàng", // Tên cột
        accessorKey: "tenNganHang",
      },
    ],
    []
  );
  // Xử lý trạng thái tải dữ liệu
  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";
  return (
    <MyFieldset title="Danh mục ngân hàng ">
      <MyDataTable
        enableRowSelection={true}
        columns={columns}
        data={query.data!}
        renderTopToolbarCustomActions={() => (
          <>
            <F_drcwtvzsom_Create />
            <AQButtonCreateByImportFile
              setImportedData={setImportData}
              onSubmit={
                () => {
                  console.log("data: ");
                }
              }
              form={form_multiple}
            />
            <AQButtonExportData
              isAllData={true}
              objectName="dmNganHang"
              data={query.data!}
              exportConfig={exportConfig}
            />
            <MyButton crudType="delete" />
          </>
        )}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>

              <F_drcwtvzsom_Update value={row.original} />
              <F_drcwtvzsom_Delete id={row.original.maNganHang!} />
            </MyCenterFull>
          );
        }}
      />
    </MyFieldset>

  )
}