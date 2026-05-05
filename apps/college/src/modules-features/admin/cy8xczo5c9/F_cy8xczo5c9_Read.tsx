'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import DongBoModal from "./DongBoModal";
export interface I_cy8xczo5c9 {
  id?: number, maMonHoc?: string, tenMonHoc?: string, nhomHoc?: string, maLop?: string, siSoTKB?: number, daDK?: number, hinhThucThi?: string, soTietThi?: number, maNhomThi?: string
}
export default function F_cy8xczo5c9Read(
) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const className = useQuery<I_cy8xczo5c9[]>({
        queryKey: ['I_cy8xczo5c9Read'],
        queryFn: async () => {
            // const result = await baseAxios.get("/DocumentAttribute/GetByType?", { params: { documentType } })
            // return result.data?.data || []
            return mockData || []
        },
    })

    const columns = useMemo<MRT_ColumnDef<I_cy8xczo5c9>[]>(() => [
        {
          header: "Mã môn học",
          accessorKey: "maMonHoc",
        },
        {
          header: "Tên môn học",
          accessorKey: "tenMonHoc",
        },
        {
          header: "Nhóm học",
          accessorKey: "nhomHoc",
        },
        {
          header: "Mã lớp",
          accessorKey: "maLop",
        },
        {
          header: "Sĩ số TKB",
          accessorKey: "siSoTKB",
        },
        {
          header: "Đã ĐK",
          accessorKey: "daDK",
        },
        {
          header: "Hình thức thi",
          accessorKey: "hinhThucThi",
        },
        {
          header: "Số tiết thi",
          accessorKey: "soTietThi",
        },
        {
          header: "Mã nhóm thi",
          accessorKey: "maNhomThi",
        },
      ], []);
  if (className.isLoading) return "Đang tải dữ liệu...";
  if (className.isError) return "Có lỗi xảy ra!";
  return (
    <MyFieldset title="Danh sách nhóm thi">
      <MyDataTable
        exportAble
        columns={columns}
        data={className.data!}
        setSelectedRow={(rows) => setSelectedRows(rows)}
        renderTopToolbarCustomActions={() => (
          <Group>
            <MyButton crudType="save" />
            <MyButton crudType="delete" />
            <DongBoModal selectedRows={selectedRows.length} />
          </Group>
        )}
        />
    </MyFieldset>
    );
}
const mockData = [
    {
      stt: 1,
      maMonHoc: "MH001",
      tenMonHoc: "Lập trình web",
      nhomHoc: "01",
      maLop: "IT2401",
      siSoTKB: 30,
      daDK: 26,
      hinhThucThi: "Lý thuyết",
      soTietThi: 2,
      maNhomThi: "01-IT2401"
    },
    {
      stt: 2,
      maMonHoc: "MH002",
      tenMonHoc: "Toán rời rạc",
      nhomHoc: "02",
      maLop: "IT2402",
      siSoTKB: 35,
      daDK: 28,
      hinhThucThi: "Trắc nghiệm",
      soTietThi: 1,
      maNhomThi: "02-IT2402"
    },
    {
      stt: 3,
      maMonHoc: "MH003",
      tenMonHoc: "Cơ sở dữ liệu",
      nhomHoc: "03",
      maLop: "IT2403",
      siSoTKB: 40,
      daDK: 35,
      hinhThucThi: "Thực hành",
      soTietThi: 3,
      maNhomThi: "03-IT2403"
    }
  ];