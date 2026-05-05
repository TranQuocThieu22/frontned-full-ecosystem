import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { Stack } from "@mantine/core";
import { useMemo } from "react";
import SyntheticExport from "./SyntheticExport";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";

export default function SyntheticTable() {
  const filterStore = useS_Shared_Filter();

  const TaskDetailAnalysesQuery = useCustomReactQuery({
    queryKey: ["TaskDetailAnalyses", filterStore.state.Phase?.id],
    axiosFn: () =>
      service_EAQAnalysis.getTaskDetailAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id!,
        analysisType: analysisTypeEnum.Requirement,
      }),
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const columns = useMemo<CustomColumnDef<ITaskDetail>[]>(
    () => [
      {
        header: "Mã tiêu chuẩn",
        accessorKey: "eaqAnalysis.eaqRequirement.eaqCriteria.eaqStandard.code",
      },
      {
        header: "Mã tiêu chí",
        accessorKey: "eaqAnalysis.eaqRequirement.eaqCriteria.code",
      },
      {
        header: "Mã yêu cầu",
        accessorKey: "eaqAnalysis.eaqRequirement.code",
      },
      {
        header: "Tên yêu cầu",
        accessorKey: "eaqAnalysis.eaqRequirement.name",
        size: columnSizeObject.name,
      },
      { header: "Mã phân tích", accessorKey: "eaqAnalysis.code" },
      {
        header: "Nội dung phân tích",
        accessorKey: "eaqAnalysis.description",
        size: columnSizeObject.description,
      },
      {
        header: "Câu hỏi phân tích",
        accessorKey: "eaqAnalysis.question",
        accessorFn: (row) => {
          const questions = row?.eaqAnalysis?.question?.split("\n") || [];
          return (
            <Stack gap={2}>
              {questions.map((question, index) => (
                <p key={index}>{question}</p>
              ))}
            </Stack>
          );
        },
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
        header: "Mã minh chứng dự kiến",
        accessorFn: (row) => row.eaqTaskDetailEvidences?.map((item) => item.code),
        type: "list",
      },
      {
        header: "Tên minh chứng",
        accessorFn: (row) => row.eaqTaskDetailEvidences?.map((item) => item.name),
        type: "list",
      },
    ],
    []
  );
  return (
    <CustomFieldset title="Tổng hợp nội dung phân tích">
      <CustomDataTable
        columns={columns}
        data={TaskDetailAnalysesQuery.data || []}
        enableRowSelection
        renderTopToolbarCustomActions={({ table }) => {
          return <SyntheticExport table={table} />;
        }}
      />
    </CustomFieldset>
  );
}
