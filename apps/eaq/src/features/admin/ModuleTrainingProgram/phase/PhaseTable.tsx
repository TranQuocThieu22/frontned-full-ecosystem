"use client";
import PhaseDeleteListButton from '@/features/admin/ModuleTrainingProgram/phase/PhaseDeleteListButton';
import PhaseExportButton from '@/features/admin/ModuleTrainingProgram/phase/PhaseExportButton';
import { IPhase } from '@/shared/interfaces/Phase/IPhase';
import { service_EAQPhase } from "@/shared/APIs/service_EAQPhase";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import PhaseCreateUpdateModal from "./PhaseCreateUpdateModal";
import PhaseDeleteButton from "./PhaseDeleteButton";
import PhaseImportButton from "./PhaseImportButton";
import { PhaseStatusBadge, PhaseStatusEnum } from "./PhaseStatusBadge";
import RoadmapsTable from "./Roadmap/RoadmapsTable";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomThemeIconSquareCheck } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomThemeIconSquareCheck";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export const phaseStatusOptions = [
  {
    value: PhaseStatusEnum.InProgress.toString(),
    label: "Đang thực hiện",
  },
  {
    value: PhaseStatusEnum.Completed.toString(),
    label: "Đã hoàn thành",
  },
  {
    value: PhaseStatusEnum.NotStarted.toString(),
    label: "Chưa bắt đầu",
  },
  { value: PhaseStatusEnum.Cancelled.toString(), label: "Đã hủy" },
];

export default function PhaseTable() {
  const cols = ["EAQStandardSetTrainingProgram", "EAQRoadmaps", "isCurrent"];

  const phaseQuery = useCustomReactQuery({
    queryKey: ["PhaseTable", "getAll"],
    axiosFn: async () =>
      service_EAQPhase.getAll({
        cols: cols,
      }),

  });


  const columns = useMemo<MRT_ColumnDef<IPhase>[]>(
    () => [
      {
        header: "Mã chương trình đào tạo",
        accessorKey: "eaqTrainingProgram.code",
        accessorFn(row) {
          return row.eaqStandardSetTrainingProgram?.code || "";
        },
      },
      {
        header: "Tên chương trình đào tạo",
        accessorKey: "eaqTrainingProgram.name",
        accessorFn(row) {
          return row.eaqStandardSetTrainingProgram?.name || "";
        },
        size: 500,
      },
      { accessorKey: "code", header: "Mã giai đoạn Kiểm định" },
      { accessorKey: "name", header: "Tên giai đoạn Kiểm định", size: 400 },
      {
        accessorKey: "startDate",
        header: "Ngày bắt đầu",
        accessorFn: (row) => {
          return row.startDate
            ? dateUtils.toDDMMYYYY(new Date(row.startDate))
            : "";
        },
      },
      {
        accessorKey: "endDate",
        header: "Ngày kết thúc",
        accessorFn: (row) => {
          return row.endDate
            ? dateUtils.toDDMMYYYY(new Date(row.endDate))
            : "";
        },
      },
      {
        accessorKey: "isCurrent",
        header: "Hiện hành",
        Cell: ({ row }) => (
          <CustomCenterFull>
            <CustomThemeIconSquareCheck checked={!!row.original.isCurrent} />
          </CustomCenterFull>
        ),
      },
      {
        accessorKey: "phaseStatus",
        header: "Trạng thái",
        accessorFn: (row) => {
          return <PhaseStatusBadge status={row.phaseStatus ?? -1} />;
        },
      },
      {
        header: "Lộ trình thực hiện",
        accessorFn: (row) => (
          <CustomCenterFull>
            <RoadmapsTable
              phase={row}
              phaseStartDate={row.startDate || ""}
              phaseEndDate={row.endDate || ""}
            />
          </CustomCenterFull>
        ),
      },

    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách giai đoạn kiểm định">
      <CustomDataTable
        isLoading={phaseQuery.isLoading}
        isError={phaseQuery.isError}
        enableRowSelection
        columns={columns}
        data={phaseQuery.data || []}
        renderTopToolbarCustomActions={({ table }) => {
          // Get selected rows from table of destructured object
          const selectedRows =
            table.getSelectedRowModel().flatRows.map((item) => item.original) ||
            [];

          return (
            <Group>
              <PhaseCreateUpdateModal />
              <PhaseImportButton />
              <PhaseExportButton table={table} />
              <PhaseDeleteListButton
                values={selectedRows}
                resetRowSelection={table.resetRowSelection}
              />
            </Group>
          );
        }}
        renderRowActions={({ row, table }) => {
          const isHavingOtherCurrent = table
            .getRowModel()
            .flatRows.some(
              (item) =>
                item.original.isCurrent &&
                item.original.id != row.original.id &&
                item.original.eaqTrainingProgram?.id ==
                row.original.eaqTrainingProgram?.id
            );

          return (
            <CustomCenterFull>
              <PhaseCreateUpdateModal
                values={row.original}
                isHavingOtherCurrent={isHavingOtherCurrent || false}
              />
              <PhaseDeleteButton
                code={row.original.code ?? ""}
                id={row.original.id || -1}
                resetRowSelection={table.resetRowSelection}
              />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
