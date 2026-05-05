import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { IAnalysis } from "@/shared/interfaces/analysis/IAnalysis";
import { service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { useMemo } from "react";
import AnalysisCreateOrUpdateButton from "./AnalysisCreateOrUpdateButton";
import AnalysisDeleteButton from "./AnalysisDeleteButton";
import AnalysisDeleteListButton from "./AnalysisDeleteListButton";
import AnalysisExportButton from "./AnalysisExportButton";
import AnalysisImportButton from "./AnalysisImportButton";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { columnSizeObject } from "@aq-fe/core-ui/shared/consts/object/columnSizeObject";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";

export default function AnalysisListTable() {
  const filterStore = useS_Shared_Filter();

  const analysisQuery = useCustomReactQuery({
    queryKey: ["analysisQuery_AnalysisListTable", filterStore.state.Phase?.id],
    axiosFn: async () =>
      service_EAQAnalysis.getAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id!,
        analysisType: analysisTypeEnum.Requirement,
      }),
  });

  const columns = useMemo<CustomColumnDef<IAnalysis>[]>(
    () => [
      { header: "Mã tiêu chuẩn", accessorKey: "eaqRequirement.eaqCriteria.eaqStandard.code" },
      {
        header: "Mã tiêu chí",
        accessorKey: "eaqRequirement.eaqCriteria.code",
      },
      { header: "Mã yêu cầu", accessorKey: "eaqRequirement.code" },
      { header: "Tên yêu cầu", accessorKey: "eaqRequirement.name", size: columnSizeObject.name },
      {
        header: "Mã phân tích",
        accessorKey: "code",
      },
      {
        header: "Nội dung phân tích",
        accessorKey: "description",
        size: columnSizeObject.description,
      },
      { header: "Câu hỏi phân tích", accessorKey: "question", size: columnSizeObject.description },
    ],
    []
  );

  return (
    <CustomFieldset title="Danh sách nội dung phân tích yêu cầu tiêu chí">
      <CustomDataTable
        columns={columns}
        isLoading={analysisQuery.isLoading}
        isError={analysisQuery.isError}
        data={analysisQuery.data || []}
        enableRowSelection
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <>
              <AnalysisCreateOrUpdateButton />
              <AnalysisImportButton />
              <AnalysisExportButton table={table} loading={analysisQuery.isLoading} />
              <AnalysisDeleteListButton table={table} />
            </>
          );
        }}
        renderRowActions={({ row }) => {
          return (
            <CustomCenterFull>
              <AnalysisCreateOrUpdateButton data={row.original} />
              <AnalysisDeleteButton data={row.original} />
            </CustomCenterFull>
          );
        }}
      />
    </CustomFieldset>
  );
}
