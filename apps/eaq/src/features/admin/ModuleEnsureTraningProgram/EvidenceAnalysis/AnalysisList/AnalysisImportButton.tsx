import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { IRequirementAnalysisImport, service_EAQAnalysis } from "@/shared/APIs/service_EAQAnalysis";
import { service_EAQRequirement } from "@/shared/APIs/service_EAQRequirement";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";

const fields: FieldOption<IRequirementAnalysisImport>[] = [
  {
    fieldKey: "eaqRequirementCode",
    fieldName: "Mã yêu cầu",
    isRequired: true,
  },
  {
    fieldKey: "code",
    fieldName: "Mã phân tích",
    isRequired: true,
  },
  {
    fieldKey: "description",
    fieldName: "Nội dung phân tích",
    isRequired: true,
  },
  {
    fieldKey: "question",
    fieldName: "Câu hỏi phân tích",
    isRequired: false,
  },
];

export default function AnalysisImportButton() {
  const filterStore = useS_Shared_Filter();

  const requirementQuery = useCustomReactQuery({
    queryKey: [
      "requirementQuery",
      "GetEAQRequirementByEAQStandardId",
      filterStore.state.StandardSet?.id,
    ],
    axiosFn: () =>
      service_EAQRequirement.GetEAQRequirementByEAQStandardSetId(
        filterStore.state.StandardSet?.id
      ),
    options: {
      enabled: !!filterStore.state.StandardSet,
    },
  });

  return (
    <CustomButtonImport
      fields={fields}
      fileName={"Mẫu import danh sách phân tích yêu cầu"}
      onSubmit={(values: IRequirementAnalysisImport[]) => service_EAQAnalysis.importEAQRequirementAnalyses(
        values.map((value) => ({
          ...value,
          analysisType: analysisTypeEnum.Requirement,
          eaqPhaseId: filterStore.state.Phase?.id,
        }))
      )}
      onPrepareWorkbook={(workbook) => {

        // Sheet : Danh sách yêu cầu
        if (requirementQuery.data && requirementQuery.data.length > 0) {
          const referenceData: any[] = [];

          requirementQuery.data.forEach((requirement: IRequirement) => {
            referenceData.push({
              eaqRequirementCode: requirement?.code || "",
              eaqRequirementName: requirement?.name || "",
              // eaqCriteriaCode: requirement?.eaqCriteria?.code || "",
              // eaqCriteriaName: requirement?.eaqCriteria?.name || "",
            });
          });

          const referenceConfig: IExcelColumnConfig<any>[] = [
            { fieldKey: "eaqRequirementCode", fieldName: "Mã yêu cầu", isRequired: false },
            { fieldKey: "eaqRequirementName", fieldName: "Tên yêu cầu", isRequired: false },
            // { fieldKey: "eaqCriteriaCode", fieldName: "Mã tiêu chí", isRequired: false },
            // { fieldKey: "eaqCriteriaName", fieldName: "Tên tiêu chí", isRequired: false },
          ];

          excelUtils.addSheet<any>({
            workbook: workbook,
            sheetName: "Danh sách yêu cầu",
            data: referenceData,
            config: referenceConfig,
          });
        }
      }}
    />
  );
}
