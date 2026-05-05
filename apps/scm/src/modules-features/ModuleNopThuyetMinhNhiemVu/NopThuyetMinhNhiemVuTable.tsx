"use client";

import MyActionIconViewPDF from "@/components/ActionIcons/ActionIconViewPdf/MyActionIconViewPDF";
import { useQuery } from "@tanstack/react-query";
import { MyActionIconUpload, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_currency_formatWithSuffix } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { mockNopThuyetMinhNhiemVu } from "./interfaces/mockData";
import { NopThuyetMinhNhiemVuViewModel } from "./interfaces/NopThuyetMinhNhiemVuViewModel";
import NopThuyetMinhNhiemVuUpdate from "./NopThuyetMinhNhiemVuUpdate";

export default function NopThuyetMinhNhiemVuTable() {

  const query = useQuery({
    queryKey: ["nopThuyetMinhNhiemVu"],
    queryFn: () => { return mockNopThuyetMinhNhiemVu; },
  });

  const columns = useMemo<MRT_ColumnDef<NopThuyetMinhNhiemVuViewModel>[]>(() => [
    {
      header: "Mã đăng ký",
      accessorKey: "code",
      size: 120,
    },
    {
      header: "Tên đề tài",
      accessorKey: "name",
      size: 300,
    },
    {
      header: "Thời gian thực hiện",
      accessorKey: "thoiGianThucHien",
      size: 150,
    },
    {
      header: "Cấp quản lý",
      accessorKey: "capQuanLy",
      size: 120,
    },
    {
      header: "Tổng kinh phí thực hiện",
      accessorKey: "tongKinhPhi",
      size: 150,
      accessorFn: (row) => utils_currency_formatWithSuffix(row.tongKinhPhi, "VNĐ")
    },
    {
      header: "Phương thức khoản chi",
      accessorKey: "phuongThucKhoanChi",
      size: 180,
    },
    {
      header: "Loại hình đề tài",
      accessorKey: "loaiHinhDeTai",
      size: 150,
    },
    {
      header: "Lĩnh vực",
      accessorKey: "linhVuc",
      size: 200,
    },
    {
      header: "Chủ nhiệm đề tài",
      accessorKey: "chuNhiemDeTai",
      size: 150,
    },
    {
      header: "Tổ chức chủ trì đề tài",
      accessorKey: "toChucChuTriDeTai",
      size: 180,
    },
    {
      header: "Tình trạng của đề tài",
      accessorKey: "tinhTrangDeTai",
      size: 150,
    },
    {
      header: "File thuyết minh",
      accessorKey: "fileThuyetMinh",
      size: 120,
      Cell: ({ row }) => (
        <MyCenterFull>
          <MyActionIconUpload />
          <MyActionIconViewPDF pdfLink={row.original.fileThuyetMinh} />
        </MyCenterFull>
      ),
    },

  ], []);

  return (
    <MyFieldset
      title="Danh sách thuyết minh đề tài"
    >
      <MyDataTable
        columns={columns}
        enableRowSelection={true}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <MyButton crudType="export" />
            </>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <NopThuyetMinhNhiemVuUpdate values={row.original} />
            </MyCenterFull>
          )
        }}
        data={query.data || []}
      />
    </MyFieldset>
  );
}