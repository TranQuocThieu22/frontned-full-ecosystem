'use client'
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyButtonModal,
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { mockDataButtonThaoTac } from "../mockData";
import F9_8_8CreateMonitorExchange from "./F9_8_8CreateMonitorExchange";
import F9_8_8DeleteMonitorExchange from "./F9_8_8DeleteMonitorExchange";
import F9_8_8UpdateMonitorExchange from "./F9_8_8UpdateMonitorExchange";
export interface IButtonThaoTacInfoViewModel {
  maLuotTraoDoi?: string; //Exchange Code
  ngayLienLac?: string; //Contact Date
  noiDungLienLac?: string; //Contact Content
  nguoiLienLac?: string; //Contact Person
  ghiChu?: string; //Note
  nguoiDung?: string; //User
}

export default function F9_8_8ButtonThaoTacMonitorExchange() {
  const disc = useDisclosure()
  const query = useQuery<IButtonThaoTacInfoViewModel[]>({
    queryKey: ['F9_8_8MonitorExchange'],
    queryFn: async () => mockDataButtonThaoTac
  });
  const columns = useMemo<MRT_ColumnDef<IButtonThaoTacInfoViewModel>[]>(
    () => [
      {
        header: "Mã lượt trao đổi",
        accessorKey: "maLuotTraoDoi",
      },
      {
        header: "Ngày liên lạc",
        accessorKey: "ngayLienLac",
        Cell: ({ cell }) =>
          utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
      },
      {
        header: "Nội dung liên lạc/Sự cố",
        accessorKey: "noiDungLienLac",
      },
      {
        header: "Người liên lạc/Xử lý",
        accessorKey: "nguoiLienLac",
      },
      {
        header: "Ghi chú",
        accessorKey: "ghiChu",
      },
    ],
    []
  );

  return (
    <MyButtonModal variant="transparent" color="blue" modalSize={"90%"} disclosure={disc} label="Nhật ký" >
      <MyFieldset title="Danh sách nhật ký trao đổi">
        <MyDataTable
          enableRowSelection
          isError={query.isError}
          isLoading={query.isLoading}
          columns={columns}
          data={query.data || []}
          renderTopToolbarCustomActions={() => (
            <MyCenterFull>
              <F9_8_8CreateMonitorExchange />
              <MyButton crudType="import">Import</MyButton>
              <MyButton crudType="export">Export</MyButton>
              <MyButton crudType="delete">Xóa</MyButton>
            </MyCenterFull>
          )}
          renderRowActions={({ row }) => (
            <MyCenterFull>
              <F9_8_8UpdateMonitorExchange values={row.original} />
              <F9_8_8DeleteMonitorExchange id={row.getValue("maLuotTraoDoi")} />
            </MyCenterFull>
          )}
        />
      </MyFieldset>
    </MyButtonModal>
  );
}
