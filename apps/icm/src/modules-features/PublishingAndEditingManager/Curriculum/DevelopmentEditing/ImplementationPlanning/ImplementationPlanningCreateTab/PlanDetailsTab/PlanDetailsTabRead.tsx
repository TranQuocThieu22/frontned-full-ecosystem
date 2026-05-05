"use client";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyCenterFull,
  MyDataTable
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AttachedSurveyFormCreate from "./PlanDetailsTabCreate";
import AttachedSurveyFormDelete from "./PlanDetailsTabDelete";
import AttachedSurveyFormUpdate from "./PlanDetailsTabUpdate";
export interface IPlanDetailsInfoViewModel {
  maKeHoach?: string; // Mã kế hoạch
  maGiaiDoan?: string; // Mã giai đoạn
  thuTu?: number; // Thứ tự
  tenGiaiDoan?: string; // Tên giai đoạn
  moTaGiaiDoan?: string; // Mô tả giai đoạn
  ngayBatDauDuKien?: string; // Ngày bắt đầu dự kiến
  ngayKetThucDuKien?: string; // Ngày kết thúc dự kiến
  nguoiChiuTrachNhiemChinh?: string; // Người chịu trách nhiệm chính
  ketQuaDauRaDuKien?: string; // Kết quả đầu ra dự kiến
  trangThaiGiaiDoan?: string; // Trạng thái giai đoạn
}
export default function PlanDetailsTabRead() {
  const query = useQuery<IPlanDetailsInfoViewModel[]>({
    queryKey: ["PlanDetailsTabRead"],
    queryFn: async () => [],
  });

  const columns = useMemo<MRT_ColumnDef<IPlanDetailsInfoViewModel>[]>(
    () => [
        {
            header: "Mã kế hoạch",
            accessorKey: "maKeHoach",
        },
        {
            header: "Mã giai đoạn",
            accessorKey: "maGiaiDoan",
        },
        {
            header: "Thứ tự",
            accessorKey: "thuTu",
        },
        {
            header: "Tên giai đoạn",
            accessorKey: "tenGiaiDoan",
        },
        {
            header: "Mô tả giai đoạn",
            accessorKey: "moTaGiaiDoan",
        },
        {
            header: "Ngày bắt đầu dự kiến",
            accessorKey: "ngayBatDauDuKien",
            Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
        },
        {
            header: "Ngày kết thúc dự kiến",
            accessorKey: "ngayKetThucDuKien",
            Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
        },
        {
            header: "Người chịu trách nhiệm chính",
            accessorKey: "nguoiChiuTrachNhiemChinh",
        },
        {
            header: "Kết quả đầu ra dự kiến",
            accessorKey: "ketQuaDauRaDuKien",
        },
        {
            header: "Trạng thái giai đoạn",
            accessorKey: "trangThaiGiaiDoan",
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
          <AttachedSurveyFormDelete id={row.original.maKeHoach!} />
        </MyCenterFull>
      )}
    />
  );
}
