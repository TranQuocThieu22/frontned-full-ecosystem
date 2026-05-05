"use client";

import { U0DateToDDMMYYYString, utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonExportData,
  MyCenterFull,
  MyCheckbox,
  MyDataTable,
  MyFieldset,
  MySelect,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_wmstx3k39c_ReadNotifi from "./F_wmstx3k39c_ReadNotifi";
import F_wmstx3k39c_NotifiDetails from "./F_wmstx3k39c_NotifiDetails";

interface Iwmstx3k39c_Read {
  maHocSinh: string;
  hoLot: string;
  ten: string;
  ngaySinh: Date;
  gioiTinh: string;
  nhomMau: string;
  chieuCao: number;
  canNang: number;
  BMI: number;
  thiLuc: string;
  thinhLuc: string;
  timMach?: number;
  hoHap?: number;
  tienSuBenhLy: string;
  ketLuanYTe: string;
  ngayKham: Date;
  ghiChuKetLuanYTe: string;
  daThongBao: boolean;
  noiDungThongBao: string;
}

interface ISelectBoxProps {
  label: string;
  value: string;
}

const mockKetQuaGhiNhan: Iwmstx3k39c_Read[] = [
  {
    maHocSinh: "HS000001",
    hoLot: "Tô Ngọc",
    ten: "Lâm",
    ngaySinh: new Date(),
    gioiTinh: "Nam",
    nhomMau: "D",
    chieuCao: 150,
    canNang: 95,
    BMI: 40,
    thiLuc: "10/10",
    thinhLuc: "10/10",
    timMach: 85,
    hoHap: 120,
    ngayKham: new Date(),
    tienSuBenhLy: "Dị ứng nước",
    ketLuanYTe: "Cần theo dõi",
    ghiChuKetLuanYTe: "Khám da liễu, điều trị phản ứng da với nước",
    daThongBao: false,
    noiDungThongBao: "",
  },
];

const mockLop: ISelectBoxProps[] = [
  {
    label: "11A6",
    value: "1",
  },
  {
    label: "11A7",
    value: "2",
  },
  {
    label: "11A8",
    value: "3",
  },
];

export default function F_wmstx3k39c_Read() {
  //===initiate===

  //===pseudo code===
  const ketQuaGhiNhanQuery = useQuery<Iwmstx3k39c_Read[]>({
    queryKey: ["Fwmstx3k39c_ReadKetQuaGhiNhan"],
    queryFn: async () => mockKetQuaGhiNhan,
  });

  const lopQuery = useQuery<ISelectBoxProps[]>({
    queryKey: ["Fwmstx3k39c_ReadDSLop"],
    queryFn: async () => mockLop,
  });

  //===function===
  const exportConfig = {
    fields: [
      { fieldName: "maHocSinh", header: "Mã học sinh" },
      { fieldName: "hoLot", header: "Họ lót" },
      { fieldName: "ten", header: "Tên" },
      { fieldName: "ngaySinh", header: "Ngày sinh" },
      { fieldName: "gioiTinh", header: "Giới tính" },
      { fieldName: "nhomMau", header: "Nhóm máu" },
      { fieldName: "chieuCao", header: "Chiều cao" },
      { fieldName: "canNang", header: "Cân nặng" },
      { fieldName: "BMI", header: "BMI" },
      { fieldName: "thiLuc", header: "Thị lực" },
      { fieldName: "thinhLuc", header: "Thính lực" },
      { fieldName: "timMach", header: "Tim mạch" },
      { fieldName: "hoHap", header: "Hô hấp" },
      { fieldName: "ngayKham", header: "Ngày khám" },
      { fieldName: "tienSuBenhLy", header: "Tiền sử bệnh lý" },
      { fieldName: "ketLuanYTe", header: "Kết luận y tế" },
      { fieldName: "ghiChuKetLuanYTe", header: "Ghi chú kết luận y tế" },
      { fieldName: "daThongBao", header: "Đã thông báo" },
      { fieldName: "noiDungThongBao", header: "Nội dung thông báo" },
    ],
  };

  //===component===
  const ketQuaGhiNhanColumns = useMemo<MRT_ColumnDef<Iwmstx3k39c_Read>[]>(
    () => [
      { accessorKey: "maHocSinh", header: "Mã học sinh" },
      { accessorKey: "hoLot", header: "Họ lót" },
      { accessorKey: "ten", header: "Tên" },
      {
        accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngaySinh!)),
        header: "Ngày sinh",
      },
      { accessorKey: "gioiTinh", header: "Giới tính" },
      { accessorKey: "nhomMau", header: "Nhóm máu" },
      { accessorKey: "chieuCao", header: "Chiều cao" },
      { accessorKey: "canNang", header: "Cân nặng" },
      { accessorKey: "BMI", header: "BMI" },
      { accessorKey: "thiLuc", header: "Thị lực" },
      { accessorKey: "thinhLuc", header: "Thính lực" },
      { accessorKey: "timMach", header: "Tim mạch" },
      { accessorKey: "hoHap", header: "Hô hấp" },
      { accessorFn: (row) => utils_date_dateToDDMMYYYString(row.ngayKham), header: "Ngày khám" },
      { accessorKey: "tienSuBenhLy", header: "Tiền sử bệnh lý" },
      { accessorKey: "ketLuanYTe", header: "Kết luận y tế" },
      { accessorKey: "ghiChuKetLuanYTe", header: "Ghi chú kết luận y tế" },
      {
        accessorFn: (row) => (<MyCheckbox checked={row.daThongBao} onChange={() => { }} />),
        header: "Đã thông báo",
      },
      { accessorKey: "noiDungThongBao", header: "Nội dung thông báo" },
      {
        accessorFn: (row) => ( <MyCenterFull> <F_wmstx3k39c_ReadNotifi /> </MyCenterFull> ),
        header: "Xem thông báo",
      },
      {
        accessorFn: (row) => (
          <MyCenterFull>
            <F_wmstx3k39c_NotifiDetails
              data={{
                maHocSinh: row.maHocSinh,
                hoTen: row.hoLot.concat(` ${row.ten}`),
              }}
              tenLop="11A6"
            />
          </MyCenterFull>
        ),
        header: "Gửi thông báo",
      },
    ],
    []
  );

  //===query stage condition===
  if (ketQuaGhiNhanQuery.isLoading) {
    return "Đang tải dữ liệu...";
  }

  if (ketQuaGhiNhanQuery.isError) {
    return "Lỗi Tải dữ liệu!";
  }

  return (
    <>
      <Group>
        <MySelect
          pb={20}
          pl={20}
          data={lopQuery.data!}
          label="Chọn lớp"
          defaultValue={"1"}
        />
      </Group>
      <MyFieldset title="Danh sách ghi nhận kết quả khám">
        <MyDataTable
          enableRowSelection={true}
          columns={ketQuaGhiNhanColumns}
          data={ketQuaGhiNhanQuery.data!}
          renderTopToolbarCustomActions={() => (
            <>
              <AQButtonExportData
                data={ketQuaGhiNhanQuery.data!}
                exportConfig={exportConfig}
                objectName="danhSachGhiNhanKetQuaKham"
              />
            </>
          )}
        />
      </MyFieldset>
    </>
  );
}
