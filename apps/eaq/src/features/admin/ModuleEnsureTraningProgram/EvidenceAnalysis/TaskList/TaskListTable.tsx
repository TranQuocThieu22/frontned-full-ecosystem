import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import TaskCreateOrUpdateButton from "./TaskCreateOrUpdateButton";
import TaskDeleteButton from "./TaskDeleteButton";
import TaskDeleteListButton from "./TaskDeleteListButton";
import TaskExportButton from "./TaskExportButton";
import TaskImportButton from "./TaskImportButton";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function TaskListTable() {
  const filterStore = useS_Shared_Filter();

  const taskDetailQuery = useCustomReactQuery({
    queryKey: ["taskDetailQuery_TaskListTable", filterStore.state.Phase?.id],
    axiosFn: async () =>
      service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id!,
        analysisType: analysisTypeEnum.Requirement,
      }),
  });

  const columns = useMemo<CustomColumnDef<ITaskDetailAnalysis>[]>(
    () => [
      {
        header: "Mã tiêu chuẩn",
        accessorKey: "eaqAnalysis.eaqRequirement.eaqCriteria.eaqStandard.code",
      },
      {
        header: "Mã tiêu chí",
        accessorKey: "eaqAnalysis.eaqRequirement.eaqCriteria.code",
      },
      { header: "Mã yêu cầu", accessorKey: "eaqAnalysis.eaqRequirement.code" },
      {
        header: "Tên yêu cầu",
        accessorKey: "eaqAnalysis.eaqRequirement.name",
        size: columnSizeObject.name,
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
    ],
    []
  );
  return (
    <CustomFieldset title="Danh sách công việc cần thực hiện">
      <CustomDataTable
        columns={columns}
        isLoading={taskDetailQuery.isLoading}
        isError={taskDetailQuery.isError}
        data={taskDetailQuery?.data || []}
        enableRowSelection
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <TaskCreateOrUpdateButton />
              <TaskImportButton />
              <TaskExportButton table={table} loading={taskDetailQuery.isLoading} />
              <TaskDeleteListButton table={table} />
            </>
          );
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <TaskCreateOrUpdateButton data={row.original} />
              <TaskDeleteButton data={row.original} />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
