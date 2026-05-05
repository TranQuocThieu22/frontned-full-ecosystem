"use client";

import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { MRT_ColumnDef } from "mantine-react-table";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useListState } from "@mantine/hooks";
import { Button, Fieldset, Group, Tabs } from "@mantine/core";
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";

interface I {
  hoTen?: string; // Tô Ngọc Lâm
  chucVu?: string; // Kế toán trưởng
  ngayChinhSua?: Date; // Thêm trường này
  nguoiChinhSua?: string; // Thêm trường này
}

export default function SF5_4Form_Tab_2() {
  const query = useQuery<I[]>({
    queryKey: [`SF5_4Form_Tab_2`],
    queryFn: async () => [
      {
        hoTen: "Tô Ngọc Lâm",
        chucVu: "Kế toán trưởng",
        ngayChinhSua: new Date("2024-01-12T00:00:00Z"),
        nguoiChinhSua: "Nguyễn Văn A",
      },
      {
        hoTen: "Phạm Thị Hà",
        chucVu: "Nhân viên hành chính",
        ngayChinhSua: new Date("2024-01-15T00:00:00Z"),
        nguoiChinhSua: "Trần Thị B",
      },
    ],
  });

  const columns = useMemo<MRT_ColumnDef<I>[]>(
    () => [
      {
        header: "Họ tên",
        accessorKey: "hoTen",
      },
      {
        header: "Chức vụ",
        accessorKey: "chucVu",
      },
      {
        header: "Ngày cập nhật",
        accessorKey: "ngayCapNhat",
        accessorFn: (row) => new Date(row.ngayChinhSua!).toLocaleDateString("vi-VN"),
      },
      {
        header: "Người cập nh",
        accessorKey: "nguoiCapNhat",
      },
    ],
    []
  );

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";
  return (
    <Tabs.Panel value="Thành phần tham gia">
      <Fieldset legend="Thành phần tham gia">
        <MyDataTable
          exportAble
          data={query.data!}
          columns={columns}
          renderTopToolbarCustomActions={() => (
            <Group>
              <Button>Thêm</Button>
              <MyButton crudType="delete" />
              <MyButton crudType="import" />
            </Group>
          )}
          renderRowActions={() => (
            <Group>
              {/* <MyActionIcon crudType="update" /> */}
              <MyActionIcon crudType="delete" />
            </Group>
          )}
        />
      </Fieldset>
    </Tabs.Panel>
  );
}
