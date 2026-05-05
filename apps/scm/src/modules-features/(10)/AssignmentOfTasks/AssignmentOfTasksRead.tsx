'use client'
import { useQuery } from "@tanstack/react-query";
import {
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import AssignmentOfTasksButtonPhanCong from "./AssignmentOfTasksButtonPhanCong";
import { mockData } from "./mockData";
export interface IAssignmentOfTasksReadInfoViewModel {
  maIp?: string; // IP Code
  tenIp?: string; // IP Name
  buocHienTai?: string; // Current Step
  ngayHoanThanhBuoc?: string; // Step Completion Date
  thoiHanTiepTheo?: string; // Next Deadline
  trangThaiHoSoChiTiet?: string; // Detailed File Status
  canBoPhuTrach?: string; // Officer in Charge
  ghiChu?: string; // Note
}

export default function AssignmentOfTasksRead() {
  const query = useQuery<IAssignmentOfTasksReadInfoViewModel[]>({
    queryKey: ['AssignmentOfTasksRead'],
    queryFn: async () => mockData
  });

  const columns = useMemo<MRT_ColumnDef<IAssignmentOfTasksReadInfoViewModel>[]>(
    () => [
      {
        header: "Mã IP",
        accessorKey: "maIp",
      },
      {
        header: "Tên IP",
        accessorKey: "tenIp",
      },
      {
        header: "Bước hiện tại",
        accessorKey: "buocHienTai",
      },
      {
        header: "Ngày hoàn thành bước",
        accessorKey: "ngayHoanThanhBuoc",
      },
      {
        header: "Thời hạn tiếp theo",
        accessorKey: "thoiHanTiepTheo",
      },
      {
        header: "Trạng thái hồ sơ chi tiết",
        accessorKey: "trangThaiHoSoChiTiet",
      },
      {
        header: "Cán bộ phụ trách",
        accessorKey: "canBoPhuTrach",
      },
      {
        header: "Ghi chú",
        accessorKey: "ghiChu",
      },
    ],
    []
  );

  return (
    <MyFieldset title="Danh sách theo dõi đăng ký bảo hộ">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        exportAble
        enableRowSelection={false}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <AssignmentOfTasksButtonPhanCong />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
