import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Group } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import TaskDelete from "./TaskDelete";
import TaskDeleteList from "./TaskDeleteList";
import TaskExport from "./TaskExport";
import { TaskFormModal } from "./TaskFormModal";
import TaskImport from "./TaskImport";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";

export default function TaskTable() {
  const filterStore = useS_Shared_Filter();

  const taskDetailsQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id!,
        analysisType: analysisTypeEnum.Limitation,
      }),
    queryKey: ["EAQTaskDetails", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const columns = useMemo<MRT_ColumnDef<ITaskDetailAnalysis>[]>(
    () => [
      {
        header: "Mã tiêu chuẩn",
        accessorFn: (row) => row.eaqAnalysis?.eaqLimitation?.eaqCriteria?.eaqStandard?.code || "",
      },
      {
        header: "Mã tiêu chí",
        accessorFn: (row) => row.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code || "",
      },
      {
        header: "Mã hạn chế",
        accessorFn: (row) => row.eaqAnalysis?.eaqLimitation?.code || "",
      },
      {
        header: "Mã phân tích",
        accessorFn: (row) => row.eaqAnalysis?.code || "",
      },
      {
        header: "Nội dung phân tích",
        accessorFn: (row) => row.eaqAnalysis?.description || "",
        size: columnSizeObject.description,
      },
      {
        header: "Mã công việc",
        accessorKey: "code",
      },
      {
        header: "Tên công việc",
        accessorKey: "name",
        size: columnSizeObject.name,
      },
      {
        header: "Thời gian thực hiện",
        accessorKey: "duration",
      },
      {
        header: "Kết quả dự kiến",
        accessorKey: "expectedResult",
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách công việc cần thực hiện">
      <CustomDataTable
        columns={columns}
        data={taskDetailsQuery.data || []}
        enableRowSelection
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows =
            table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
          return (
            <Group gap="sm">
              <TaskFormModal />
              <TaskImport />
              <TaskExport table={table} loading={taskDetailsQuery.isLoading} />
              <TaskDeleteList data={selectedRows} resetRowSelection={table.resetRowSelection} />
            </Group>
          );
        }}
        renderRowActions={({ row }) => {
          return (
            <Group gap="xs" justify="center" wrap="nowrap">
              <TaskFormModal values={row.original} />
              <TaskDelete id={row.original.id || 0} code={row.original.code || ""} />
            </Group>
          );
        }}
      />
    </CustomFieldset>
  );
}
