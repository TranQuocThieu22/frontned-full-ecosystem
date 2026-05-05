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
import { mockDataButtonPhanCong, mockDataNguoiPhuTrach } from "./mockData";

export interface IAssignmentOfTasksButtonPhanCongInfoViewModel {
  buocTrongQuyTrinh?: string; // Step in the process
  ngayBatDauBuoc?: string; // Start date of the step yyyy-mm-dd
  ngayKetThucBuoc?: string; // End date of the step yyyy-mm-dd
  moTaGhiChuChiTiet?: string; // Description/Detailed notes
  taiLieuCanThiet?: string; // Required documents
  laiLichSuDung?: string; // History of use
  nguoiPhuTrach?: string; // Person in charge
}

export default function AssignmentOfTasksButtonPhanCong() {
  const disc = useDisclosure();
  const query = useQuery<IAssignmentOfTasksButtonPhanCongInfoViewModel[]>({
    queryKey: ['BaseModalReadEditable'],
    queryFn: async () => mockDataButtonPhanCong,
  });

  const columns = useMemo<MRT_ColumnDef<IAssignmentOfTasksButtonPhanCongInfoViewModel>[]>(
    () => [
      {
        header: "Bước trong quy trình",
        accessorKey: "buocTrongQuyTrinh",
      },
      {
        header: "Ngày bắt đầu bước",
        accessorKey: "ngayBatDauBuoc",
      },
      {
        header: "Ngày kết thúc bước",
        accessorKey: "ngayKetThucBuoc",
      },
      {
        header: "Mô tả/Ghi chú chi tiết",
        accessorKey: "moTaGhiChuChiTiet",
      },
      {
        header: "Tên tài liệu",
        accessorKey: "taiLieuCanThiet",
      },
      {
        header: "Loại tài liệu",
        accessorKey: "laiLichSuDung",
      },
      {
        header: "Cán bộ xử lý",
        accessorKey: "nguoiPhuTrach",
        Cell: ({ cell }) => (
            <MySelect data={mockDataNguoiPhuTrach} defaultValue={cell.getValue<string>()} />
        ),
      },
    ],
    []
  );
  

  return (
    <MyButtonModal title ="Chi tiết loại đề tài" variant="transparent" color="blue" modalSize={"90%"} disclosure={disc} label="Phân công">
      <MyFieldset title="Danh sách theo dõi đăng ký bảo hộ">
        <MyDataTable
          isError={query.isError}
          isLoading={query.isLoading}
          columns={columns}
          data={query.data || []}
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
