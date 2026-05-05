"use client";

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Checkbox, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_4Delete from "./F5_4Delete";
import F5_4Form from "./F5_4Form/F5_4Form";
import { IconTrash } from "@tabler/icons-react";

interface I {
  id?: number;
  ngayChungTu?: Date;
  soChungTu?: Date;
  ghiChu?: string;
  ngayChinhSua?: Date; // Thêm trường này
  nguoiChinhSua?: string; // Thêm trường này
}

export default function F5_4Read() {
  const query = useQuery<I[]>({
    queryKey: [`F5_4Read`],
    queryFn: async () => [
      {
        id: 1,
        ngayChungTu: new Date("2024-01-10T00:00:00Z"),
        soChungTu: new Date("2024-01-11T00:00:00Z"),
        ghiChu: "Chứng từ 1",
        ngayChinhSua: new Date("2024-01-12T00:00:00Z"),
        nguoiChinhSua: "Nguyễn Văn A",
      },
      {
        id: 2,
        ngayChungTu: new Date("2024-02-10T00:00:00Z"),
        soChungTu: new Date("2024-02-11T00:00:00Z"),
        ghiChu: "Chứng từ 2",
        ngayChinhSua: new Date("2024-02-12T00:00:00Z"),
        nguoiChinhSua: "Trần Văn B",
      },
    ],
  });

  const columns = useMemo<MRT_ColumnDef<I>[]>(
    () => [
      {
        header: "Ngày chứng từ",
        accessorKey: "ngayChungTu",
        accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayChungTu!)),
      },
      {
        header: "Số chứng từ",
        accessorKey: "soChungTu",
        accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.soChungTu!)),
      },
      {
        header: "Ghi chú",
        accessorKey: "ghiChu",
      },
      {
        header: "Ngày chỉnh sửa",
        accessorKey: "ngayChinhSua",
        accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayChinhSua!)),
      },
      {
        header: "Người chỉnh sửa",
        accessorKey: "nguoiChinhSua",
      },
    ],
    []
  );

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";
  return (
    <MyDataTable
      columns={columns}
      data={query.data!}
      exportAble
      renderTopToolbarCustomActions={() => (
        <Group>
          <F5_4Form />
          <Button leftSection={<IconTrash />} color="red">Xóa</Button>
        </Group>
      )}
      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>
            <F5_4Form values={{ bienBanKiemKe: "Biên bản 01" }} />
            <F5_4Delete id={row.original.id!} />
          </MyCenterFull>
        )
      }}
    />
  );
}
