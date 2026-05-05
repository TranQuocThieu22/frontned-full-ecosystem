"use client";

import { U0MyShowNotification } from "@/utils/notification";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DanhSachVienChucViewModel } from "./interfaces/NopThuyetMinhNhiemVuViewModel";
import { mockDanhSachVienChuc } from "./interfaces/mockData";
import { U0DateToDDMMYYYString } from "@/utils/date";

export default function NopThuyetMinhNhiemVuMembersList() {

  const query = useQuery({
    queryKey: ["danhSachVienChuc"],
    queryFn: () => { return mockDanhSachVienChuc; },
  });

  const form = useForm<DanhSachVienChucViewModel>({
    initialValues: {
      id: 0,
      code: "",
      name: "",
      ngaySinh: new Date(),
      gioiTinh: "Nam" as any,
      donVi: "",
      chucVu: "",
      email: "",
      soDienThoai: "",
    },
    validate: {
    }
  });

  const columns = useMemo<MRT_ColumnDef<DanhSachVienChucViewModel>[]>(() => [
    {
      header: "Mã viên chức",
      accessorKey: "code",
      size: 120,
    },
    {
      header: "Họ tên",
      accessorKey: "name",
      size: 200,
    },
    {
      header: "Ngày sinh",
      accessorKey: "ngaySinh",
      size: 120,
      accessorFn: (row) => U0DateToDDMMYYYString(row.ngaySinh),
    },
    {
      header: "Giới tính",
      accessorKey: "gioiTinh",
      size: 100,
    },
    {
      header: "Đơn vị",
      accessorKey: "donVi",
      size: 200,
    },
    {
      header: "Chức vụ",
      accessorKey: "chucVu",
      size: 150,
    },
    {
      header: "Email",
      accessorKey: "email",
      size: 200,
    },
    {
      header: "Số điện thoại",
      accessorKey: "soDienThoai",
      size: 150,
    },
  ], []);

  const disc = useDisclosure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: DanhSachVienChucViewModel) => {
      return await console.log(values);
    },
    onSuccess: () => {
      disc[1].close();
      queryClient.invalidateQueries();
      U0MyShowNotification({ crudType: "create" });

      form.reset();
    },
  });

  return (
    <MyButtonModal disclosure={disc} crudType="create" modalSize="90%" title="Danh sách viên chứcs">
      <form onSubmit={form.onSubmit((values) => {
        mutation.mutate(values);
      })}>
        <MyDataTable
          columns={columns}
          data={query.data || []}
          enableColumnFilters={true}
          enableGlobalFilter={true}
          enablePagination={true}
          enableRowSelection={true}
          renderTopToolbarCustomActions={({ table }) => (
            <MyButton
              crudType="create"
              form="form"
            >
              Chọn thành viên
            </MyButton>
          )}
        />
      </form>
    </MyButtonModal>
  );
}