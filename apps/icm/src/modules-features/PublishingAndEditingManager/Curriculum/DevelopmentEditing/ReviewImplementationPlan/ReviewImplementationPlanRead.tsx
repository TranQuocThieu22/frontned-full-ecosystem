'use client'
import { useQuery } from "@tanstack/react-query";
import {
  MyButtonViewPDF,
  MyDataTable,
  MyFieldset,
  MyFlexRow
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
// import ReviewImplementationPlanCreateTab from "./ReviewImplementationPlanCreateTab/ReviewImplementationPlanCreateTab";
// import ReviewImplementationPlanDelete from "./ReviewImplementationPlanDelete";
// import ReviewImplementationPlanUpdateTab from "./ReviewImplementationPlanUpdateTab/ReviewImplementationPlanUpdateTab";
import { mockData } from "./mockData";
import ReviewImplementationPlanButtonDuyet from "./ReviewImplementationPlanButtonDuyet";
import ImplementationPlanningButtonXemChiTiet from "./ReviewImplementationPlanXemChiTiet";
export interface IReviewImplementationPlanInfoViewModel {
  maKeHoach?: string; // Mã Kế hoạch
  maBanBienSoan?: string; // Mã Ban Biên soạn
  maDeXuat?: string; // Mã Đề xuất
  tenGiaoTrinhDeXuat?: string; // Tên Giáo trình Đề xuất
  ngayLapKeHoach?: string; // Ngày Lập Kế hoạch
  ngayBatDauDuKien?: string; // Ngày Bắt đầu dự kiến
  ngayKetThucDuKien?: string; // Ngày Kết thúc dự kiến
  nguoiLapKeHoach?: string; // Người Lập Kế hoạch
  trangThaiDuyetKeHoach?: string; // Trạng thái duyệt Kế hoạch
  fileDinhKemKeHoach?: string; //File đính kèm kế hoạch
}

export default function ReviewImplementationPlanRead() {
  const query = useQuery<IReviewImplementationPlanInfoViewModel[]>({
    queryKey: ['ReviewImplementationPlanRead'],
    queryFn: async () => mockData
  });

  const columns = useMemo<MRT_ColumnDef<IReviewImplementationPlanInfoViewModel>[]>(
    () => [
      {
        header: "Mã Kế hoạch",
        accessorKey: "maKeHoach",
      },
      {
        header: "Mã Ban Biên soạn",
        accessorKey: "maBanBienSoan",
      },
      {
        header: "Mã Đề xuất",
        accessorKey: "maDeXuat",
      },
      {
        header: "Tên Giáo trình Đề xuất",
        accessorKey: "tenGiaoTrinhDeXuat",
      },
      {
        header: "Ngày Lập Kế hoạch",
        accessorKey: "ngayLapKeHoach",
        Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
      },
      {
        header: "Ngày Bắt đầu dự kiến",
        accessorKey: "ngayBatDauDuKien",
        Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
      },
      {
        header: "Ngày Kết thúc dự kiến",
        accessorKey: "ngayKetThucDuKien",
        Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
      },
      {
        header: "Người Lập Kế hoạch",
        accessorKey: "nguoiLapKeHoach",
      },
      {
        header: "Trạng thái duyệt Kế hoạch",
        accessorKey: "trangThaiDuyetKeHoach",
      },
      {
        header: "File đính kèm kế hoạch",
        accessorKey: "fileDinhKemKeHoach",
        Cell: ({ cell }) => <MyButtonViewPDF />
      },
    ],
    []
  );

  return (
    <MyFieldset title="Danh sách kế hoạch">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        exportAble
        enableRowSelection={false}
        renderRowActions={({ row }) => (
          <MyFlexRow>
            <ImplementationPlanningButtonXemChiTiet values={row.original} />
            <ReviewImplementationPlanButtonDuyet values={row.original} />
          </MyFlexRow>
        )}
      />
    </MyFieldset>
  );
}
