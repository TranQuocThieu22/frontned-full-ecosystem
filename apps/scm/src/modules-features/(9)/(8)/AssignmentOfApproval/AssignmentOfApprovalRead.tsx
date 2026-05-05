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
import AssignmentOfApprovalButtonModal from "./AssignmentOfApprovalButtonModal";
import { mockData } from "./mockData";
export interface IAssignmentOfApprovalReadInfoViewModel {
  maCtTraoDoi?: string; // ID of the exchange program
  tenCtTraoDoi?: string; // Name of the exchange program
  doiTacChinh?: string; // Main partner
  loaiDoiTuong?: string; // Type of participant
  chieu?: string; // Direction
  hanNopHoSo?: string; // Application deadline
  ngayCongBo?: string; // Announcement date
  trangThaiCt?: string; // Status of the program
  soSuatToiDa?: number; // Maximum number of participants
  kinhPhiHt?: number; // Budget
  loaiXetDuyet?: string; // Type of approval
}

export default function AssignmentOfApprovalRead() {
  const query = useQuery<IAssignmentOfApprovalReadInfoViewModel[]>({
    queryKey: ['AssignmentOfApprovalRead'],
    queryFn: async () => mockData
  });

  const columns = useMemo<MRT_ColumnDef<IAssignmentOfApprovalReadInfoViewModel>[]>(
    () => [
      {
        header: "Mã CT trao đổi",
        accessorKey: "maCtTraoDoi",
      },
      {
        header: "Tên CT trao đổi",
        accessorKey: "tenCtTraoDoi",
      },
      {
        header: "Đối tác chính",
        accessorKey: "doiTacChinh",
      },
      {
        header: "Loại đối tượng",
        accessorKey: "loaiDoiTuong",
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
        Cell: ({ cell }) => <>{cell.getValue<number>()}</>,
      },
      {
        header: "Kinh phí HT (VND)",
        accessorKey: "kinhPhiHt",
        Cell: ({ cell }) => (
          <MyNumberFormatter value={cell.getValue<number>()} suffix=" ₫" />
        ),
      },
      {
        header: "Loại xét duyệt",
        accessorKey: "loaiXetDuyet",
      },
    ],
    []
  );

  return (
    <MyFieldset title="Danh sách chương trình">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        initialState={{
          columnPinning: {
            right: ["mrt-row-actions"],
          }
        }}
        columns={columns}
        data={query.data || []}
        exportAble
        enableRowSelection={false}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <AssignmentOfApprovalButtonModal />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
