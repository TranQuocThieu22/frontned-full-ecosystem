import { analysisTypeEnum } from "@/shared/constants/enum/AnalysisTypeEnum";
import { IExternalAssessment } from "@/shared/interfaces/externalAssessment/IExternalAssessment";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { service_Department } from "@/shared/APIs/service__department";
import {
  IImportUpdateEAQTaskDetailAnalyses,
  service_EAQAnalysis,
} from "@/shared/APIs/service_EAQAnalysis";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import {
  ModalImportId,
  MyModalImport,
} from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import {
  excelUtils,
  IExcelColumnConfig,
} from "@aq-fe/core-ui/shared/utils/excelUtils";
import { List, ScrollArea, useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ExcelJS from "exceljs";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";

type TaskDetailSubmit = Pick<
  ITaskDetail,
  "code" | "hostUnit" | "supportUnit" | "note"
>;

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
  eaqLimitationCode?: string;
  eaqLimitationName?: string;
}

export default function ImprovedPlanUpdateMultiple({
  loading,
}: {
  loading?: boolean;
}) {
  const filterStore = useS_Shared_Filter();

  const taskDetailQuery = useCustomReactQuery({
    queryKey: ["taskDetailQuery", filterStore.state.Phase?.id],
    axiosFn: async () =>
      service_EAQAnalysis.GetEAQTaskDetailAnalysesByEAQPhaseId({
        eaqPhaseId: filterStore.state.Phase?.id,
        analysisType: analysisTypeEnum.Limitation,
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
        item.eaqAnalysis?.eaqLimitation?.eaqCriteria?.eaqStandard?.code || "",
      eaqCriteriaCode: item.eaqAnalysis?.eaqLimitation?.eaqCriteria?.code || "",
      eaqLimitationCode: item.eaqAnalysis?.eaqLimitation?.code || "",
      eaqLimitationName: item.eaqAnalysis?.eaqLimitation?.name || "",
    })) ?? [];
  const departmentList: IDepartmentConfig[] =
    departmentQuery.data?.map((item) => ({
      code: item.code || "",
      name: item.name || "",
    })) ?? [];

  return (
    <>
      <CustomButtonImport
        buttonProps={{
          actionType: 'update'
        }}
        fields={importConfig}
        fileName="Mẫu cập nhật Kế hoạch cải tiến chất lượng sau đánh giá ngoài"
        onSubmit={(value) => {
          return service_EAQAnalysis.importListEAQTaskDetailAnalysis(value)
        }}
        onPrepareWorkbook={(workbook) => {
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
    </>
  );
}


const importConfig: FieldOption<IImportUpdateEAQTaskDetailAnalyses>[] = [
  {
    fieldName: "Mã công việc",
    fieldKey: "eaqTaskDetailCode",
    isRequired: true,
    isUnique: true
  },
  {
    fieldName: "Đơn vị chủ trì",
    fieldKey: "hostUnitCode",
    isRequired: true
  },
  {
    fieldName: "Đơn vị phối hợp",
    fieldKey: "supportUnit"
  },
  {
    fieldName: "Ghi chú",
    fieldKey: "note"
  },
];

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
    fieldKey: "eaqLimitationCode",
    fieldName: "Mã hạn chế",
  },
  {
    fieldKey: "eaqLimitationName",
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
