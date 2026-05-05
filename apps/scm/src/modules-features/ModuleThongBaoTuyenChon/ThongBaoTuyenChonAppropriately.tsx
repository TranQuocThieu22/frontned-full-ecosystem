"use client";

import { U0MyShowNotification } from "@/utils/notification";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { DanhSachDangKyDuocDanhGiaPhuHopViewModel } from "./interfaces/ThongBaoTuyenChonViewModel";

export default function ThongBaoTuyenChonAppropriately() {

  const query = useQuery({
    queryKey: [""],
    queryFn: () => { return mockData; },
  });

  const form = useForm<DanhSachDangKyDuocDanhGiaPhuHopViewModel>({
    initialValues: {
      code: "",
      name: "",
      linhVuc: "",
      danhGiaPhuHop: "",
      danhGiaCuaHoiDong: "",
      kienNghi: "",
    },
    validate: {
    }
  });

  const columns = useMemo<MRT_ColumnDef<DanhSachDangKyDuocDanhGiaPhuHopViewModel>[]>(() => [
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

  const disc = useDisclosure();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values: DanhSachDangKyDuocDanhGiaPhuHopViewModel) => {
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
    <MyButtonModal disclosure={disc} crudType="create" modalSize="80%">
      <form onSubmit={form.onSubmit((values) => {
        mutation.mutate(values);
      })}>
        <MyDataTable
          columns={columns}
          data={query.data || []}
          enableColumnFilters={false}
          enableGlobalFilter={false}
          enablePagination={true}
          enableRowSelection={true}
          renderTopToolbarCustomActions={({ table }) => <MyButton crudType="create" form="form">Chọn</MyButton>}
        />
      </form>
    </MyButtonModal>
  );
}

const mockData: DanhSachDangKyDuocDanhGiaPhuHopViewModel[] = [
  {
    code: "DKTC2025001",
    name: "Nghiên cứu phát triển vật liệu composite mới chịu nhiệt cao",
    linhVuc: "Vật liệu tiên tiến",
    danhGiaPhuHop: "4/5",
    danhGiaCuaHoiDong: "Phù hợp",
    kienNghi: "Đề tài có tính khả thi cao, cần bổ sung thêm kinh phí hoạt động theo yêu cầu",
  },
  {
    code: "DKTC2025002",
    name: "Ứng dụng AI trong phân tích dữ liệu y tế",
    linhVuc: "Công nghệ thông tin, Y sinh",
    danhGiaPhuHop: "3/5",
    danhGiaCuaHoiDong: "Phù hợp",
    kienNghi: "Đề tài cần làm rõ thêm về nguồn dữ liệu và phương pháp triển khai",
  },
  {
    code: "DKTC2025003",
    name: "Nghiên cứu về tác động của mạng xã hội đến hành vi tiêu dùng của giới trẻ",
    linhVuc: "Kinh tế, Tâm lý học",
    danhGiaPhuHop: "4/5",
    danhGiaCuaHoiDong: "Phù hợp với điều kiện",
    kienNghi: "Cần mở rộng phạm vi nghiên cứu và đa dạng hóa mẫu khảo sát",
  }
];