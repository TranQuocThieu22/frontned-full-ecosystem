import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { ITaskDetailEvidenceAnalysisImport, service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { ITaskDetailAnalysis } from "@/shared/interfaces/task/ITaskDetailAnalysis";

const fields: FieldOption<ITaskDetailEvidenceAnalysisImport>[] = [
  {
    fieldKey: "eaqTaskDetailCode",
    fieldName: "Mã công việc",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã minh chứng",
    isRequired: true,
  },
  {
    fieldKey: "name",
    fieldName: "Tên minh chứng",
    isRequired: true,
  },
];

export default function EvidenceImportButton() {
  const filterStore = useS_Shared_Filter();

  const taskDetailsQuery = useCustomReactQuery({
    axiosFn: () =>
      service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id || 0,
        analysisType: analysisTypeEnum.Requirement,
      }),
    queryKey: ["EAQTaskDetails_Import", filterStore.state.Phase?.id],
    options: {
      enabled: !!filterStore.state.StandardSet,
    },
  });

  return (
    <>
      <CustomButtonImport
        fields={fields}
        fileName={"Mẫu import danh sách minh chứng dự kiến"}
        onSubmit={(values: ITaskDetailEvidenceAnalysisImport[]) => service_EAQAnalysis.importEAQTaskDetailEvidenceAnalyses(values)}
        onPrepareWorkbook={(workbook: any) => {

          // Sheet: Danh sách công việc
          if (taskDetailsQuery.data && taskDetailsQuery.data.length > 0) {
            const referenceData: any[] = [];

            taskDetailsQuery.data.forEach((taskDetail: ITaskDetailAnalysis) => {
              referenceData.push({
                eaqTaskDetailCode: taskDetail?.code || "",
                eaqTaskDetailName: taskDetail?.name || "",
                eaqAnalysisCode: taskDetail?.eaqAnalysis?.code || "",
                eaqAnalysisName: taskDetail?.eaqAnalysis?.name || "",
                eaqRequirementCode: taskDetail?.eaqAnalysis?.eaqRequirement?.code || "",
                eaqRequirementName: taskDetail?.eaqAnalysis?.eaqRequirement?.name || "",
                eaqCriteriaCode: taskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code || "",
                eaqCriteriaName: taskDetail?.eaqAnalysis?.eaqRequirement?.eaqCriteria?.name || "",
              });
            });

            const referenceConfig: IExcelColumnConfig<any>[] = [
              { fieldKey: "eaqTaskDetailCode", fieldName: "Mã công việc", isRequired: false },
              { fieldKey: "eaqTaskDetailName", fieldName: "Tên công việc", isRequired: false },
              { fieldKey: "eaqAnalysisCode", fieldName: "Mã phân tích", isRequired: false },
              { fieldKey: "eaqAnalysisName", fieldName: "Nội dung phân tích", isRequired: false },
              { fieldKey: "eaqRequirementCode", fieldName: "Mã yêu cầu", isRequired: false },
              { fieldKey: "eaqRequirementName", fieldName: "Tên yêu cầu", isRequired: false },
              { fieldKey: "eaqCriteriaCode", fieldName: "Mã tiêu chí", isRequired: false },
              { fieldKey: "eaqCriteriaName", fieldName: "Tên tiêu chí", isRequired: false },
            ];

            excelUtils.addSheet<any>({
              workbook: workbook,
              sheetName: "Danh sách công việc",
              data: referenceData,
              config: referenceConfig,
            });
          }
        }}
      />
    </>
  );
}
