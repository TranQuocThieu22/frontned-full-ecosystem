'use client'
import { Paper } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyButtonViewPDF,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
  MySelect
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_CreatePerformIPtasks from "./F_CreatePerformIPtasks";
import F_UpdatePerformIPasks from "./F_UpdatePerformIPasks";
import { mockDataRead } from "./mockData";
export interface IPerformIPtasksInfoViewModel {
  maIp?: string;
  tenIp?: string;
  buocTrongQuyTrinh?: string;
  ngayBatDauBuoc?: string;
  ngayKetThucBuocNgaySuKien?: string;
  moTaGhiChuChiTiet?: string;
  tenTaiLieu?: string;
  loaiTaiLieu?: string;
  fileMinhChung?: string;
  trangThaiCuaBuoc?: string;
}


export default function F_ReadPerformIPtasks() {
  const query = useQuery<IPerformIPtasksInfoViewModel[]>({
    queryKey: ['F_ReadPerformIPtasks'],
    queryFn: async () => mockDataRead
  });


  const columns = useMemo<MRT_ColumnDef<IPerformIPtasksInfoViewModel>[]>(
    () => [
      {
        header: "Mã IP",
        accessorKey: "maIp",
      },
      {
        header: "Tiêu đề IP",
        accessorKey: "tenIp",
      },
      {
        header: "Bước trong quy trình",
        accessorKey: "buocTrongQuyTrinh",
      },
      {
        header: "Ngày bắt đầu bước",
        accessorKey: "ngayBatDauBuoc",
        Cell: ({ cell }) =>
          utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
      },
      {
        header: "Ngày kết thúc bước / Ngày sự kiện",
        accessorKey: "ngayKetThucBuocNgaySuKien",
        Cell: ({ cell }) =>
          utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
      },
      {
        header: "Mô tả / Ghi chú chi tiết",
        accessorKey: "moTaGhiChuChiTiet",
      },
      {
        header: "Tên tài liệu",
        accessorKey: "tenTaiLieu",
      },
      {
        header: "Loại tài liệu",
        accessorKey: "loaiTaiLieu",
      },
      {
        header: "File minh chứng",
        accessorKey: "fileMinhChung",
        Cell: ({ cell }) => (
          <MyButtonViewPDF />
        ),
      },
      {
        header: "Trạng thái của bước",
        accessorKey: "trangThaiCuaBuoc",
      },
    ],
    []
  );

  return (
    <Paper p="md">
      <MySelect allowDeselect={false} label="Chuyên viên IP" data={["NV0253 - Nguyễn Thị B"]} defaultValue={"NV0253 - Nguyễn Thị B"} mb="lg" />
      <MyFieldset title="Danh sách theo dõi đăng ký bảo hộ">
        <MyDataTable
          enableRowSelection
          isError={query.isError}
          isLoading={query.isLoading}
          columns={columns}
          data={query.data || []}
          renderTopToolbarCustomActions={() => (
            <MyCenterFull>
              <F_CreatePerformIPtasks />
              <MyButton crudType="import">Import</MyButton>
              <MyButton crudType="export">Export</MyButton>
              <MyButton crudType="delete">Xóa</MyButton>
            </MyCenterFull>
          )}
          renderRowActions={({ row }) => (
            <MyCenterFull>
              <F_UpdatePerformIPasks values={row.original} />
            </MyCenterFull>
          )}
        />
      </MyFieldset>
    </Paper>
  );
}
