"use client";

import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import AnalysisSummaryExport from "./AnalysisSummaryExport";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function AnalysisSummaryTable() {
  const store = useS_Shared_Filter();

  const analysisQuery = useCustomReactQuery({
    queryKey: ["GetEAQCriteriaFilterByEAQPhase", store.state.Phase?.id],
    axiosFn: () =>
      service_EAQAnalysis.getTaskDetailAnalysesByEAQPhaseId({
        eaqPhaseId: store.state.Phase?.id!,
        analysisType: analysisTypeEnum.Limitation,
      }),
    options: {
      enabled: !!store.state.Phase?.id,
    },
  });

  const columns = useMemo<CustomColumnDef<ITaskDetail>[]>(
    () => [
      {
        header: "Mã tiêu chuẩn",
        accessorKey: "eaqAnalysis.eaqLimitation.eaqCriteria.eaqStandard.code",
      },
      { header: "Mã tiêu chí", accessorKey: "eaqAnalysis.eaqLimitation.eaqCriteria.code" },
      {
        header: "Tên tiêu chí",
        accessorKey: "eaqAnalysis.eaqLimitation.eaqCriteria.name",
        size: 500,
      },
      { header: "Mã hạn chế", accessorKey: "eaqAnalysis.eaqLimitation.code" },
      { header: "Tên hạn chế", accessorKey: "eaqAnalysis.eaqLimitation.name", size: 500 },
      { header: "Mã phân tích", accessorKey: "eaqAnalysis.code" },
      {
        header: "Nội dung phân tích",
        accessorKey: "eaqAnalysis.description",
        size: 500,
      },
      {
        header: "Câu hỏi phân tích",
        accessorKey: "eaqAnalysis.question",
        size: 500,
      },
      { header: "Mã công việc", accessorKey: "code" },
      { header: "Tên công việc", accessorKey: "name", size: 500 },
      {
        header: "Minh chứng dự kiến",
        accessorKey: "eaqTaskDetailEvidences",
        Cell: ({ row }) =>
          row.original.eaqTaskDetailEvidences?.map((item) => `${item.code} - ${item.name}`),
        type: "list",
        size: 500,
      },
      // { header: 'Tên minh chứng', accessorKey: 'evidenceName', size: 500 },
    ],
    []
  );

  return (
    <CustomFieldset title="Tổng hợp nội dung phân tích">
      <CustomDataTable
        columns={columns}
        isLoading={analysisQuery.isLoading}
        isError={analysisQuery.isError}
        data={analysisQuery.data || []}
        enableRowSelection
        enableRowNumbers={false}
        renderTopToolbarCustomActions={({ table }) => (
          <>
            <AnalysisSummaryExport table={table} loading={false} />
          </>
        )}
      />
    </CustomFieldset>
  );
}
