import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import EvidenceCreateOrUpdateButton from "./EvidenceCreateOrUpdateButton";
import EvidenceDeleteButton from "./EvidenceDeleteButton";
import EvidenceDeleteListButton from "./EvidenceDeleteListButton";
import EvidenceExportButton from "./EvidenceExportButton";
import EvidenceImportButton from "./EvidenceImportButton";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function EvidenceListTable() {
  const filterStore = useS_Shared_Filter();

  const evidenceAnalysesQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getTaskDetailEvidenceAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id || 0,
        analysisType: analysisTypeEnum.Requirement,
      }),
    queryKey: ["evidenceAnalysesQuery_EvidenceListTable", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const columns = useMemo<CustomColumnDef<ITaskDetailEvidence>[]>(
    () => [
      {
        header: "Mã tiêu chuẩn",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.eaqStandard.code",
      },
      {
        header: "Mã tiêu chí",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.eaqCriteria.code",
      },
      { header: "Mã yêu cầu", accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.code" },
      {
        header: "Tên yêu cầu",
        accessorKey: "eaqTaskDetail.eaqAnalysis.eaqRequirement.name",
        size: columnSizeObject.name,
      },
      {
        header: "Mã công việc",
        accessorKey: "eaqTaskDetail.code",
      },
      {
        header: "Tên công việc",
        accessorKey: "eaqTaskDetail.name",
        size: columnSizeObject.name,
      },
      { header: "Mã minh chứng dự kiến", accessorKey: "code" },
      { header: "Tên minh chứng dự kiến", accessorKey: "name", size: columnSizeObject.name },
    ],
    []
  );
  return (
    <CustomFieldset title="Danh sách minh chứng dự kiến">
      <CustomDataTable
        columns={columns}
        isLoading={evidenceAnalysesQuery.isLoading}
        isError={evidenceAnalysesQuery.isError}
        data={evidenceAnalysesQuery.data || []}
        enableRowSelection
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <EvidenceCreateOrUpdateButton />
              <EvidenceImportButton />
              <EvidenceExportButton table={table} loading={evidenceAnalysesQuery.isLoading} />
              <EvidenceDeleteListButton table={table} />
            </>
          );
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <EvidenceCreateOrUpdateButton data={row.original} />
              <EvidenceDeleteButton data={row.original} />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
