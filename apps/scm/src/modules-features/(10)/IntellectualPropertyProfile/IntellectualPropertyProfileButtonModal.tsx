'use client'
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  MyButtonModal,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { mockDataButtonXemChiTiet } from "./mockData";

export interface IXemChiTietInfoViewModel {
  maBanGhiLichSu?: string; // Record ID
  maIpFk?: string; // IP ID (FK)
  tenIp?: string; // IP Name
  trangThaiPhapLyMoi?: string; // New Legal Status
  ngayThayDoi?: string; // Change Date (dd/mm/yyyy)
  nguoiHeThongThayDoi?: string; // Person/System that Changed
  moTaChiTietSuKien?: string; // Detailed Event Description
}


export default function IntellectualPropertyProfileButtonModal() {
  const disc = useDisclosure();
  const query = useQuery<IXemChiTietInfoViewModel[]>({
    queryKey: ['IntellectualPropertyProfileButtonModal'],
    queryFn: async () => mockDataButtonXemChiTiet,
  });

  const columns = useMemo<MRT_ColumnDef<IXemChiTietInfoViewModel>[]>(
    () => [
      {
        header: "Mã bản ghi lịch sử",
        accessorKey: "maBanGhiLichSu",
      },
      {
        header: "Mã IP (FK)",
        accessorKey: "maIpFk",
      },
      {
        header: "Tên IP",
        accessorKey: "tenIp",
      },
      {
        header: "Trạng thái pháp lý mới",
        accessorKey: "trangThaiPhapLyMoi",
      },
      {
        header: "Ngày thay đổi",
        accessorKey: "ngayThayDoi",
      },
      {
        header: "Người/Hệ thống thay đổi",
        accessorKey: "nguoiHeThongThayDoi",
      },
      {
        header: "Mô tả chi tiết sự kiện",
        accessorKey: "moTaChiTietSuKien",
      },
    ],
    []
  );

  return (
    <MyButtonModal title="Chi tiết loại đề tài" variant="transparent" color="blue" modalSize={"90%"} disclosure={disc} label="Xem chi tiết">
      <MyFieldset title="Danh sách theo dõi đăng ký bảo hộ">
        <MyDataTable
          isError={query.isError}
          isLoading={query.isLoading}
          columns={columns}
          exportAble
          enableRowSelection={false}
          data={query.data || []}
        />
      </MyFieldset>
    </MyButtonModal>
  );
}
