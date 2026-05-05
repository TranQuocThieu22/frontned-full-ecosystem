"use client";
import { ITrainingProgram } from "@/shared/interfaces/trainingProgram/ITrainingProgram";
import { service_EAQTrainingProgram } from "@/shared/APIs/service_EAQTrainingProgram";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ExportButton from "./ExportButton";
import TrainingProgramListDeleteButton from "./TrainingProgramDeleteButton";
import TrainingProgramListDeleteListButton from "./TrainingProgramDeleteListButton";
import TrainingProgramListCreateOrUpdateButton from "./TrainingProgramListCreateOrUpdateButton";
import TrainingProgramListImport from "./TrainingProgramListImport";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function TrainingProgramListTable() {
  const TrainingProgramsQuery = useCustomReactQuery({
    queryKey: ["TrainingProgramListTable", "getAll"],
    axiosFn: () =>
      service_EAQTrainingProgram.getAll({
        cols: ["Department"],
      }),
  })
  const columns = useMemo<MRT_ColumnDef<ITrainingProgram>[]>(
    () => [
      { header: "Mã CTĐT", accessorKey: "code" },
      { header: "Tên CTĐT", accessorKey: "name", size: 400 },
      {
        header: "Đơn vị quản lý",
        accessorFn: row => row.department?.name || '',
        id: "unitName", size: 300
      },
      { header: "Trình độ đào tạo", accessorKey: "trainingLevel" },
      { header: "Loại đào tạo", accessorKey: "educationMode" },
      {
        header: "Thời gian đào tạo chuẩn",
        accessorKey: "duration",
      },
      { header: "Năm bắt đầu tuyển sinh", accessorKey: "admissionStartYear" },
      { header: "Năm tốt nghiệp khóa đầu", accessorKey: "firstGraduationYear" },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách chương trình đào tạo">
      <CustomDataTable
        initialState={{
          sorting: [{ id: 'code', desc: false }],
        }}
        isLoading={TrainingProgramsQuery.isLoading}
        isError={TrainingProgramsQuery.isError}
        enableRowSelection
        columns={columns}
        data={TrainingProgramsQuery.data || []}
        renderTopToolbarCustomActions={({ table }) => {
          const exportData = table.getSelectedRowModel().flatRows.flatMap((item) => item.original).length > 0 ? table.getSelectedRowModel().flatRows.flatMap((item) => item.original) : TrainingProgramsQuery.data;
          return (
            <Group>
              <TrainingProgramListCreateOrUpdateButton isLoading={TrainingProgramsQuery.isFetching} />
              <TrainingProgramListImport />
              <ExportButton
                data={exportData || []}
                isLoading={TrainingProgramsQuery.isFetching}
              />
              <TrainingProgramListDeleteListButton
                isLoading={TrainingProgramsQuery.isFetching}
                table={table}
              />
            </Group>
          );
        }}
        renderRowActions={({ row, table }) => {
          return (
            <CustomCenterFull>
              <TrainingProgramListCreateOrUpdateButton
                data={row.original}
                isLoading={TrainingProgramsQuery.isFetching}
              />
              <TrainingProgramListDeleteButton
                data={row.original}
                resetRowSelection={table.resetRowSelection}
                isLoading={TrainingProgramsQuery.isFetching}
              />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
