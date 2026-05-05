"use client";

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { MRT_ColumnDef } from "mantine-react-table";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useListState } from "@mantine/hooks";
import { Button, Fieldset, Group, Tabs, Textarea } from "@mantine/core";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";

interface I {
  maTaiSan?: string; // TV55SS
  maVach?: string; // TS02356
  tenTaiSan?: string; // Tivi Samsung 55 Inc
  donViSuDung?: string; // Phòng giám đốc
  nguyenGia?: string; // 5.000.000
  giaTriConLai?: string; // 2.000.000
  trangThai?: string; // Còn
  chatLuong?: string; // Hoạt động tốt
  kienNghi?: string; // Không kiến nghị
  ngayChinhSua?: Date; // Thêm trường này
  nguoiChinhSua?: string; // Thêm trường này
}

export default function SF5_4Form_Tab_3() {
  const query = useQuery<I[]>({
    queryKey: [`SF5_4Form_Tab_3`],
    queryFn: async () => [
      {
        maTaiSan: "TV55SS",
        maVach: "TS02356",
        tenTaiSan: "Tivi Samsung 55 Inc",
        donViSuDung: "Phòng giám đốc",
        nguyenGia: "5.000.000",
        giaTriConLai: "2.000.000",
        trangThai: "Còn",
        chatLuong: "Hoạt động tốt",
        kienNghi: "Không kiến nghị",
        ngayChinhSua: new Date("2024-01-12T00:00:00Z"),
        nguoiChinhSua: "Nguyễn Văn A",
      },
      {
        maTaiSan: "LD65LG",
        maVach: "TS02357",
        tenTaiSan: "Laptop Dell 65 LG",
        donViSuDung: "Phòng kế toán",
        nguyenGia: "10.000.000",
        giaTriConLai: "5.000.000",
        trangThai: "Còn",
        chatLuong: "Hoạt động tốt",
        kienNghi: "Không kiến nghị",
        ngayChinhSua: new Date("2024-02-12T00:00:00Z"),
        nguoiChinhSua: "Trần Văn B",
      },
    ],
  });

  const columns = useMemo<MRT_ColumnDef<I>[]>(
    () => [
      {
        header: "Mã tài sản",
        accessorKey: "maTaiSan",
      },
      {
        header: "Mã vạch",
        accessorKey: "maVach",
      },
      {
        header: "Tên tài sản",
        accessorKey: "tenTaiSan",
      },
      {
        header: "Đơn vị sử dụng",
        accessorKey: "donViSuDung",
      },
      {
        header: "Nguyên giá",
        accessorKey: "nguyenGia",
      },
      {
        header: "Giá trị còn lại",
        accessorKey: "giaTriConLai",
      },
      {
        header: "Trạng thái",
        accessorKey: "trangThai",
      },
      {
        header: "Chất lượng",
        accessorKey: "chatLuong",
      },
      {
        header: "Kiến nghị",
        accessorKey: "kienNghi",
      },
      {
        header: "Ngày chỉnh sửa",
        accessorKey: "ngayCapNhat",
        accessorFn: (row) =>
          new Date(row.ngayChinhSua!).toLocaleDateString("vi-VN"),
      },
      {
        header: "Người chỉnh sửa",
        accessorKey: "nguoiCapNhat",
      },
    ],
    []
  );

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";
  return (
    <Tabs.Panel value="Kết quả xử lý">
      <Fieldset legend="Nội dung yêu cầu xử lí">
        <Textarea minRows={8} placeholder="Nhập nội dung yêu cầu xử lý" />
      </Fieldset>
    </Tabs.Panel>
  );
}
