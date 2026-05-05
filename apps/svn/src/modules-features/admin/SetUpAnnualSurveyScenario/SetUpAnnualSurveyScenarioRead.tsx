"use client";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SetUpAnnualSurveyScenarioDelete from "./SetUpAnnualSurveyScenarioDelete";
import SetUpAnnualSurveyScenarioUpdate from "./SetUpAnnualSurveyScenarioUpdate/SetUpAnnualSurveyScenarioUpdate";
import SetUpAnnualSurveyScenarioCreate from "./SetUpAnnualSurveyScenarioCreate/SetUpAnnualSurveyScenarioCreate";
import { mockSurveyScenario } from "./mockData";
export interface ISetUpAnnualSurveyScenarioInfoViewModel {
  maKichBanGoc?: string;
  tenKichBanGoc?: string;
  loaiChuKyLapLai?: string;
  thoiDiemTrienKhai?: string;
  ngayBatDauDuKien?: string;
  ngayKetThucDuKien?: string;
  donViPhoiHopGoiY?: string;
  ghiChu?: string;
  namHoc?: string;
}

export default function SetUpAnnualSurveyScenarioRead() {
  const query = useQuery<ISetUpAnnualSurveyScenarioInfoViewModel[]>({
    queryKey: ["SetUpAnnualSurveyScenarioRead"],
    queryFn: async () => mockSurveyScenario,
  });

  const columns = useMemo<
    MRT_ColumnDef<ISetUpAnnualSurveyScenarioInfoViewModel>[]
  >(
    () => [
      {
        header: "Mã Kịch bản Gốc",
        accessorKey: "maKichBanGoc",
      },
      {
        header: "Tên Kịch bản Gốc",
        accessorKey: "tenKichBanGoc",
      },
      {
        header: "Loại Chu kỳ Lặp lại",
        accessorKey: "loaiChuKyLapLai",
      },
      {
        header: "Thời điểm Triển khai",
        accessorKey: "thoiDiemTrienKhai",
      },
      {
        header: "Ngày Bắt đầu Dự kiến",
        accessorKey: "ngayBatDauDuKien",
      },
      {
        header: "Ngày Kết thúc Dự kiến",
        accessorKey: "ngayKetThucDuKien",
      },
      {
        header: "Đơn vị Phối hợp Gợi ý",
        accessorKey: "donViPhoiHopGoiY",
      },
      {
        header: "Ghi chú",
        accessorKey: "ghiChu",
      },
      {
        header: "Năm học",
        accessorKey: "namHoc",
      },
    ],
    []
  );

  return (
    <MyFieldset title="Kế hoạch khảo sát năm">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        enableGrouping
        groupedColumnMode={'remove'}
        initialState={{ grouping: ["namHoc"], expanded: true }}
        renderTopToolbarCustomActions={() => (
          <MyCenterFull>
            <SetUpAnnualSurveyScenarioCreate />
            <MyButton crudType="import">Import</MyButton>
            <MyButton crudType="export">Export</MyButton>
            <MyButton crudType="delete">Delete</MyButton>
          </MyCenterFull>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <SetUpAnnualSurveyScenarioUpdate values={row.original} />
            <SetUpAnnualSurveyScenarioDelete id={row.original.maKichBanGoc!} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
