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
import { mockData } from "./mockData";
import SetUpPeriodicSurveyScenarioCreate from "./SetUpPeriodicSurveyScenarioCreate/SetUpPeriodicSurveyScenarioCreate";
import SetUpPeriodicSurveyScenarioDelete from "./SetUpPeriodicSurveyScenarioDelete";
import SetUpPeriodicSurveyScenarioUpdate from "./SetUpPeriodicSurveyScenarioUpdate/SetUpPeriodicSurveyScenarioUpdate";
export interface ISetUpPeriodicSurveyScenarioInfoViewModel {
  maKichBan?: string; // Mô Kịch bản
  tenKichBan?: string; // Tên Kịch bản
  moTaKichBan?: string; // Mô tả Kịch bản
  loaiChuKyLapLai?: string; // Loại Chu kỳ Lặp lại
  chiTietChuKy?: string; // Chi tiết Chu kỳ
  soLuongMauPhieu?: number; // Số lượng Mẫu Phiếu
}

export default function SetUpPeriodicSurveyScenarioRead() {
  const query = useQuery<ISetUpPeriodicSurveyScenarioInfoViewModel[]>({
    queryKey: ["SetUpPeriodicSurveyScenarioRead"],
    queryFn: async () => mockData,
  });

  const columns = useMemo<
    MRT_ColumnDef<ISetUpPeriodicSurveyScenarioInfoViewModel>[]
  >(
    () => [
      {
        header: "Mã kịch bản",
        accessorKey: "maKichBan",
      },
      {
        header: "Tên kịch bản",
        accessorKey: "tenKichBan",
      },
      {
        header: "Mô tả kịch bản",
        accessorKey: "moTaKichBan",
      },
      {
        header: "Loại chu kỳ lặp lại",
        accessorKey: "loaiChuKyLapLai",
      },
      {
        header: "Chi tiết chu kỳ",
        accessorKey: "chiTietChuKy",
      },
      {
        header: "Số lượng mẫu phiếu",
        accessorKey: "soLuongMauPhieu",
      },
    ],
    []
  );

  return (
    <MyFieldset title="Danh sách kịch bản">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        renderTopToolbarCustomActions={() => (
          <MyCenterFull>
            <SetUpPeriodicSurveyScenarioCreate />
            <MyButton crudType="import">Import</MyButton>
            <MyButton crudType="export">Export</MyButton>
            <MyButton crudType="delete">Delete</MyButton>
          </MyCenterFull>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <SetUpPeriodicSurveyScenarioUpdate values={row.original} />
            <SetUpPeriodicSurveyScenarioDelete id={row.original.maKichBan!} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
