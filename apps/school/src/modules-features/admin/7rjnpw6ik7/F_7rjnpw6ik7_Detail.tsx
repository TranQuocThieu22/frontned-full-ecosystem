'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MyButtonModal } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import { MyButton } from "@/components/Buttons/Button/MyButton";

interface Props {
  id?: number;
}

interface I_7rjnpw6ik7_Detail {
  id?: number;
  maHocSinh?: string;
  hoTen?: string;
  Lop?: string;
  gioiTinh?: string;
  len?: boolean;
  thoiGianLen?: Date;
  vang?: boolean;
  xuong?: boolean;
  thoiGianXuong?: Date;
  nguoiCapNhat?: string;
  ngayCapNhat?: Date;
}

export default function F_7rjnpw6ik7_Detail({ id }: Props) {
  const dis = useDisclosure();

  const carShuttleStudentQuery = useQuery<I_7rjnpw6ik7_Detail[]>({
    queryKey: [`carShuttleStudentQuery`, id],
    queryFn: async () => [
      {
        id: 1,
        maHocSinh: "HS0001",
        hoTen: "Tô Ngọc Lâm",
        Lop: "11A6",
        gioiTinh: "Nam",
        len: false,
        thoiGianLen: new Date(),
        vang: false,
        xuong: false,
        thoiGianXuong: new Date(),
        nguoiCapNhat: "Quản trị viên",
        ngayCapNhat: new Date("2024-12-23")
      },
    ],
  });

  const [status, setStatus] = useState<Record<number, Partial<I_7rjnpw6ik7_Detail>>>({});
  const [changes, setChanges] = useState<Record<number, Partial<I_7rjnpw6ik7_Detail>>>({});

  const toggleField = (id: number, field: keyof I_7rjnpw6ik7_Detail) => {
    setStatus((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));

    setChanges((prev) => {
      const newChanges = {
        ...prev,
        [id]: {
          ...prev[id],
          [field]: !prev[id]?.[field],
        },
      };

      if(!newChanges[id]) return newChanges

      if (field === "len") {
        newChanges[id].thoiGianLen = newChanges[id]?.len ? new Date() : undefined;
      } else if (field === "xuong") {
        newChanges[id].thoiGianXuong = newChanges[id]?.xuong ? new Date() : undefined;
      }

      return newChanges;
    });
  };

  
  const tableData = useMemo(() => {
    if (!carShuttleStudentQuery.data) return [];
    return carShuttleStudentQuery.data.map((item) => ({
      ...item,
      len: status[item.id!]?.len ?? item.len,
      vang: status[item.id!]?.vang ?? item.vang,
      xuong: status[item.id!]?.xuong ?? item.xuong,
      thoiGianLen: changes[item.id!]?.thoiGianLen ?? item.thoiGianLen,
      thoiGianXuong: changes[item.id!]?.thoiGianXuong ?? item.thoiGianXuong,
    }));
  }, [carShuttleStudentQuery.data, status, changes]);

  const isModified = useMemo(() => {
    return Object.entries(changes).some(([id, fields]) => {
      const original = carShuttleStudentQuery.data?.find(item => item.id === Number(id));
      if (!original || !fields) return false;

      return (
        fields.len !== undefined && fields.len !== original.len ||
        fields.vang !== undefined && fields.vang !== original.vang ||
        fields.xuong !== undefined && fields.xuong !== original.xuong
      );
    });
  }, [changes, carShuttleStudentQuery.data]);

  const handleSave = () => {
    console.log("Lưu dữ liệu:", changes);
    setChanges({});
    // setStatus({}); 
  };

  function formatDateTimeFull(date?: Date) {
    return date
      ? date.toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "";
  }

  const columns = useMemo<MRT_ColumnDef<I_7rjnpw6ik7_Detail>[]>(() => [
    {
      header: "Mã học sinh",
      accessorKey: "maHocSinh",
    },
    {
      header: "Họ tên",
      accessorKey: "hoTen",
    },
    {
      header: "Lớp",
      accessorKey: "Lop",
    },
    {
      header: "Giới tính",
      accessorKey: "gioiTinh",
    },
    {
      header: "Lên",
      accessorKey: "len",
      Cell: ({ row }) => {
        const id = row.original.id!;
        const isActive = row.original.len;

        return (
          <MyButton
            crudType="default"
            color={isActive ? "red" : "green"}
            size="xs"
            onClick={() => toggleField(id, "len")}
          >
            {isActive ? "Hủy" : "Lên"}
          </MyButton>
        );
      },
    },
    {
      header: "Thời gian lên",
      accessorKey: "thoiGianLen",
      accessorFn: (row) => formatDateTimeFull(row.thoiGianLen),
    },
    {
      header: "Vắng",
      accessorKey: "vang",
      Cell: ({ row }) => {
        const id = row.original.id!;
        const isActive = row.original.vang; 

        return (
          <MyButton
            crudType="default"
            color={isActive ? "red" : "green"}
            size="xs"
            onClick={() => toggleField(id, "vang")}
          >
            {isActive ? "Hủy" : "Vắng"}
          </MyButton>
        );
      },
    },
    {
      header: "Xuống",
      accessorKey: "xuong",
      Cell: ({ row }) => {
        const id = row.original.id!;
        const isActive = row.original.xuong; 

        return (
          <MyButton
            crudType="default"
            color={isActive ? "red" : "green"}
            size="xs"
            onClick={() => toggleField(id, "xuong")}
          >
            {isActive ? "Hủy" : "Xuống"}
          </MyButton>
        );
      },
    },
    {
      header: "Thời gian xuống",
      accessorKey: "thoiGianXuong",
      accessorFn: (row) => formatDateTimeFull(row.thoiGianXuong),
    },
    {
      header: "Người cập nhật",
      accessorKey: "nguoiCapNhat",
    },
    {
      header: "Ngày cập nhật",
      accessorKey: "ngayCapNhat",
      accessorFn: (row) =>
        row.ngayCapNhat ? utils_date_dateToDDMMYYYString(new Date(row.ngayCapNhat)) : "",
    },
  ], [status, changes]);

  if (carShuttleStudentQuery.isLoading) return "Đang tải dữ liệu...";
  if (carShuttleStudentQuery.isError) return "Không có dữ liệu...";

  return (
    <MyButtonModal modalSize="xl" disclosure={dis} title="Danh sách tuyến xe đưa đón học sinh" label="Cập nhật">
      <MyDataTable
        exportAble
        enableRowSelection
        enableRowNumbers
        columns={columns}
        data={tableData} // Use merged tableData instead of carShuttleStudentQuery.data
        renderTopToolbarCustomActions={() => (
          <>
            {isModified ? (
              <MyButton crudType="default" bg="green" onClick={handleSave}>
                Lưu
              </MyButton>
            ) : (
              <>
                <MyButton crudType="default" bg="green">Khởi hành</MyButton>
                <MyButton crudType="default" bg="red">Kết thúc</MyButton>
              </>
            )}
          </>
        )}
      />
    </MyButtonModal>
  );
}