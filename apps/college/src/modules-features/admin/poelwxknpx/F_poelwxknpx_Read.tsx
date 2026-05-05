'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

export interface I_poelwxknpx {
  soThuTu?: number; // STT
  maSinhVien?: string; // Mã sinh viên
  hoTen?: string; // Họ tên
  ngaySinh?: Date; // Ngày sinh
  gioiTinh?: string; // Giới tính
  hienDien?: string; // Hiện diện
  soVaoSo?: string; // Số vào sổ
  ngayVaoSo?: Date; // Ngày vào sổ
  soVanBang?: string; // Số văn bằng
  ngayCap?: Date; // Ngày cấp
  daNhan?: boolean; // Đã nhận
  ghiChu?: string; // Ghi chú
}

export default function F_poelwxknpx_Read() {
  const [edited, setEdited] = useState<I_poelwxknpx[]>([]);

  const query = useQuery<I_poelwxknpx[]>({
    queryKey: ["F_poelwxknpx_Read"],
    queryFn: async () => [
      {
        soThuTu: 1,
        maSinhVien: "SV001",
        hoTen: "Nguyễn Văn A",
        ngaySinh: new Date("2000-01-01"),
        gioiTinh: "Nam",
        hienDien: "Tốt nghiệp",
        soVaoSo: undefined,
        ngayVaoSo: undefined,
        soVanBang: undefined,
        ngayCap: undefined,
        daNhan: false,
        ghiChu: undefined
      },
      {
        soThuTu: 2,
        maSinhVien: "SV002",
        hoTen: "Trần Thị B",
        ngaySinh: new Date("2001-02-02"),
        gioiTinh: "Nữ",
        hienDien: "Tốt nghiệp",
        soVaoSo: undefined,
        ngayVaoSo: undefined,
        soVanBang: undefined,
        ngayCap: undefined,
        daNhan: true,
        ghiChu: undefined
      },
    ],
  });
  const columns = useMemo<MRT_ColumnDef<I_poelwxknpx>[]>(() => [
    {
      accessorKey: "maSinhVien",
      header: "Mã sinh viên",
    },
    {
      accessorKey: "hoTen",
      header: "Họ tên",
    },
    {
      accessorFn: (row) => row.ngaySinh ? U0DateToDDMMYYYString(new Date(row.ngaySinh!)) : "",
      header: "Ngày sinh",

    },
    {
      accessorKey: "gioiTinh",
      header: "Giới tính",
    },
    {
      accessorKey: "hienDien",
      header: "Hiện diện",
    },
    {
      accessorKey: "soVaoSo",
      header: "Số vào sổ",
      Cell: ({ row }) => {
        return <MyTextInput
          placeholder="Nhập số vào sổ"
          value={row.original.soVaoSo ?? undefined}
          onBlur={(e) => handleFieldChange(row.original, "soVaoSo", Number(e.currentTarget.value))}
        />
      }
    },
    {
      accessorFn: (row) => row.ngayVaoSo ? U0DateToDDMMYYYString(new Date(row.ngayVaoSo!)) : "",
      header: "Ngày vào sổ",
      Cell: ({ row }) => {
        return <MyDateInput
          placeholder="Nhập ngày vào sổ"
          value={row.original.ngayVaoSo ?? undefined}
          onBlur={(e) => handleFieldChange(row.original, "ngayVaoSo", new Date(e.currentTarget.value))}

        />
      }
    },
    {
      accessorKey: "soVanBang",
      header: "Số văn bằng",
      Cell: ({ row }) => {
        return <MyTextInput
          placeholder="Nhập số văn bằng"
          value={row.original.soVanBang ?? undefined}
          onBlur={(e) => handleFieldChange(row.original, "soVanBang", Number(e.currentTarget.value))}

        />
      }
    },
    {
      accessorFn: (row) => row.ngayCap ? U0DateToDDMMYYYString(new Date(row.ngayCap!)) : "",
      header: "Ngày cấp",
      Cell: ({ row }) => {
        return <MyDateInput
          placeholder="Nhập ngày cấp"
          value={row.original.ngayCap ?? undefined}
          onBlur={(e) => handleFieldChange(row.original, "ngayCap", new Date(e.currentTarget.value))}
        />
      }
    },
    {
      accessorKey: "daNhan",
      header: "Đã nhận",
      Cell: ({ row }) => {
        return <MyCheckbox
          checked={row.original.daNhan ?? false}
          onChange={(e) => handleFieldChange(row.original, "daNhan", e.currentTarget.checked)}
        />
      }

    },
    {
      accessorKey: "ghiChu",
      header: "Ghi chú",
      Cell: ({ row }) => {
        return <MyTextInput
          placeholder="Nhập ghi chú"
          value={row.original.ghiChu ?? undefined}
          onBlur={(e) => handleFieldChange(row.original, "ghiChu", e.currentTarget.value)}
        />
      }
    },

  ], []);
  const exportConfig = {
    fields: [
      {
        fieldName: "maSinhVien",
        header: "Mã sinh viên"
      },
      {
        fieldName: "hoTen",
        header: "Họ tên"
      },
      {
        fieldName: "ngaySinh",
        header: "Ngày sinh"
      },
      {
        fieldName: "gioiTinh",
        header: "Giới tính"
      },
      {
        fieldName: "hienDien",
        header: "Hiện diện"
      },
      {
        fieldName: "soVaoSo",
        header: "Số vào sổ"
      },
      {
        fieldName: "ngayVaoSo",
        header: "Ngày vào sổ"
      },
      {
        fieldName: "soVanBang",
        header: "Số văn bằng"
      },
      {
        fieldName: "ngayCap",
        header: "Ngày cấp"
      },
      {
        fieldName: "daNhan",
        header: "Đã nhận"
      },
      {
        fieldName: "ghiChu",
        header: "Ghi chú"
      }
    ]
  };

  const handleFieldChange = (row: I_poelwxknpx, fieldName: keyof I_poelwxknpx, fieldValue: any) => {
    if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null

    setEdited((prev) => {
      // Check if the row already exists in edited
      const existingIndex = prev.findIndex((item) => item.maSinhVien === row.maSinhVien);

      if (existingIndex !== -1) {
        // Update existing row
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          [fieldName]: fieldValue
        };
        return updated;
      } else {
        // Add new modified row
        return [...prev, {
          ...row,
          [fieldName]: fieldValue
        }];
      }
    });
  };
  if (query.isLoading) return "Đang tải dữ liệu..."
  if (query.isError) return "Có lỗi xảy ra!"
  return (
    <MyDataTable
      selectAllMode="all"
      columns={columns}
      data={query.data!}
      renderTopToolbarCustomActions={() => (
        <>
          <MyButton crudType="save" />
          <AQButtonExportData
            isAllData={true}
            objectName="dsCapNhatThongTinTotNghiep"
            data={query.data!}
            exportConfig={exportConfig}
          />
          <MyButton crudType="delete" />

        </>
      )}
    />
  )
}