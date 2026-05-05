import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import { cleanTDRequirementsAndEvidences } from "./shared/CleanTDRequirements";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

const config: FieldOption<ITaskDetailEvidence>[] = [
  {
    fieldKey: "eaqTaskDetailEvidenceCode",
    fieldName: "Trực thuộc minh chứng (Mã Minh chứng dự kiến)",
  },
  {
    fieldKey: "eaqExpectedEvidenceCode",
    fieldName: "Mã Minh chứng dự kiến",
    isRequired: true,
  },
  {
    fieldKey: "eaqExpectedEvidenceName",
    fieldName: "Tên Minh chứng dự kiến",
    isRequired: true,
  },
  {
    fieldKey: "eaqExpectedEvidenceDate",
    fieldName: "Số - ngày ban hành - thời điểm khảo sát",
    isRequired: true,
  },
  {
    fieldKey: "eaqExpectedEvidenceUnitRelease",
    fieldName: "Nơi ban hành",
    isRequired: true,
  },
  {
    fieldKey: "eaqExpectedEvidenceNote",
    fieldName: "Ghi chú",
  },
];

const taskDetailEvidenceConfig: IExcelColumnConfig<ITaskDetailEvidence>[] = [
  {
    fieldKey: "id",
    fieldName: "Id minh chứng dự kiến",
  },
  {
    fieldKey: "eaqTaskDetailEvidenceCode",
    fieldName: "Mã minh chứng dự kiến",
    formatter(value, row) {
      return row.eaqExpectedEvidenceCode
    },
  },
  {
    fieldKey: "eaqExpectedEvidenceName",
    fieldName: "Tên minh chứng dự kiến",
    formatter(value, row) {
      return row.eaqExpectedEvidenceName
    },
  },
];

interface Props {
  taskDetail?: ITaskDetail;
}

export default function TaskDetailUpdateEvidenceImportButton({
  taskDetail,
}: Props) {
  const standardSetStore = useS_Shared_Filter();
  const taskDetailEvidencesQuery = useCustomReactQuery({
    queryKey: ["EvidencesByStandardSetIdForImport"],
    axiosFn: async () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailEvidencesByEAQPhaseId({
        eaqPhaseId: standardSetStore.state?.Phase?.id,
      }),
    options: {
      enabled: !!standardSetStore.state.StandardSet,
    },
  });

  return (
    <CustomButtonImport
      fields={config}
      fileName="Mẫu Import danh sách yêu cầu"
      onSubmit={(finalValues: ITaskDetailEvidence[]) => {
        const mappedValues: ITaskDetailEvidence[] = finalValues.map((item) => {
          const mappedTaskDetailEvidence = taskDetailEvidencesQuery.data?.find(
            (evidence) => evidence.eaqExpectedEvidenceCode?.toString() === item.eaqTaskDetailEvidenceCode?.toString()
          );

          return {
            ...item,
            eaqTaskDetailRequirements: undefined, // Prevent add new requirement when their id = 0
            eaqTaskDetailEvidenceId: mappedTaskDetailEvidence?.id
          };
        });

        const evidences = taskDetail?.eaqTaskDetailEvidences || [];
        const updatedEvidences: ITaskDetailEvidence[] = evidences.concat(mappedValues);

        const updatedTaskDetail: ITaskDetail = cleanTDRequirementsAndEvidences({
          ...taskDetail,
          eaqTaskDetailEvidences: updatedEvidences,
        });

        return service_EAQEvaluationPlan.UpdateTaskDetailAnalysisStatus(updatedTaskDetail) as any;
      }}
      onPrepareWorkbook={(workbook) => {
        excelUtils.addSheet<ITaskDetailEvidence>({
          workbook: workbook,
          sheetName: "Danh sách minh chứng dự kiến",
          data: (taskDetailEvidencesQuery.data || []),
          config: taskDetailEvidenceConfig,
        });
      }}
    />
  );
}
