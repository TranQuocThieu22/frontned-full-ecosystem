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
import F9_8_8ButtonThaoTacMonitorExchange from "./ButtonThaoTac/F9_8_8ButtonThaoTacMonitorExchange";
import { mockDataRead } from "./mockData";
export interface IInfoViewModel {
  maLuotTraoDoi?: string;
  maHoSo?: string;
  maDoiTac?: string;
  maNguoiDung?: string;
  chieuTraoDoi?: string;
  thoiGianBatDauDuKien?: string;
  thoiGianKetThucDuKien?: string;
  trangThaiLuotTraoDoi?: string;
  noiDenDi?: string;
}

export default function F9_8_8ReadMonitorExchange() {
  const query = useQuery<IInfoViewModel[]>({
    queryKey: ['F9_8_8ReadMonitorExchange'],
    queryFn: async () => mockDataRead
  });
  const columns = useMemo<MRT_ColumnDef<IInfoViewModel>[]>(
    () => [
      {
        header: "Mã lượt trao đổi",
        accessorKey: "maLuotTraoDoi",
      },
      {
        header: "Mã hồ sơ",
        accessorKey: "maHoSo",
      },
      {
        header: "Mã đối tác",
        accessorKey: "maDoiTac",
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
        header: "Thời gian bắt đầu dự kiến",
        accessorKey: "thoiGianBatDauDuKien",
        Cell: ({ cell }) =>
          utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
      },
      {
        header: "Thời gian kết thúc dự kiến",
        accessorKey: "thoiGianKetThucDuKien",
        Cell: ({ cell }) =>
          utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
      },
      {
        header: "Trạng thái lượt trao đổi",
        accessorKey: "trangThaiLuotTraoDoi",
      },
      {
        header: "Nơi đến/đi",
        accessorKey: "noiDenDi",
      },
    ],
    []
  );

  return (
    <MyFieldset title="Danh sách lượt trao đổi">
      <MyDataTable
        enableRowSelection
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        exportAble
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <F9_8_8ButtonThaoTacMonitorExchange />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
