"use client";

import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import useS_Shared_Filter from "@/shared/stores/useS_Shared_Filter";
import {
  EnumCriteriaAssignmentStatus,
} from "./CriteriaAssignmentStatusBadge";
import TaskDetailReadModal from "./CriteriaAssignmentTable03Detail/TaskDetailReadModal";
import TaskDetailUpdateModal from "./CriteriaAssignmentTable03Update/TaskDetailUpdateModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCriteriaColumns } from "@/features/admin/ModuleSelfAccessmentCriteria/AnalysisAndProcessingProof03/useCriteriaColumns";

export const getStatusOptions = [
  {
    value: EnumCriteriaAssignmentStatus.NotStarted.toString(),
    label: "Chưa bắt đầu",
  },
  {
    value: EnumCriteriaAssignmentStatus.InProgress.toString(),
    label: "Đang thực hiện",
  },
  {
    value: EnumCriteriaAssignmentStatus.DraftDone.toString(),
    label: "Đã soạn xong, chờ kiểm tra",
  },
];

export default function CriteriaAssignmentTable03() {
  const phaseStore = useS_Shared_Filter();

  const query = useCustomReactQuery({
    queryKey: ["CriteriaAssignmentRead", phaseStore.state.Phase?.id],
    axiosFn: async () =>
      service_EAQEvaluationPlan.GetEAQTaskDetailsByEAQPhaseId({
        eaqPhaseId: phaseStore.state.Phase?.id,
      }),
    options: {
      // staleTime: Infinity,
      enabled: !!phaseStore.state.Phase?.id,
      select: (data: ITaskDetail[]) => data.map(item => ({
        ...item,
        displayPlanCode: item.eaqTask?.eaqEvaluationPlan?.code,
        displayProgram: item.eaqTask?.eaqEvaluationPlan?.eaqPhase?.eaqStandardSetTrainingProgram?.name,
        displayPhase: item.eaqTask?.eaqEvaluationPlan?.eaqPhase?.code
      }))
    },
  });

  const columns = useCriteriaColumns()

  return (
    <CustomFieldset title="Danh sách phân công tiêu chí">
      <CustomFlexColumn>
        <CustomDataTableAPI
          query={query}
          columns={columns}
          renderRowActions={({ row }) => {
            const criteriaCode = row.original.eaqCriteria?.code ?? "";
            const standardCode = row.original.eaqTask?.eaqStandard?.code ?? "";
            const taskDetailId = row.original.id ?? -1;
            return (
              <CustomCenterFull>
                <TaskDetailReadModal
                  taskDetailId={taskDetailId}
                  criteriaCode={criteriaCode}
                  standardCode={standardCode}
                />
                <TaskDetailUpdateModal
                  analysisTrackingStatus={row.original.analysisTrackingStatus || 0}
                  taskDetailId={taskDetailId}
                  criteriaCode={criteriaCode}
                  standardCode={standardCode} />
              </CustomCenterFull>
            )
          }}
          exportProps={{
            fileName: "Danh sách phân công tiêu chí"
          }}
          enableRowSelection
          enableRowNumbers
        />
      </CustomFlexColumn>
    </CustomFieldset>
  );
}
