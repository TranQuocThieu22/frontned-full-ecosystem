'use client'

import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
export interface I_f22ym0jn46 {
    id?: number, maLop?: string, tenLop?: string, namHocVao?: string, namHocRa?: string, daTongKet?: boolean , ngayTongKet?: Date, nguoiTongKet?: string
}
export default function F_f22ym0jn46Read(
) {
    const className = useQuery<I_f22ym0jn46[]>({
        queryKey: ['I_f22ym0jn46Read'],
        queryFn: async () => {
            // const result = await baseAxios.get("/DocumentAttribute/GetByType?", { params: { documentType } })
            // return result.data?.data || []
            return mockData || []
        },
    })

    const columns = useMemo<MRT_ColumnDef<I_f22ym0jn46>[]>(() => [
        {
          header: "Mã Lớp",
          accessorKey: "maLop",
        },
        {
          header: "Tên Lớp",
          accessorKey: "tenLop",
        },
        {
          header: "Năm học - Học kỳ vào",
          accessorKey: "namHocVao",
        },
        {
          header: "Năm học - Học kỳ ra",
          accessorKey: "namHocRa",
        },
        {
          header: "Đã tổng kết",
          accessorKey: "daTongKet",
          Cell: ({ cell }) => {
            const daTongKet = cell.getValue<boolean>();
            return (
              <MyCheckbox
                checked={cell.getValue() as boolean}
                readOnly
              />
            );
          },
        },
        {
          header: "Ngày tổng kết",
          accessorKey: "ngayTongKet",
          Cell: ({ cell }) => {
            const date = cell.getValue<Date | null>();
            if (!date) return "";
        
            const formatted = `${date.getFullYear()}/` +
              `${String(date.getMonth() + 1).padStart(2, "0")}/` +
              `${String(date.getDate()).padStart(2, "0")} ` +
              `${String(date.getHours()).padStart(2, "0")}:` +
              `${String(date.getMinutes()).padStart(2, "0")}:` +
              `${String(date.getSeconds()).padStart(2, "0")}`;
        
            return formatted;
          },
        },
        {
          header: "Người tổng kết",
          accessorKey: "nguoiTongKet",
        }
      ], []);
    if (className.isLoading) return "Đang tải dữ liệu..."
    if (className.isError) return "Có lỗi xảy ra!"
    const handleOnClick = () => {
      notifications.show({
        title: "Tổng kết thành công!",
        message: "Lớp đã được tổng kết hoàn tất.",
        color: "green",
        icon: <IconCheck />,
      });
    }
    return (
        <MyFieldset title="Danh sách lớp học">
        <MyDataTable
            exportAble
            columns={columns}
            enableRowNumbers={true}
            data={className.data!}
            renderTopToolbarCustomActions={() => {
                return (
                    <Group>
                        <Button color="green" onClick={handleOnClick}>Tổng kết</Button>
                    </Group>
                )
            }}
          />
        </MyFieldset>
    )
}

const mockData: I_f22ym0jn46[] = [
  {
    id: 1,
    maLop: "IT20241-01",
    tenLop: "Công nghệ thông tin khóa 24",
    namHocVao: "2024-1",
    namHocRa: "2028-2",
    daTongKet: false,
    ngayTongKet: new Date("2024-03-15T11:05:02"),
    nguoiTongKet: "Admin",
  },
  {
    id: 2,
    maLop: "KT20241-01",
    tenLop: "Kế toán khóa 24",
    namHocVao: "2024-1",
    namHocRa: "2027-2",
    daTongKet: true,
    ngayTongKet: new Date("2024-03-10T09:30:00"),
    nguoiTongKet: "Nguyễn Văn A",
  },
  {
    id: 3,
    maLop: "QTKD20241-01",
    tenLop: "Quản trị kinh doanh khóa 24",
    namHocVao: "2024-1",
    namHocRa: "2027-2",
    daTongKet: false,
    ngayTongKet: new Date("2024-03-10T09:30:00"),
    nguoiTongKet: "",
  },
  {
    id: 4,
    maLop: "DL20241-01",
    tenLop: "Du lịch khóa 24",
    namHocVao: "2024-1",
    namHocRa: "2026-2",
    daTongKet: true,
    ngayTongKet: new Date("2024-03-12T14:45:00"),
    nguoiTongKet: "Admin",
  },
  {
    id: 5,
    maLop: "SP20241-01",
    tenLop: "Sư phạm Tiếng Anh khóa 24",
    namHocVao: "2024-1",
    namHocRa: "2028-2",
    daTongKet: false,
    ngayTongKet: new Date("2024-03-10T09:30:00"),
    nguoiTongKet: "",
  },
  {
    id: 6,
    maLop: "NN20241-01",
    tenLop: "Ngôn ngữ Anh khóa 24",
    namHocVao: "2024-1",
    namHocRa: "2027-1",
    daTongKet: true,
    ngayTongKet: new Date("2024-03-05T10:00:00"),
    nguoiTongKet: "Phạm Minh Tâm",
  },
  {
    id: 7,
    maLop: "QH20241-01",
    tenLop: "Quan hệ công chúng khóa 24",
    namHocVao: "2024-1",
    namHocRa: "2026-2",
    daTongKet: false,
    ngayTongKet: new Date("2024-03-10T09:30:00"),
    nguoiTongKet: "",
  },
  {
    id: 8,
    maLop: "DL20241-02",
    tenLop: "Hướng dẫn viên du lịch khóa 24",
    namHocVao: "2024-1",
    namHocRa: "2026-2",
    daTongKet: false,
    ngayTongKet: new Date("2024-03-10T09:30:00"),
    nguoiTongKet: "",
  }
];

  


