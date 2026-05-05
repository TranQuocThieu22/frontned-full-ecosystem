import { service_EAQCertification } from '@/shared/APIs/service_EAQCertification';
import { service_EAQPhase } from '@/shared/APIs/service_EAQPhase';
import { ICertification } from '@/shared/interfaces/certification/ICertification';
import useS_Shared_Filter from '@/shared/stores/useS_Shared_Filter';
import { excelUtils, IExcelColumnConfig } from '@aq-fe/core-ui/shared/utils/excelUtils';
import { CustomButtonImport } from '@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport';
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";

const config: FieldOption<ICertification>[] = [
  { fieldName: "Số giấy chứng nhận", fieldKey: "code", isRequired: true },
  { fieldName: "Ngày cấp GCN", fieldKey: "issuedDate", isRequired: true, parseType: "date" },
  { fieldName: "Đơn vị cấp GCN", fieldKey: "issuedUnit", isRequired: true },
  { fieldName: "ID giai đoạn", fieldKey: "eaqPhaseId", isRequired: true, parseType: "number" },
  { fieldName: "Thời gian thực hiện báo cáo tự đánh giá", fieldKey: "selfAssessmentTime", isRequired: false },
  { fieldName: "Thời gian thực hiện đánh giá ngoài", fieldKey: "externalAssessmentTime", isRequired: false },
];
interface IPhaseConfig {
  id: number;
  code: string;
  name: string;
  eaqStandardSetCode: string;
  eaqTrainingProgramCode: string;
  eaqTrainingProgramName: string;
  // department: string;
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
  // {
  //   fieldKey: "department",
  //   fieldName: "Đơn vị quản lý",
  // },
];

export default function AccreditationCertificateImport() {
  const store = useS_Shared_Filter();

  const phaseQuery = useCustomReactQuery({
    queryKey: ["PhaseQuery_import", store.state.StandardSet?.id],
    axiosFn: async () => await service_EAQPhase.getAllByEAQStandardSetId({
      EAQStandardSetId: store.state.StandardSet?.id,
      cols: ["EAQTrainingProgram", "EAQStandardSet"]
    }),
    options: {
      enabled: store.state.StandardSet?.id !== undefined,
    }
  });

  const phaseList: IPhaseConfig[] = phaseQuery.data?.map((item) => (
    {
    id: item.id ?? 0,
    code: item.code || "",
    name: item.name || "",
    eaqStandardSetCode: item.eaqStandardSet?.code || "",
    eaqTrainingProgramCode: item.eaqTrainingProgram?.code || "",
    eaqTrainingProgramName: item.eaqTrainingProgram?.name || "",
    // department: item.eaqTrainingProgram?.department?.name || "",
    }
  )) ?? [];

  return (
    <CustomButtonImport
      fields={config}
      fileName="Mẫu Import giấy chứng nhận kiểm định chất lượng"
      onSubmit={(finalValues: ICertification[]) => {
        return service_EAQCertification.createOrUpdateList(finalValues);
      }}
      onPrepareWorkbook={(workbook) => {
        excelUtils.addSheet<IPhaseConfig>({
          workbook: workbook,
          sheetName: "Danh sách giai đoạn theo chương trình đào tạo",
          data: phaseList || [],
          config: eaqPhaseConfig,
        });
      }}
    />
  );
}
