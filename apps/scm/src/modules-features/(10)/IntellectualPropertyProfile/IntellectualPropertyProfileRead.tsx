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
import IntellectualPropertyProfileButtonModal from "./IntellectualPropertyProfileButtonModal";
import IntellectualPropertyProfileUpdate from "./IntellectualPropertyProfileUpdate";
import { mockData } from "./mockData";
export interface IIntellectualPropertyProfileInfoViewModel {
  msIp?: string; // MS IP
  tenIpSanPham?: string; // Ten IP/San pham
  loaiHinhShtt?: string; // Loai hinh SHTT
  chuSoHuu?: string; // Chu so huu
  tacGiaNhoPhatMinh?: string; // Tac gia/Nho phat minh
  tinhTrangPhapLy?: string; // Tinh trang phap ly
  ngayNopDon?: string; // Ngay nop don
  ngayCapBang?: string; // Ngay cap bang
  thoiHanBaoHo?: string; // Thoi han bao ho
  ngayHetHieuLuc?: string; // Ngay het hieu luc
  linhVucNganhHoc?: string; // Linh vuc/Nganh hoc
  quocGiaDangKy?: string; // Quoc gia dang ky
  duAnLienQuan?: string; // Du an lien quan (MS du an)
}

export default function IntellectualPropertyProfileRead() {
  const query = useQuery<IIntellectualPropertyProfileInfoViewModel[]>({
    queryKey: ['IntellectualPropertyProfileRead'],
    queryFn: async () => mockData
  });


  const columns = useMemo<MRT_ColumnDef<IIntellectualPropertyProfileInfoViewModel>[]>(
    () => [
      {
        header: "Mã IP",
        accessorKey: "msIp",
      },
      {
        header: "Tên IP/Sản phẩm",
        accessorKey: "tenIpSanPham",
      },
      {
        header: "Loại hình SHTT",
        accessorKey: "loaiHinhShtt",
      },
      {
        header: "Chủ sở hữu",
        accessorKey: "chuSoHuu",
      },
      {
        header: "Tác giả/Nhà phát minh",
        accessorKey: "tacGiaNhoPhatMinh",
      },
      {
        header: "Tình trạng pháp lý",
        accessorKey: "tinhTrangPhapLy",
      },
      {
        header: "Ngày nộp đơn",
        accessorKey: "ngayNopDon",
        accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayNopDon!))

      },
      {
        header: "Ngày cấp bằng",
        accessorKey: "ngayCapBang",
        accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayCapBang!))

      },
      {
        header: "Thời hạn bảo hộ",
        accessorKey: "thoiHanBaoHo",
      },
      {
        header: "Ngày hết hiệu lực",
        accessorKey: "ngayHetHieuLuc",
        accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayHetHieuLuc!))
      },
      {
        header: "Lĩnh vực/Ngành học",
        accessorKey: "linhVucNganhHoc",
      },
      {
        header: "Quốc gia đăng ký",
        accessorKey: "quocGiaDangKy",
      },
      {
        header: "Dự án liên quan",
        accessorKey: "duAnLienQuan",
      },
      {
        header: "Lịch sử xử lý",
        Cell: ({ cell }) => (
          <IntellectualPropertyProfileButtonModal />
        ),
      }
    ],
    []
  );


  return (
    <MyFieldset title="Danh sách đăng ký sở hữu trí tuệ">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        exportAble
        enableRowSelection={false}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <IntellectualPropertyProfileUpdate values={row.original}/>
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
