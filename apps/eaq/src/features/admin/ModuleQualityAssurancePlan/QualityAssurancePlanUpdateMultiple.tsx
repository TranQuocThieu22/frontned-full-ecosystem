import { service_Department } from "@/shared/APIs/service__department";
import {
  IImportUpdateEAQTaskDetailAnalyses,
  service_EAQAnalysis,
} from "@/shared/APIs/service_EAQAnalysis";
import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  excelUtils,
  IExcelColumnConfig,
} from "@aq-fe/core-ui/shared/utils/excelUtils";

export default function QualityAssurancePlanUpdateMultiple({
  loading,
}: {
  loading?: boolean;
}) {
  const filterStore = useS_Shared_Filter();

  const taskDetailQuery = useCustomReactQuery({
    queryKey: [
      "QualityAssurancePlanUpdateMultiple_TaskDetail",
      filterStore.state.Phase?.id,
    ],
    axiosFn: async () =>
      service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id,
        analysisType: analysisTypeEnum.Requirement,
      }),
    options: {
      enabled: !!filterStore.state.Phase?.id,
    },
  });

  const departmentQuery = useCustomReactQuery({
    queryKey: ["improvedPlanUpdateMultiple"],
    axiosFn: async () => service_Department.getAll(),
  });

  const taskDetailList: ITaskDetailConfig[] =
    taskDetailQuery.data?.map((item) => ({
      code: item.code || "",
      name: item.name || "",
      eaqStandardSetCode:
        item.eaqAnalysis?.eaqRequirement?.eaqCriteria?.eaqStandard?.code || "",
      eaqCriteriaCode:
        item.eaqAnalysis?.eaqRequirement?.eaqCriteria?.code || "",
      eaqRequirementCode: item.eaqAnalysis?.eaqRequirement?.code || "",
      eaqRequirementName: item.eaqAnalysis?.eaqRequirement?.name || "",
    })) ?? [];

  const departmentList: IDepartmentConfig[] =
    departmentQuery.data?.map((item) => ({
      code: item.code || "",
      name: item.name || "",
    })) ?? [];

  if(loading) return null;

  return (
    <CustomButtonImport
      fields={fields}
      fileName="Mẫu import Lập kế hoạch đảm bảo chất lượng"
      onSubmit={(value) => {
        const formattedValue = value.map((item) => ({
          ...item,
        }));
        return service_EAQAnalysis.importUpdateEAQTaskDetailAnalyses(
          formattedValue
        );
      }}
      buttonProps={{
        actionType: "update",
      }}
      onPrepareWorkbook={async (workbook) => {
        excelUtils.addSheet<ITaskDetailConfig>({
          workbook: workbook,
          sheetName: "Danh sách công việc",
          data: taskDetailList || [],
          config: taskDetailConfig,
        });
        excelUtils.addSheet<IDepartmentConfig>({
          workbook: workbook,
          sheetName: "Danh sách đơn vị",
          data: departmentList || [],
          config: departmentConfig,
        });
      }}
    />
  );
}

const fields: FieldOption<IImportUpdateEAQTaskDetailAnalyses>[] = [
  {
    fieldName: "Mã công việc (Xem danh sách giá trị)",
    fieldKey: "eaqTaskDetailCode",
    isRequired: true,
    isUnique: true,
  },
  {
    fieldName: "Đơn vị chủ trì (Xem danh sách giá trị)",
    fieldKey: "hostUnitCode",
    isRequired: true,
  },
  {
    fieldName: "Đơn vị phối hợp",
    fieldKey: "supportUnit",
  },
  {
    fieldName: "Ghi chú",
    fieldKey: "note",
  },
];

interface IDepartmentConfig {
  code?: string;
  name?: string;
}

interface ITaskDetailConfig {
  id?: number;
  code?: string;
  name?: string;
  eaqStandardSetCode?: string;
  eaqCriteriaCode?: string;
  eaqRequirementCode?: string;
  eaqRequirementName?: string;
}

const taskDetailConfig: IExcelColumnConfig<ITaskDetailConfig>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã công việc",
  },
  {
    fieldKey: "name",
    fieldName: "Tên công việc",
  },
  {
    fieldKey: "eaqStandardSetCode",
    fieldName: "Mã tiêu chuẩn",
  },
  {
    fieldKey: "eaqCriteriaCode",
    fieldName: "Mã tiêu chí",
  },
  {
    fieldKey: "eaqRequirementCode",
    fieldName: "Mã hạn chế",
  },
  {
    fieldKey: "eaqRequirementName",
    fieldName: "Tên hạn chế",
  },
];
const departmentConfig: IExcelColumnConfig<IDepartmentConfig>[] = [
  {
    fieldKey: "code",
    fieldName: "Mã đơn vị",
  },
  {
    fieldKey: "name",
    fieldName: "Tên đơn vị",
  },
];
