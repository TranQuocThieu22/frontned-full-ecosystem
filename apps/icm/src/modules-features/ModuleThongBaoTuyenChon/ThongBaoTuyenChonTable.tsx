"use client";

import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyButton, MyButtonDeleteList, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date } from "aq-fe-framework/utils-v2";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ThongBaoTuyenChonViewModel } from "./interfaces/ThongBaoTuyenChonViewModel";
import ThongBaoTuyenChonCreate from "./ThongBaoTuyenChonCreate";
import ThongBaoTuyenChonDelete from "./ThongBaoTuyenChonDelete";
import ThongBaoTuyenChonUpdate from "./ThongBaoTuyenChonUpdate";

export default function ThongBaoTuyenChonTable() {

  const query = useQuery({
    queryKey: ["thongBaoTuyenChon"],
    queryFn: () => { return mockData; },
  });

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  });

  const columns = useMemo<MRT_ColumnDef<ThongBaoTuyenChonViewModel>[]>(() => [
    {
      header: "Mã thông báo",
      accessorKey: "code",
    },
    {
      header: "Tiêu đề thông báo",
      accessorKey: "name",
    },
    {
      header: "File đính kèm",
      accessorKey: "fileDinhKem",
      Cell: () => (
        <MyCenterFull>
          <MyButtonViewPDF />
        </MyCenterFull>
      ),
    },
    {
      header: "Ngày ban hành",
      accessorKey: "ngayBanHanh",
      accessorFn: (row) => utils_date.toDDMMYYYY(row.ngayBanHanh),
    },
    {
      header: "Gửi thông báo",
      accessorKey: "guiThongBao",
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
      title="Danh sách thông báo tuyển chọn"
    >
      <MyDataTable
        columns={columns}
        enableRowSelection={true}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <ThongBaoTuyenChonCreate />
              <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
              <MyButton crudType="export" />
              <MyButtonDeleteList onSubmit={() => { }} contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.code).join(", ")} />
            </>
          )
        }}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <ThongBaoTuyenChonUpdate values={row.original} />
              <ThongBaoTuyenChonDelete id={row.original.id} code={row.original.code} />
            </MyCenterFull>
          )
        }}
        data={query.data || []}
      />
    </MyFieldset>
  );
}

const mockData: ThongBaoTuyenChonViewModel[] = [
  {
    id: 1,
    code: "TBKQ2025001",
    name: "Thông báo kết quả tuyển chọn nhiệm vụ KH&CN cấp cơ sở 1 năm 2025",
    noiDungChinh: "",
    fileDinhKem: "file1.pdf",
    ngayBanHanh: new Date("2025-09-01"),
    guiThongBao: true,
    danhSachDangKyDuocChon: [
      {
        code: "DKTC2025001",
        name: "Nghiên cứu phát triển vật liệu composite mới chịu nhiệt cao",
        linhVuc: "Vật liệu tiên tiến",
        chuNhiem: "Nguyễn Văn A",
        danhGiaPhuHop: "4/5",
        danhGiaCuaHoiDong: "Phù hợp",
        kienNghi: "Đề tài có tính khả thi cao, cần bổ sung thêm kinh phí hoạt động theo yêu cầu",
      },
      {
        code: "DKTC2025002",
        name: "Ứng dụng AI trong phân tích dữ liệu y tế",
        linhVuc: "Công nghệ thông tin, Y sinh",
        chuNhiem: "Trần Thị B",
        danhGiaPhuHop: "3/5",
        danhGiaCuaHoiDong: "Phù hợp",
        kienNghi: "Đề tài cần làm rõ thêm về nguồn dữ liệu và phương pháp triển khai",
      },
      {
        code: "DKTC2025003",
        name: "Nghiên cứu về tác động của mạng xã hội đến hành vi tiêu dùng của giới trẻ",
        linhVuc: "Kinh tế, Tâm lý học",
        chuNhiem: "Phạm Thị D",
        danhGiaPhuHop: "5/5",
        danhGiaCuaHoiDong: "Phù hợp",
        kienNghi: "Nghiên cứu có giá trị thực tiễn cao, cần mở rộng quy mô khảo sát",
      },
      {
        code: "DKTC2025004",
        name: "Phát triển hệ thống giám sát nông nghiệp thông minh sử dụng IoT",
        linhVuc: "Nông nghiệp, Công nghệ thông tin",
        chuNhiem: "Hoàng Minh E",
        danhGiaPhuHop: "4/5",
        danhGiaCuaHoiDong: "Phù hợp",
        kienNghi: "Hệ số đầy đủ, cần bổ sung về cơ chế bảo mật và khả năng mở rộng hệ thống",
      },
    ],
  },
  {
    id: 2,
    code: "TBKQ2025002",
    name: "Thông báo về việc bổ sung kinh phí cho các đề tài được duyệt",
    noiDungChinh: "",
    fileDinhKem: "file2.pdf",
    ngayBanHanh: new Date("2025-09-15"),
    guiThongBao: false,
    danhSachDangKyDuocChon: [],
  },
];