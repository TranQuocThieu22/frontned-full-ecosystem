'use client'
import { useQuery } from "@tanstack/react-query";
import {
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { mockData } from "./mockData";
import SummaryOfExchangeResultsUpdate from "./SummaryOfExchangeResultsUpdate";
export interface ISummaryOfExchangeResultsInfoViewModel {
  maLuatTraoDoi?: string; // Law Code
  maHaSo?: string; // File Code
  maNguoiDung?: string; // Person Code
  chieuTraoDoi?: string; // Exchange Direction
  thoiGianBatDau?: string; // Start Date yyyy-mm-dd
  thoiGianKetThuc?: string; // End Date yyyy-mm-dd
  trangThaiLuotTraoDoi?: string; // Exchange Status
  ghiChuTrangThaiCuoi?: string; // Final Status Note
  coVanDe?: string; // Problem
}

export default function SummaryOfExchangeResultsRead() {
  const query = useQuery<ISummaryOfExchangeResultsInfoViewModel[]>({
    queryKey: ['SummaryOfExchangeResultsRead'],
    queryFn: async () => mockData
  });

  const columns = useMemo<MRT_ColumnDef<ISummaryOfExchangeResultsInfoViewModel>[]>(
    () => [
      {
        header: "Mã lượt trao đổi",
        accessorKey: "maLuatTraoDoi",
      },
      {
        header: "Mã hồ sơ",
        accessorKey: "maHaSo",
      },
      {
        header: "Mã người dùng",
        accessorKey: "maNguoiDung",
      },
      {
        header: "Chiều trao đổi",
        accessorKey: "chieuTraoDoi",
      },
      {
        header: "Thời gian bắt đầu (Thực tế)",
        accessorKey: "thoiGianBatDau",
        Cell: ({ cell }) =>
          utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
      },
      {
        header: "Thời gian kết thúc (Thực tế)",
        accessorKey: "thoiGianKetThuc",
        Cell: ({ cell }) =>
          utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
      },
      {
        header: "Trạng thái lượt trao đổi",
        accessorKey: "trangThaiLuotTraoDoi",
      },
      {
        header: "Ghi chú trạng thái cuối cùng",
        accessorKey: "ghiChuTrangThaiCuoi",
      },
      {
        header: "Có vấn đề (Cờ)",
        accessorKey: "coVanDe",
      },
    ],
    []
  );

  return (
    <MyFieldset title="Danh sách lượt trao đổi">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        exportAble
        enableRowSelection={false}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <SummaryOfExchangeResultsUpdate values={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
