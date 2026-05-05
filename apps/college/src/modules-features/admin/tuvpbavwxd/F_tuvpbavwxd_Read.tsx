'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_tuvpbavwxd_Create from "./F_tuvpbavwxd_Create";
import F_tuvpbavwxd_Delete from "./F_tuvpbavwxd_Delete";
import F_tuvpbavwxd_Update from "./F_tuvpbavwxd_Update";
export interface I_tuvpbavwxd_read {
  maDotThi?: string;//Mã đợt thi
  tenDotThi?: string;//Tên đợt thi
  ngayBatDau?: Date;//Ngày bắt đầu
  ngayKetThuc?: Date;//Ngày kết thúc
  soLuongNhomThi?: number;//Số lượng nhóm thi
  soLuongThiSinh?: number;//Số lượng thí sinh
}

const mockDataHocKiLamViec: string[] = [
  "Năm học 2024-2025, học kỳ 1",
  "Năm học 2024-2025, học kỳ 2",
  "Năm học 2025-2026, học kỳ 1",
  "Năm học 2025-2026, học kỳ 2",
]
const mockDataTable: I_tuvpbavwxd_read[] = [
  {
    maDotThi: "DT001",
    tenDotThi: "Đợt thi 1",
    ngayBatDau: new Date("2024-01-01"),
    ngayKetThuc: new Date("2024-01-01"),
    soLuongNhomThi: 1,
    soLuongThiSinh: 100,
  },
  {
    maDotThi: "DT002",
    tenDotThi: "Đợt thi 2",
    ngayBatDau: new Date("2024-01-01"),
    ngayKetThuc: new Date("2024-01-01"),
    soLuongNhomThi: 1,
    soLuongThiSinh: 100,
  }
]

export default function F_tuvpbavwxd_Read() {
  const [importData, setImportData] = useState(false);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  })
  const columns = useMemo<MRT_ColumnDef<I_tuvpbavwxd_read>[]>(() => [
    {
      header: "Mã đợt thi",
      accessorKey: "maDotThi",
    },
    {
      header: "Tên đợt thi",
      accessorKey: "tenDotThi",
    },
    {
      header: "Ngày bắt đầu",
      accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayBatDau!))

    },
    {
      header: "Ngày kết thúc",
      accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayKetThuc!))
    },
    {
      header: "Số lượng nhóm thi",
      accessorKey: "soLuongNhomThi",
    },
    {
      header: "Số lượng thí sinh",
      accessorKey: "soLuongThiSinh",
    },
  ], []);
  const queryTable = useQuery<I_tuvpbavwxd_read[]>({
    queryKey: ["F_tuvpbavwxd_Read"],
    queryFn: async () => {
      return mockDataTable
    }
  })
  const queryHocKiLamViec = useQuery<string[]>({
    queryKey: ["F_tuvpbavwxd_Read_HocKiLamViec"],
    queryFn: async () => {
      return mockDataHocKiLamViec
    }
  })
  const exportConfig = {
    fields: [
      {
        fieldName: "maDotThi",
        header: "Mã đợt thi"
      },
      {
        fieldName: "tenDotThi",
        header: "Tên đợt thi"
      },
      {
        fieldName: "ngayBatDau",
        header: "Ngày bắt đầu"
      },
      {
        fieldName: "ngayKetThuc",
        header: "Ngày kết thúc"
      },
      {
        fieldName: "soLuongNhomThi",
        header: "Số lượng nhóm thi"
      },
      {
        fieldName: "soLuongThiSinh",
        header: "Số lượng thí sinh"
      },
    ],
  }
  if (queryHocKiLamViec.isLoading) return "Đang tải dữ liệu...";
  if (queryHocKiLamViec.isError) return "Không có dữ liệu...";
  if (queryTable.isLoading) return "Đang tải dữ liệu...";
  if (queryTable.isError) return "Không có dữ liệu...";
  return (
    <>
      <Group justify="end" gap={"sm"}>
        <Text>Học kỳ làm việc</Text>
        <MySelect allowDeselect={false} data={queryHocKiLamViec.data!} defaultValue={queryHocKiLamViec.data![0]} w={240}/>
      </Group>
      <MyDataTable
        enableRowSelection={true}
        columns={columns}
        data={queryTable.data!}
        renderTopToolbarCustomActions={() =>
          <>
            <F_tuvpbavwxd_Create />
            <AQButtonCreateByImportFile
              setImportedData={setImportData}
              form={form_multiple}
              onSubmit={() => {
                console.log(form_multiple.values);
              }} />

            <AQButtonExportData
              isAllData={true}
              objectName="dsDinhNghiaDotThi"
              data={queryTable.data!}
              exportConfig={exportConfig}
            />
            <MyButton crudType="delete" />
          </>
        }
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <F_tuvpbavwxd_Update values={row.original} />
              <F_tuvpbavwxd_Delete id={row.original.maDotThi!} />
            </MyCenterFull>
          )
        }}
      />
    </>
  )
}

