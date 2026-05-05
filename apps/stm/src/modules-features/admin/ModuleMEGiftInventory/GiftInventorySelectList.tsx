"use client";

import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IGift } from "./interfaces/GiftInventoryViewModel";

export default function GiftInventorySelectList() {

  const query = useQuery({
    queryKey: ["gift-list"],
    queryFn: () => { return mockData; },
  });

  const form = useForm<IGift>({
    initialValues: {
      id: 0,
      code: "",
      name: "",
      description: ""
    },
    validate: {
    }
  });

  const columns = useMemo<MRT_ColumnDef<IGift>[]>(() => [
    {
      header: "Mã quà tặng",
      accessorKey: "code",
      size: 120,
    },
    {
      header: "Tên quà tặng",
      accessorKey: "name",
      size: 200,
    },
    {
      header: "Mô tả",
      accessorKey: "description",
      size: 300,
    },
  ], []);

  const disc = useDisclosure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: IGift) => {
      return await console.log(values);
    },
    onSuccess: () => {
      disc[1].close();
      queryClient.invalidateQueries();

      form.reset();
    },
  });

  return (
    <MyButtonModal disclosure={disc} crudType="create" modalSize="90%" title="Chọn quà tặng">
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
              Chọn
            </MyButton>
          )}
        />
      </form>
    </MyButtonModal>
  );
}

const mockData: IGift[] = [
  {
    id: 1,
    code: "QUA001",
    name: "Bút chì màu cao cấp",
    description: "Bộ 12 bút chì màu chất lượng cao, an toàn cho trẻ em."
  },
  {
    id: 2,
    code: "QUA002",
    name: "Sổ tay A5 có bìa cứng",
    description: "Sổ tay bìa cứng, 100 trang, kẻ ngang, giấy dày dặn."
  },
  {
    id: 3,
    code: "QUA003",
    name: "Bộ đồ dùng học tập",
    description: "Gồm thước kẻ, tẩy, gọt bút chì, kẹp dòn, bút bi."
  },
  {
    id: 4,
    code: "QUA004",
    name: "Bình nước giữ nhiệt 500ml",
    description: "Bình nước inox 304 giữ nhiệt tốt, có nhiều màu sắc."
  },
  {
    id: 5,
    code: "QUA005",
    name: "Móc khoá hình thú dễ thương",
    description: "Móc khoá bằng silicon mềm mại, nhiều hình động dạng vui."
  },
  {
    id: 6,
    code: "QUA006",
    name: "Sách truyện thiếu nhi",
    description: "Tuyển tập truyện tranh hoặc truyện chữ ý nghĩa, phù hợp lứa tuổi."
  },
  {
    id: 7,
    code: "QUA007",
    name: "Tai nghe chụp tai",
    description: "Tai nghe có dây, chất lượng âm thanh tốt, thiết kế thoải mái."
  },
  {
    id: 8,
    code: "QUA008",
    name: "Balo học sinh",
    description: "Balo chống thấm nước, có nhiều ngăn tiện lợi, quai đeo êm ái."
  },
  {
    id: 9,
    code: "QUA009",
    name: "Voucher mua sách 50k",
    description: "Phiếu mua hàng trị giá 50.000 VNĐ tại hệ thống nhà sách."
  },
  {
    id: 10,
    code: "QUA010",
    name: "Đồ chơi xếp hình Lego nhỏ",
    description: "Bộ xếp hình Lego cơ bản, giúp phát triển tư duy sáng tạo."
  }
];