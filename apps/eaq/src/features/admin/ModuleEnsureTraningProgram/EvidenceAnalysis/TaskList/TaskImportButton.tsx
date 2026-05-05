import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetailAnalysisImport, service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";

const fields: FieldOption<ITaskDetailAnalysisImport>[] = [
  {
    fieldKey: "eaqAnalysisCode",
    fieldName: "Mã phân tích",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã công việc",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên công việc",
    isRequired: true,
  },
];

export default function TaskImportButton() {
  const filterStore = useS_Shared_Filter();

  const analysesQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.getAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id,
        analysisType: analysisTypeEnum.Requirement,
      }),
    queryKey: ["EAQAnalyses_TaskImport", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  return (
    <>
      <CustomButtonImport
        fields={fields}
        fileName={"Mẫu import danh sách công việc"}
        onSubmit={(values: ITaskDetailAnalysisImport[]) => service_EAQAnalysis.importEAQTaskDetailAnalyses(values)}
        onPrepareWorkbook={(workbook: any) => {
          // Sheet: Danh sách phân tích
          if (analysesQuery.data && analysesQuery.data.length > 0) {
            const referenceData: any[] = [];

            analysesQuery.data.forEach((analysis: any) => {
              referenceData.push({
                eaqAnalysisCode: analysis?.code || "",
                eaqAnalysisName: analysis?.name || "",
                eaqRequirementCode: analysis?.eaqRequirement?.code || "",
                eaqRequirementName: analysis?.eaqRequirement?.name || "",
                eaqCriteriaCode: analysis?.eaqRequirement?.eaqCriteria?.code || "",
                eaqCriteriaName: analysis?.eaqRequirement?.eaqCriteria?.name || "",
              });
            });

            const referenceConfig: IExcelColumnConfig<any>[] = [
              { fieldKey: "eaqAnalysisCode", fieldName: "Mã phân tích", isRequired: false },
              { fieldKey: "eaqAnalysisName", fieldName: "Nội dung phân tích", isRequired: false },
              { fieldKey: "eaqRequirementCode", fieldName: "Mã yêu cầu", isRequired: false },
              { fieldKey: "eaqRequirementName", fieldName: "Tên yêu cầu", isRequired: false },
              { fieldKey: "eaqCriteriaCode", fieldName: "Mã tiêu chí", isRequired: false },
              { fieldKey: "eaqCriteriaName", fieldName: "Tên tiêu chí", isRequired: false },
            ];

            excelUtils.addSheet<any>({
              workbook: workbook,
              sheetName: "Danh sách phân tích",
              data: referenceData,
              config: referenceConfig,
            });
          }
        }}
      />
    </>
  );
}
