"use client";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { mockData } from "./mockData";
import ListSurveySubjectsDelete from "./ListSurveySubjectsDelete";
import ListSurveySubjectsUpdate from "./ListSurveySubjectsUpdate";
import ListSurveySubjectsCreate from "./ListSurveySubjectsCreate";
export interface IListSurveySubjectsInfoViewModel {
  maDoiTuong?: string; // Mã Đối tượng
  tenDoiTuong?: string; // Tên Đối tượng (Họ và Tên/Tên Thực thể)
  email?: string; // Email
  soDienThoai?: string; // Số điện thoại
  loaiDoiTuong?: string; // Loại Đối tượng
  namHoc?: string; // Năm học
  hocKy?: string; // Học kỳ
  donViChuQuan?: string; // Khoa/Đơn vị Chủ quản
  lop?: string; // Lớp
  boMon?: string; // Bộ môn
  chucDanh?: string; // Chức danh
  khoaPhienBan?: string; // Khóa/Phiên bản
  moTaChiTiet?: string; // Mô tả/Chi tiết
  diaDiemViTri?: string; // Địa điểm/Vị trí
}

export default function ListSurveySubjectsRead() {
  const query = useQuery<IListSurveySubjectsInfoViewModel[]>({
    queryKey: ["ListSurveySubjectsRead"],
    queryFn: async () => mockData,
  });

  const columns = useMemo<MRT_ColumnDef<IListSurveySubjectsInfoViewModel>[]>(
    () => [
      { header: "Mã Đối tượng", accessorKey: "maDoiTuong" },
      { header: "Tên Đối tượng", accessorKey: "tenDoiTuong" },
      { header: "Email", accessorKey: "email" },
      { header: "Số điện thoại", accessorKey: "soDienThoai" },
      { header: "Loại Đối tượng", accessorKey: "loaiDoiTuong" },
      { header: "Năm học", accessorKey: "namHoc" },
      { header: "Học kỳ", accessorKey: "hocKy" },
      { header: "Khoa/Đơn vị Chủ quản", accessorKey: "donViChuQuan" },
      { header: "Lớp", accessorKey: "lop" },
      { header: "Bộ môn", accessorKey: "boMon" },
      { header: "Chức danh", accessorKey: "chucDanh" },
      { header: "Khóa/Phiên bản", accessorKey: "khoaPhienBan" },
      { header: "Mô tả/Chi tiết", accessorKey: "moTaChiTiet" },
      { header: "Địa điểm/Vị trí", accessorKey: "diaDiemViTri" },
    ],
    []
  );

  return (
    <MyFieldset title="">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        enableRowSelection
        renderTopToolbarCustomActions={() => (
          <MyCenterFull>
            <ListSurveySubjectsCreate/>
            <MyButton crudType="import">Import</MyButton>
            <MyButton crudType="export">Export</MyButton>
            <MyButton crudType="delete">Delete</MyButton>
          </MyCenterFull>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <ListSurveySubjectsUpdate values={row.original} />
            <ListSurveySubjectsDelete id={row.original.maDoiTuong!} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
