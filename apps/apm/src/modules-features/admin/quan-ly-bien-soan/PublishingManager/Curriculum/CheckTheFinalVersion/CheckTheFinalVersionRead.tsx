'use client'
import { useQuery } from "@tanstack/react-query";
import {
  MyButtonViewPDF,
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CheckTheFinalVersionButtonKiemTra from "./CheckTheFinalVersionButtonKiemTra";
import { mockData } from "./mockData";
export interface ICheckTheFinalVersionInfoViewModel {
  maBanThao?: string; // Mã bản thảo
  tenGiaoTrinhDeXuat?: string; // Tên giáo trình đề xuất
  chuBienBanBienSoan?: string; // Chủ biên ban biên soạn
  trangThaiBanThaoHienTai?: string; // Trạng thái bản thảo hiện tại
  ngayHoanThienGanNhat?: string; // Ngày hoàn thiện gần nhất (yyyy-mm-dd)
  fileBanThaoDaCapNhat?: string; // File bản thảo đã cập nhật
  trangThaiKiemTraLai?: string; // Trạng thái kiểm tra lại
  nhanXetGopYBoSung?: string; // Nhận xét/Góp ý bổ sung
  ngayKiemTraLai?: string; // Ngày kiểm tra lại (yyyy-mm-dd)
  nguoiKiemTraLai?: string; // Người kiểm tra lại
}

export default function CheckTheFinalVersionRead() {
  const query = useQuery<ICheckTheFinalVersionInfoViewModel[]>({
    queryKey: ['CheckTheFinalVersionRead'],
    queryFn: async () => mockData
  });


  const columns = useMemo<MRT_ColumnDef<ICheckTheFinalVersionInfoViewModel>[]>(() => [
    {
      header: 'Mã bản thảo',
      accessorKey: 'maBanThao',
    },
    {
      header: 'Tên giáo trình đề xuất',
      accessorKey: 'tenGiaoTrinhDeXuat',
    },
    {
      header: 'Chủ biên ban biên soạn',
      accessorKey: 'chuBienBanBienSoan',
    },
    {
      header: 'Trạng thái bản thảo hiện tại',
      accessorKey: 'trangThaiBanThaoHienTai',
    },
    {
      header: 'Ngày hoàn thiện gần nhất',
      accessorKey: 'ngayHoanThienGanNhat',
    },
    {
      header: 'File bản thảo đã cập nhật',
      accessorKey: 'fileBanThaoDaCapNhat',
      Cell: ({ cell }) => <MyButtonViewPDF />
    },
    {
      header: 'Trạng thái kiểm tra lại',
      accessorKey: 'trangThaiKiemTraLai',
    },
    {
      header: 'Nhận xét/Góp ý bổ sung',
      accessorKey: 'nhanXetGopYBoSung',
    },
    {
      header: 'Ngày kiểm tra lại',
      accessorKey: 'ngayKiemTraLai',
    },
    {
      header: 'Người kiểm tra lại',
      accessorKey: 'nguoiKiemTraLai',
    },
  ], []);


  return (
    <MyFieldset title="Danh sách bản thảo">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        exportAble
        enableRowSelection={false}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <CheckTheFinalVersionButtonKiemTra values={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
