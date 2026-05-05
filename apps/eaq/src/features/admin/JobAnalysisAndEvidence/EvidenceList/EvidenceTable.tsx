"use client";

import { EstimatedEvidenceFormModal } from "@/features/admin/JobAnalysisAndEvidence/EvidenceList/EvidenceFormModal";
import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import EvidenceDelete from "./EvidenceDelete";
import EvidenceDeleteList from "./EvidenceDeleteList";
import EvidenceExport from "./EvidenceExport";
import EvidenceImport from "./EvidenceImport";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function EstimatedEvidenceTable() {
  const filterStore = useS_Shared_Filter();

  const evidenceAnalysesQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getTaskDetailEvidenceAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id || 0,
        analysisType: analysisTypeEnum.Limitation,
      }),
    queryKey: ["EAQTaskDetailEvidenceAnalyses", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const columns = useMemo<MRT_ColumnDef<ITaskDetailEvidence>[]>(
    () => [
      {
        header: "Mã tiêu chuẩn",
        accessorFn: (row) =>
          row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.eaqStandard?.code || "",
      },
      {
        header: "Mã tiêu chí",
        accessorFn: (row) => row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code || "",
      },
      {
        header: "Mã hạn chế",
        accessorFn: (row) => row.eaqTaskDetail?.eaqAnalysis?.eaqLimitation?.code || "",
      },
      {
        header: "Mã phân tích",
        accessorFn: (row) => row.eaqTaskDetail?.eaqAnalysis?.code || "",
      },
      {
        header: "Nội dung phân tích",
        accessorFn: (row) => row.eaqTaskDetail?.eaqAnalysis?.description || "",
        size: columnSizeObject.description,
      },
      {
        header: "Mã công việc",
        accessorFn: (row) => row.eaqTaskDetail?.code || "",
      },
      {
        header: "Tên công việc",
        accessorFn: (row) => row.eaqTaskDetail?.name || "",
        size: columnSizeObject.description,
      },
      {
        header: "Mã minh chứng dự kiến",
        accessorKey: "code",
      },
      {
        header: "Tên minh chứng dự kiến",
        accessorKey: "name",
        size: columnSizeObject.description
      },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách minh chứng dự kiến">
      <CustomDataTable
        columns={columns}
        data={evidenceAnalysesQuery.data || []}
        enableRowSelection
        enableRowNumbers={false}
        state={{
          isLoading: evidenceAnalysesQuery.isLoading,
          showProgressBars: evidenceAnalysesQuery.isLoading,
        }}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows =
            table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
          return (
            <>
              <EstimatedEvidenceFormModal />
              <EvidenceImport />
              <EvidenceExport table={table} loading={evidenceAnalysesQuery.isLoading} />
              <EvidenceDeleteList data={selectedRows} resetRowSelection={table.resetRowSelection} />
            </>
          );
        }}
        renderRowActions={({ row }) => (
          <CustomCenterFull>
            <EstimatedEvidenceFormModal values={row.original} />
            <EvidenceDelete id={row.original.id ?? 0} code={row.original.code ?? ""} />
          </CustomCenterFull>
        )}
      />
    </CustomFieldset>
  );
}
