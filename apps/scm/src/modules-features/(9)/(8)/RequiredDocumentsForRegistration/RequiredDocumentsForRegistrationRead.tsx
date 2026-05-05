'use client'
import { useQuery } from "@tanstack/react-query";
import {
  MyCenterFull,
  MyDataTable,
  MyFieldset,
  MyNumberFormatter
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ButtonModalProfileConfiguration from "./ButtonModalProfileConfiguration/ButtonModalProfileConfiguration";
import { mockDataRead } from "./mockData";
export interface IRequiredDocumentsForRegistrationReadInfoViewModel {
  maCtTraoDoi?: string; // Code of Exchange Program
  tenCtTraoDoi?: string; // Name of Exchange Program
  doiTacChinh?: string; // Main Partner
  lopDoiTuong?: string; // Target Group
  chieu?: string; // Direction
  hanNopHoSo?: string; // Application Deadline
  ngayCongBo?: string; // Announcement Date
  trangThaiCt?: string; // Program Status
  soSuatToiDa?: number; // Maximum Quota
  kinhPhiHt?: number; // Budget
}
export default function RequiredDocumentsForRegistrationRead() {
  const query = useQuery<IRequiredDocumentsForRegistrationReadInfoViewModel[]>({
    queryKey: ['RequiredDocumentsForRegistrationRead'],
    queryFn: async () => mockDataRead
  });


  const columns = useMemo<MRT_ColumnDef<IRequiredDocumentsForRegistrationReadInfoViewModel>[]>(
    () => [
      {
        header: "Mã CT trao Đổi",
        accessorKey: "maCtTraoDoi",
      },
      {
        header: "Tên CT trao Đổi",
        accessorKey: "tenCtTraoDoi",
      },
      {
        header: "Đối tác chính",
        accessorKey: "doiTacChinh",
      },
      {
        header: "Loại đối tượng",
        accessorKey: "lopDoiTuong",
      },
      {
        header: "Chiều",
        accessorKey: "chieu",
      },
      {
        header: "Hạn nộp hồ sơ",
        accessorKey: "hanNopHoSo",
        Cell: ({ cell }) =>
          utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
      },
      {
        header: "Ngày công bố",
        accessorKey: "ngayCongBo",
        Cell: ({ cell }) =>
          utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>())),
      },
      {
        header: "Trạng thái CT",
        accessorKey: "trangThaiCt",
      },
      {
        header: "Số suất tối đa",
        accessorKey: "soSuatToiDa",
      },
      {
        header: "Kinh phí HT (VND)",
        accessorKey: "kinhPhiHt",
        Cell: ({ cell }) => (
          <MyNumberFormatter value={cell.getValue<number>()} suffix=" ₫" />
        ),
      },
    ],
    []
  );


  return (
    <MyFieldset title="Danh sách chương trình">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        exportAble
        enableRowSelection={false}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <ButtonModalProfileConfiguration />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
