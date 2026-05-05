'use client'
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyButtonModal,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
  MySelect
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { mockDataButtonModal, mockDataPhuTrach } from "./mockData";

export interface IAssignmentOfApprovalButtonModalInfoViewModel {
  maBuocXetDuyet?: string; // Step code
  maLoaiXetDuyet?: string; // Review type code
  thuTu?: number; // Order
  tenBuocXetDuyet?: string; // Step name
  donViPhuTrach?: string; // Responsible unit
  loaiTieuChi?: string; // Criteria type
  thangDiemToiDa?: number | string; // Maximum score
  ghiChu?: string; // Note
  trangThaiHoSo?: string; // File status
  phuTrach?: string; // In charge
}

export default function AssignmentOfApprovalButtonModal() {
  const disc = useDisclosure();
  const query = useQuery<IAssignmentOfApprovalButtonModalInfoViewModel[]>({
    queryKey: ['AssignmentOfApprovalButtonModal'],
    queryFn: async () => mockDataButtonModal,
  });


  const columns = useMemo<MRT_ColumnDef<IAssignmentOfApprovalButtonModalInfoViewModel>[]>(
    () => [
      {
        header: "Mã bước xét duyệt",
        accessorKey: "maBuocXetDuyet",
      },
      {
        header: "Mã loại xét duyệt",
        accessorKey: "maLoaiXetDuyet",
      },
      {
        header: "Thứ tự",
        accessorKey: "thuTu",
        Cell: ({ cell }) => <>{cell.getValue<number>()}</>,
      },
      {
        header: "Tên bước xét duyệt",
        accessorKey: "tenBuocXetDuyet",
      },
      {
        header: "Đơn vị phụ trách",
        accessorKey: "donViPhuTrach",
      },
      {
        header: "Loại tiêu chí",
        accessorKey: "loaiTieuChi",
      },
      {
        header: "Thang điểm tối đa",
        accessorKey: "thangDiemToiDa",
        Cell: ({ cell }) => <>{cell.getValue<string | number>()}</>,
      },
      {
        header: "Ghi chú",
        accessorKey: "ghiChu",
      },
      {
        header: "Trạng thái hồ sơ",
        accessorKey: "trangThaiHoSo",
      },
      {
        header: "Phụ trách",
        accessorKey: "phuTrach",
        Cell: ({ cell }) => <MySelect searchable data={mockDataPhuTrach} defaultValue={cell.getValue<string>()} />
      },
    ],
    []
  );


  return (
    <MyButtonModal label="Phân công" variant="transparent" color="blue" modalSize={"90%"} disclosure={disc}>
      <MyFieldset title="Danh sách theo dõi đăng ký bảo hộ">
        <MyDataTable
          isError={query.isError}
          isLoading={query.isLoading}
          initialState={{
            columnPinning: {
              right: ["phuTrach"],
            }
          }}
          columns={columns}
          data={query.data || []}
          enableRowSelection
          renderTopToolbarCustomActions={() => (
            <MyCenterFull>
              <MyButton crudType="save">Lưu</MyButton>
              <MyButton crudType="export">Export</MyButton>
              <MyButton crudType="delete">Xóa</MyButton>
            </MyCenterFull>
          )}
        />
      </MyFieldset>
    </MyButtonModal>
  );
}
