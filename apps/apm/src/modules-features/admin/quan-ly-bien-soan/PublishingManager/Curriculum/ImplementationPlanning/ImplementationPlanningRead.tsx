'use client'
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyButtonViewPDF,
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ImplementationPlanningCreateTab from "./ImplementationPlanningCreateTab/ImplementationPlanningCreateTab";
import ImplementationPlanningDelete from "./ImplementationPlanningDelete";
import ImplementationPlanningUpdateTab from "./ImplementationPlanningUpdateTab/ImplementationPlanningUpdateTab";
import { mockData } from "./mockData";
export interface IImplementationPlanningInfoViewModel {
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

export default function ImplementationPlanningRead() {
  const query = useQuery<IImplementationPlanningInfoViewModel[]>({
    queryKey: ['ImplementationPlanningRead'],
    queryFn: async () => mockData
  });

  const columns = useMemo<MRT_ColumnDef<IImplementationPlanningInfoViewModel>[]>(
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
        renderTopToolbarCustomActions={() => (
          <MyCenterFull>
            <ImplementationPlanningCreateTab />
            <MyButton crudType="import">Import</MyButton>
            <MyButton crudType="export">Export</MyButton>
            <MyButton crudType="delete">Delete</MyButton>
          </MyCenterFull>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <ImplementationPlanningUpdateTab values={row.original} />
            <ImplementationPlanningDelete id={row.original.maBanBienSoan!}/>
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
