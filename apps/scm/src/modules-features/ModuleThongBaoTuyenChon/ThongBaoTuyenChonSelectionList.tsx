"use client";

import { MyButton, MyButtonDeleteList, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DanhSachDangKyDuocChonViewModel } from "./interfaces/ThongBaoTuyenChonViewModel";
import ThongBaoTuyenChonAppropriately from "./ThongBaoTuyenChonAppropriately";

export default function ThongBaoTuyenChonSelectionList({ data }: { data?: DanhSachDangKyDuocChonViewModel[] }) {

  const columns = useMemo<MRT_ColumnDef<DanhSachDangKyDuocChonViewModel>[]>(() => [
    {
      header: "Mã đăng ký",
      accessorKey: "code",
      size: 120,
    },
    {
      header: "Tên đề tài",
      accessorKey: "name",
      size: 200,
    },
    {
      header: "Lĩnh vực",
      accessorKey: "linhVuc",
      size: 150,
    },
    {
      header: "Chủ nhiệm",
      accessorKey: "chuNhiem",
      size: 120,
    },
    {
      header: "Đánh giá Phù hợp",
      accessorKey: "danhGiaPhuHop",
      size: 120,
    },
    {
      header: "Đánh giá của hội đồng",
      accessorKey: "danhGiaCuaHoiDong",
      size: 150,
    },
    {
      header: "Kiến nghị",
      accessorKey: "kienNghi",
      size: 200,
    },
  ], []);

  return (
    <MyDataTable
      columns={columns}
      data={data || []}
      enableColumnFilters={false}
      enableGlobalFilter={false}
      enablePagination={true}
      enableRowSelection={true}
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <>
            <ThongBaoTuyenChonAppropriately />
            <MyButton crudType="export" />
            <MyButtonDeleteList onSubmit={() => { }} contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.code).join(", ")} />
          </>
        )
      }}
    />
  );
}
