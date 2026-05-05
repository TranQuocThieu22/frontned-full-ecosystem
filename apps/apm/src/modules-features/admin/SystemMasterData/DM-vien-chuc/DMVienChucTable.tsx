import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DMVienChucDeleteList from "./DMVienChucDeleteList";
import DMVienChucDelete from "./DMVienChucDelete";
import DMVienChucUpdate from "./DMVienChucUpdate";
import DMVienChucCreate from "./DMVienChucCreate";
import { IVienChucInfoViewModel } from "./interfaces/IVienChucInfoViewModel";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";

export default function DMVienChucTable() {
  const columns = useMemo<MRT_ColumnDef<IVienChucInfoViewModel>[]>(
    () => [
      {
        header: "Mã viên chức",
        accessorKey: "code",
      },
      {
        header: "Mã viên chức từ hệ thống trung tâm",
        accessorKey: "maVienChucTrungTam",
        size: 320,
      },
      {
        header: "Họ và tên",
        accessorKey: "hoTen",
      },
      {
        header: "Giới tính",
        accessorKey: "gioiTinh",
      },
      {
        header: "Ngày sinh",
        accessorKey: "ngaySinh",
        accessorFn(originalRow) {
          return utils_date_dateToDDMMYYYString(originalRow.ngaySinh!);
        },
      },
      {
        header: "Đơn vị công tác",
        accessorKey: "donViCongTac",
        size: 250,
      },
      {
        header: "Chức vụ",
        accessorKey: "chucVu",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Số điện thoại",
        accessorKey: "soDienThoai",
      },
      {
        header: "Trạng thái hoạt động",
        accessorKey: "trangThaiHoatDong",
      },
      {
        header: "Ngày cập nhật từ SSO",
        accessorKey: "ngayCapNhatSSO",
      },
    ],
    []
  );
  return (
    <MyFieldset title="Danh mục viên chức">
      <MyDataTable
        columns={columns}
        data={mockData!}
        enableRowSelection={true}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <DMVienChucCreate />
              <MyButton crudType="import" />
              <MyButton crudType="export" />
              <DMVienChucDeleteList
                values={table.getSelectedRowModel().flatRows.flatMap((item) => item.original)}
              />
              <MyButton crudType="default">Đồng bộ từ EduSoft.Net</MyButton>
            </>
          );
        }}
        renderRowActions={({ row }) => {
          return (
            <MyCenterFull>
              <DMVienChucUpdate values={row.original} />
              <DMVienChucDelete id={row.original.id!} code={row.original.code || ""} />
            </MyCenterFull>
          );
        }}
      />
    </MyFieldset>
  );
}

const mockData: IVienChucInfoViewModel[] = [
  {
    id: 1,
    code: "VC001",
    maVienChucTrungTam: "HRM0123",
    hoTen: "Nguyễn Thị Thảo",
    gioiTinh: "Nữ",
    ngaySinh: new Date("1980-03-15"),
    donViCongTac: "Khoa Công nghệ thông tin",
    chucVu: "Giảng viên chính",
    email: "thao.nt@example.edu.vn",
    soDienThoai: "0901234567",
    trangThaiHoatDong: "Đang làm việc",
    ngayCapNhatSSO: "30/06/2025 10:00:00",
  },
  {
    id: 2,
    code: "VC002",
    maVienChucTrungTam: "HRM0124",
    hoTen: "Lê Văn Hùng",
    gioiTinh: "Nam",
    ngaySinh: new Date("1975-11-22"),
    donViCongTac: "Phòng Tổ chức Cán bộ",
    chucVu: "Trưởng phòng",
    email: "hung.lv@example.edu.vn",
    soDienThoai: "0987654321",
    trangThaiHoatDong: "Đang làm việc",
    ngayCapNhatSSO: "30/06/2025 10:00:00",
  },
  {
    id: 3,
    code: "VC003",
    maVienChucTrungTam: "HRM0125",
    hoTen: "Phạm Thu Lan",
    gioiTinh: "Nữ",
    ngaySinh: new Date("1988-07-05"),
    donViCongTac: "Khoa Kinh tế",
    chucVu: "Chuyên viên",
    email: "lan.pt@example.edu.vn",
    soDienThoai: "0919876543",
    trangThaiHoatDong: "Đang làm việc",
    ngayCapNhatSSO: "29/06/2025 09:15:00",
  },
  {
    id: 4,
    code: "VC004",
    maVienChucTrungTam: "HRM0126",
    hoTen: "Trần Đình Nam",
    gioiTinh: "Nam",
    ngaySinh: new Date("1970-01-10"),
    donViCongTac: "Khoa Vật lý",
    chucVu: "Giảng viên cao cấp",
    email: "nam.td@example.edu.vn",
    soDienThoai: "0978123456",
    trangThaiHoatDong: "Đang làm việc",
    ngayCapNhatSSO: "28/06/2025 15:30:00",
  },
];
