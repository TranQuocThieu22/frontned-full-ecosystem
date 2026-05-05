"use client";

import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_currency_formatWithSuffix } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { KiemTraHoSoDangKyTuyenChonViewModel } from "./interfaces/KiemTraHoSoDangKyTuyenChonViewModel";
import KiemTraHoSoDangKyTuyenChonUpdate from "./KiemTraHoSoDangKyTuyenChonUpdate";

export default function KiemTraHoSoDangKyTuyenChonTable() {

  const query = useQuery({
    queryKey: ["kiemTraHoSoDangKyTuyenChon"],
    queryFn: () => { return mockData; },
  });

  const columns = useMemo<MRT_ColumnDef<KiemTraHoSoDangKyTuyenChonViewModel>[]>(() => [
    {
      header: "Tên đề tài",
      accessorKey: "tenDeTai",
      size: 300,
    },
    {
      header: "Thời gian thực hiện",
      accessorKey: "thoiGianThucHien",
      size: 150,
    },
    {
      header: "Tổng kinh phí thực hiện",
      accessorKey: "tongKinhPhiThucHien",
      size: 180,
      accessorFn: (row) => utils_currency_formatWithSuffix(row.tongKinhPhiThucHien, 'VNĐ'),
    },
    {
      header: "Lĩnh vực",
      accessorKey: "linhVuc",
      size: 150,
    },
    {
      header: "Chủ nhiệm đề tài",
      accessorKey: "chuNhiemDeTai",
      size: 150,
    },
    {
      header: "File hồ sơ đăng ký",
      accessorKey: "fileHoSoDangKy",
      size: 150,
      Cell: () => (
        <MyCenterFull>
          <MyButtonViewPDF />
        </MyCenterFull>
      ),
    },
    {
      header: "Hợp lệ",
      accessorKey: "hopLe",
      size: 100,
      enableSorting: false,
      Cell: ({ row }) => (
        <MyCenterFull>
          <Checkbox
            checked={row.original.hopLe}
            readOnly
          />
        </MyCenterFull>
      ),
    },
    {
      header: "Nhận xét",
      accessorKey: "nhanXet",
      size: 250,
    },
    {
      header: "Gửi thông báo",
      accessorKey: "guiThongBao",
      size: 120,
      enableSorting: false,
      Cell: ({ row }) => (
        <MyCenterFull>
          <Checkbox
            checked={row.original.guiThongBao}
            readOnly
          />
        </MyCenterFull>
      ),
    },
  ], []);

  return (
    <MyFieldset
      title="Kiểm tra hồ sơ đăng ký tuyển chọn"
    >
      <MyDataTable
        columns={columns}
        enableRowSelection={true}
        renderTopToolbarCustomActions={() => <MyButton crudType="export" />}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull><KiemTraHoSoDangKyTuyenChonUpdate values={row.original} /></MyCenterFull>
          )
        }}
        data={query.data || []}
      />
    </MyFieldset>
  );
}

export const mockData: KiemTraHoSoDangKyTuyenChonViewModel[] = [
  {
    id: 1,
    tenDeTai: "Nghiên cứu ứng dụng Blockchain trong quản lý văn bằng chứng chỉ",
    thoiGianThucHien: "12 tháng",
    tongKinhPhiThucHien: 150000000,
    linhVuc: "Công nghệ thông tin",
    chuNhiemDeTai: "Nguyễn Văn A",
    hopLe: false,
    nhanXet: "",
    guiThongBao: false,
  },
  {
    id: 2,
    tenDeTai: "Phân tích tác động của biến đổi khí hậu đến nông nghiệp địa phương",
    thoiGianThucHien: "18 tháng",
    tongKinhPhiThucHien: 200000000,
    linhVuc: "Nông nghiệp",
    chuNhiemDeTai: "Hoàng Thị D",
    hopLe: true,
    nhanXet: "Hồ sơ đầy đủ; đúng quy định; thông tin khớp với dữ liệu hệ thống",
    guiThongBao: true,
  },
  {
    id: 3,
    tenDeTai: "Phát triển hệ thống cảnh báo sớm lũ lụt dựa trên AI",
    thoiGianThucHien: "15 tháng",
    tongKinhPhiThucHien: 180000000,
    linhVuc: "Kỹ thuật; Môi trường",
    chuNhiemDeTai: "Đặng Thị H",
    hopLe: false,
    nhanXet:
      "Thiếu bản sao công chứng chứng chỉ ngoại ngữ của chủ nhiệm đề tài; Yêu cầu bổ sung đề tài; Yêu cầu bổ sung trong 3 ngày làm việc",
    guiThongBao: true,
  },
  {
    id: 4,
    tenDeTai: "Nghiên cứu các giải pháp giảm thiểu rác thải nhựa trong trường học",
    thoiGianThucHien: "10 tháng",
    tongKinhPhiThucHien: 90000000,
    linhVuc: "Môi trường",
    chuNhiemDeTai: "Phạm Thị D",
    hopLe: false,
    nhanXet: "Phân kinh phí dự toán chưa chi tiết; Cần làm rõ nguồn kinh phí đối ứng từ doanh nghiệp",
    guiThongBao: false,
  },
];