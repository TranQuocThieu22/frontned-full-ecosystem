"use client";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_7rjnpw6ik7_Detail from "./F_7rjnpw6ik7_Detail";

interface I_7rjnpw6ik7 {
  id?: number;
  luot?: string; // Lượt
  maTuyen?: string; // Mã tuyến
  tenTuyen?: string; // tên tuyến
  soHanhKhach?: number; //Số hành khách
  lenXe?: number; //Lên xe
  xuongXe?: number; //Xuống xe
  nguoiCapNhat?: string;
  ngayCapNhat?: Date | undefined;
}

export default function F_7rjnpw6ik7_Read() {
  const checkUpDownCarQuery = useQuery<I_7rjnpw6ik7[]>({
    queryKey: [`checkUpDownCarQuery`],
    queryFn: async () => [
      {
        id: 1,
        luot: "Đón",
        maTuyen: "TTD",
        tenTuyen: "Thủ Đức - Quận 2 - Quận 9",
        soHanhKhach: 32,
        lenXe: 26,
        xuongXe: 22,
        nguoiCapNhat: "Quản trị viên",
        ngayCapNhat: new Date("2024-12-23"),
      },
    ],
  });

  const columns = useMemo<MRT_ColumnDef<I_7rjnpw6ik7>[]>(
    () => [
      {
        header: "Lượt",
        accessorKey: "luot",
      },
      {
        header: "Mã tuyến",
        accessorKey: "maTuyen",
      },
      {
        header: "Tên tuyến",
        accessorKey: "tenTuyen",
      },
      {
        header: "Số hành khách",
        accessorKey: "soHanhKhach",
      },
      {
        header: "Lên xe",
        accessorKey: "lenXe",
      },
      {
        header: "Xuống xe",
        accessorKey: "xuongXe",
      },

      {
        header: "Chi tiết",
        accessorKey: "xemThongBao",
        accessorFn: (row) => {
          return (
            <MyCenterFull>
              <F_7rjnpw6ik7_Detail id={row.id} />
            </MyCenterFull>
          );
        },
      },

      {
        header: "Người cập nhật",
        accessorKey: "nguoiCapNhat",
      },
      {
        header: "Ngày cập nhật",
        accessorKey: "ngayCapNhat",
        accessorFn(originalRow) {
          return utils_date_dateToDDMMYYYString(
            new Date(originalRow.ngayCapNhat!)
          );
        },
      },
    ],
    []
  );

const exportConfig = {
    fields: [
        { header: "Lượt", fieldName: "luot" },
        { header: "Mã tuyến", fieldName: "maTuyen" },
        { header: "Tên tuyến", fieldName: "tenTuyen" },
        { header: "Số hành khách", fieldName: "soHanhKhach" },
        { header: "Lên xe", fieldName: "lenXe" },
        { header: "Xuống xe", fieldName: "xuongXe" },
        { header: "Người cập nhật", fieldName: "nguoiCapNhat" },
        { header: "Ngày cập nhật", fieldName: "ngayCapNhat" },
    ],
};

  if (checkUpDownCarQuery.isLoading) return "Đang tải dữ liệu...";
  if (checkUpDownCarQuery.isError) return "Không có dữ liệu...";

  return (
    <>
      <Group mb={20} ml={20}>
        <MyDateInput label="Ngày" defaultValue={new Date()}></MyDateInput>
      </Group>
      <MyFieldset title="Danh sách tuyến xe đưa đón học sinh">
        <MyDataTable
          enableRowSelection={true}
          columns={columns}
          data={checkUpDownCarQuery.data!}
          renderTopToolbarCustomActions={({ table }) => (
            <Group>
              <AQButtonExportData
                data={checkUpDownCarQuery.data!}
                exportConfig={exportConfig}
                objectName="DanhSachTuyenXeDuaDoanHocSinh"
              />
            </Group>
          )}
        />
      </MyFieldset>
    </>
  );
}
