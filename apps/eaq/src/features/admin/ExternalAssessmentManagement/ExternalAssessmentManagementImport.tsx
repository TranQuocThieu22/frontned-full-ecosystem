import { service_EAQExternalAssessment } from "@/shared/APIs/service_EAQExternalAssessment";
import { service_EAQPhase } from "@/shared/APIs/service_EAQPhase";
import { documentTypeEnum, documentTypeEnumLabel } from "@/shared/constants/enum/DocumentTypeEnum";
import { IExternalAssessment } from "@/shared/interfaces/externalAssessment/IExternalAssessment";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";

const config: FieldOption<IExternalAssessment>[] = [
  { fieldName: "Số văn bản", fieldKey: "code", isRequired: true },
  { fieldName: "Tên văn bản", fieldKey: "name", isRequired: true },
  { fieldName: "Ngày văn bản", fieldKey: "documentDate", isRequired: true, parseType: "date" },
  { fieldName: "ID giai đoạn", fieldKey: "eaqPhaseId", isRequired: true, parseType: "number" },
  { fieldName: "Mã loại văn bản", fieldKey: "documentType", isRequired: true, parseType: "number" },
];
//=======================================================================
interface IPhaseConfig {
  id: number;
  code: string;
  name: string;
  eaqStandardSetCode: string;
  eaqTrainingProgramCode: string;
  eaqTrainingProgramName: string;
}

const eaqPhaseConfig: IExcelColumnConfig<IPhaseConfig>[] = [
  {
    fieldKey: "id",
    fieldName: "Id giai đoạn",
  },
  {
    fieldKey: "code",
    fieldName: "Mã giai đoạn",
  },
  {
    fieldKey: "name",
    fieldName: "Tên giai đoạn",
  },
  {
    fieldKey: "eaqStandardSetCode",
    fieldName: "Mã bộ Tiêu chuẩn",
  },
  {
    fieldKey: "eaqTrainingProgramCode",
    fieldName: "Mã chương trình đào tạo",
  },
  {
    fieldKey: "eaqTrainingProgramName",
    fieldName: "Tên chương trình đào tạo",
  },
];
//=======================================================================
interface IDocumentTypeConfig {
  label: string;
  value: string;
}

const documentTypeConfig: IExcelColumnConfig<IDocumentTypeConfig>[] = [
  {
    fieldKey: "value",
    fieldName: "Mã loại văn bản",
  },
  {
    fieldKey: "label",
    fieldName: "Loại văn bản",
  },
];

export default function ExternalAssessmentManagementImport() {
  const store = useS_Shared_Filter();

  const phaseQuery = useCustomReactQuery({
    queryKey: ["PhaseQuery_import", store.state.StandardSet?.id],
    axiosFn: async () =>
      await service_EAQPhase.getAllByEAQStandardSetId({
        EAQStandardSetId: store.state.StandardSet?.id,
        cols: ["EAQTrainingProgram", "EAQStandardSet"],
      }),
    options: {
      enabled: store.state.StandardSet?.id !== undefined,
    },
  });

  const phaseList: IPhaseConfig[] = phaseQuery.data?.map((item) => (
    {
      id: item.id ?? 0,
      code: item.code || "",
      name: item.name || "",
      eaqStandardSetCode: item.eaqStandardSet?.code || "",
      eaqTrainingProgramCode: item.eaqTrainingProgram?.code || "",
      eaqTrainingProgramName: item.eaqTrainingProgram?.name || "",
    }
  )) ?? [];

  const documentTypeList: IDocumentTypeConfig[] = converterUtils.mapEnumToSelectData(documentTypeEnum, documentTypeEnumLabel).filter(item => Number(item.value) > documentTypeEnum.form04);

  return (
    <CustomButtonImport
      fields={config}
      fileName="Mẫu Import hồ sơ liên quan đánh giá ngoài"
      onSubmit={(finalValues: IExternalAssessment[]) => {
        return service_EAQExternalAssessment.createOrUpdateList(finalValues);
      }}
      onPrepareWorkbook={(workbook) => {
        excelUtils.addSheet<IPhaseConfig>({
          workbook: workbook,
          sheetName: "Danh sách giai đoạn theo chương trình đào tạo",
          data: phaseList || [],
          config: eaqPhaseConfig,
        });
        excelUtils.addSheet<IDocumentTypeConfig>({
          workbook: workbook,
          sheetName: "Danh sách loại văn bản",
          data: documentTypeList || [],
          config: documentTypeConfig,
        });
      }}
    />
  );
}
