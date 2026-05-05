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
import AttachedSurveyFormDelete from "./AttachedSurveyFormDelete";
import AttachedSurveyFormCreate from "./AttachedSurveyFormCreate";
import { mockDataAttachedSurveyForm } from "../../mockData";
import AttachedSurveyFormUpdate from "./AttachedSurveyFormUpdate";
export interface IAttachedSurveyFormInfoViewModel {
  maMauPhieu?: string; // Mã Mẫu Phiếu
  tenMauPhieu?: string; // Tên Mẫu Phiếu
  thoiGianTrienKhaiTuongDoi?: string; // Thời gian Triển khai Tương đối
  loaiPhieu?: string; // Loại Phiếu
  donViChuTri?: string; // Đơn vị Chủ trì
  nguongTyLePhanHoiGoiY?: number; // Ngưỡng Tỷ lệ Phân hồi Gợi ý
}
export default function AttachedSurveyFormRead() {
  const query = useQuery<IAttachedSurveyFormInfoViewModel[]>({
    queryKey: ["AttachedSurveyFormRead"],
    queryFn: async () => mockDataAttachedSurveyForm,
  });

  const columns = useMemo<MRT_ColumnDef<IAttachedSurveyFormInfoViewModel>[]>(
    () => [
      {
        header: "Mã Mẫu Phiếu",
        accessorKey: "maMauPhieu",
      },
      {
        header: "Tên Mẫu Phiếu",
        accessorKey: "tenMauPhieu",
      },
      {
        header: "Thời gian Triển khai Tương đối",
        accessorKey: "thoiGianTrienKhaiTuongDoi",
      },
      {
        header: "Loại Phiếu",
        accessorKey: "loaiPhieu",
      },
      {
        header: "Đơn vị Chủ trì",
        accessorKey: "donViChuTri",
      },
      {
        header: "Ngưỡng Tỷ lệ Phản hồi Gợi ý",
        accessorKey: "nguongTyLePhanHoiGoiY",
      },
    ],
    []
  );

  return (
    <MyDataTable
      isError={query.isError}
      isLoading={query.isLoading}
      columns={columns}
      data={query.data || []}
      enableRowSelection
      renderTopToolbarCustomActions={() => (
        <MyCenterFull>
          <AttachedSurveyFormCreate />
          <MyButton crudType="import">Import</MyButton>
          <MyButton crudType="export">Export</MyButton>
          <MyButton crudType="delete">Xóa</MyButton>
        </MyCenterFull>
      )}
      renderRowActions={({ row }) => (
        <MyCenterFull>
          <AttachedSurveyFormUpdate values={row.original} />
          <AttachedSurveyFormDelete id={row.original.maMauPhieu!} />
        </MyCenterFull>
      )}
    />
  );
}
