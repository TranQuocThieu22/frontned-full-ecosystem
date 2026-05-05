"use client";

import { MyButton, MyButtonDeleteList, MyDataTable } from "aq-fe-framework/components";
import { utils_date } from "aq-fe-framework/utils-v2";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { NhomNghienCuuViewModel } from "./interfaces/NopThuyetMinhNhiemVuViewModel";
import NopThuyetMinhNhiemVuMembersList from "./NopThuyetMinhNhiemVuMembersList";

export default function NopThuyetMinhNhiemVuMembers({ data }: { data?: NhomNghienCuuViewModel[] }) {

  const columns = useMemo<MRT_ColumnDef<NhomNghienCuuViewModel>[]>(() => [
    {
      header: "Mã viên chức",
      accessorKey: "code",
      size: 120,
      enableEditing: false,
    },
    {
      header: "Họ tên",
      accessorKey: "name",
      size: 200,
      enableEditing: false,
    },
    {
      header: "Ngày sinh",
      accessorKey: "ngaySinh",
      size: 120,
      enableEditing: false,
      accessorFn: (row) => utils_date.toDDMMYYYY(row.ngaySinh),
    },
    {
      header: "Giới tính",
      accessorKey: "gioiTinh",
      size: 100,
      enableEditing: false,
    },
    {
      header: "Đơn vị",
      accessorKey: "donVi",
      size: 200,
      enableEditing: false,
    },
    {
      header: "Chức vụ",
      accessorKey: "chucVu",
      size: 150,
      enableEditing: false,
    },
    {
      header: "Vai trò",
      accessorKey: "vaiTro",
      size: 180,
      enableEditing: true,
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
      enableEditing={true}
      editDisplayMode="cell"
      renderTopToolbarCustomActions={({ table }) => {
        return (
          <>
            <NopThuyetMinhNhiemVuMembersList />
            <MyButton crudType="export" />
            <MyButtonDeleteList
              onSubmit={() => { }}
              contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.code).join(", ")}
            />
          </>
        )
      }}
    />
  );
}
