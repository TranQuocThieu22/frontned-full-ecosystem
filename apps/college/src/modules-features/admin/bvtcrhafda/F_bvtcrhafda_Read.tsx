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
import F_bvtcrhafda_Create from "./F_bvtcrhafda_Create";
import F_bvtcrhafda_Delete from "./F_bvtcrhafda_Delete";
import F_bvtcrhafda_Update from "./F_bvtcrhafda_Update";

export interface I_bvtcrhafda_Read {
  maDanToc?: string // mã dân tộc
  tenDanToc?: string // tên dân tộc
}

const mockData: I_bvtcrhafda_Read[] = [
  {
    maDanToc: "0101",
    tenDanToc: "Kinh",
  },
  {
    maDanToc: "0202",
    tenDanToc: "Tày",
  },
  {
    maDanToc: "0303",
    tenDanToc: "Thái",
  },
];
export default function F_bvtcrhafda_Read() {

  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  })
  const query = useQuery<I_bvtcrhafda_Read[]>({
    queryKey: ["F_bvtcrhafda_Read"], // Khóa cache dữ liệu
    queryFn: () => { return mockData }
  });
  const exportConfig = {
    fields: [
      {
        fieldName: "maDanToc",
        header: "Mã dân tộc"
      },
      {
        fieldName: "tenDanToc",
        header: "Tên dân tộc "
      },
    ]
  };
  const columns = useMemo<MRT_ColumnDef<I_bvtcrhafda_Read>[]>(
    () => [
      {
        header: "Mã dân tộc", // Tên cột
        accessorKey: "maDanToc",

      },
      {
        header: "Tên dân tộc", // Tên cột
        accessorKey: "tenDanToc",
      },
    ],
    []
  );
  // Xử lý trạng thái tải dữ liệu
  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";
  return (
    <MyFieldset title="Danh mục dân tộc" >
      <MyDataTable
        enableRowSelection={true}
        columns={columns}
        data={query.data!}
        renderTopToolbarCustomActions={() => (
          <>
            <F_bvtcrhafda_Create />
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
              objectName="dmDanToc"
              data={query.data!}
              exportConfig={exportConfig}
            />
            <MyButton crudType="delete" />
          </>
        )}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>

              <F_bvtcrhafda_Update value={row.original} />
              <F_bvtcrhafda_Delete id={row.original.maDanToc!} />
            </MyCenterFull>
          );
        }}
      />
    </MyFieldset>
  )
}