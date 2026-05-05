"use client";
import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { cleanTDRequirementsAndEvidences } from "./shared/CleanTDRequirements";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

interface Props {
  id?: number | null;
  code: string;
  values?: ITaskDetail;
}

export default function TaskDetailUpdateEvidenceDeleteButton({
  id,
  code,
  values,
}: Props) {

  const handleDeleteEvidence = () => {
    if (!id || !values) return false;

    const allEvidence = values.eaqTaskDetailEvidences || [];
    const updatedEvidence = allEvidence.map((item) => ({
      ...item,
      isEnabled: item.id === id ? false : item.isEnabled,
    }));

    const newTaskDetail: ITaskDetail = {
      ...values,
      eaqTaskDetailRequirements: undefined, // Prevent add new requirement wwhen their id = 0
      eaqTaskDetailEvidences: updatedEvidence,
    };

    const updatedTaskDetail = cleanTDRequirementsAndEvidences(newTaskDetail);
    return service_EAQEvaluationPlan.UpdateTaskDetailAnalysisStatus(updatedTaskDetail)
  };

  return (
    <CustomActionIconDelete
      modalProps={{
        title: "Xác nhận xóa dự kiến minh chứng này"
      }}
      contextData={code}
      onSubmit={id ? handleDeleteEvidence : () => { }}
    />
  );
}
