"use client";

import { service_EAQEvaluationPlan } from "@/shared/APIs/service_EAQEvaluationPlan";
import { ITaskDetailRequirement } from "@/shared/interfaces/requirement/ITaskDetailRequirement";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import { cleanTDRequirementsAndEvidences } from "./shared/CleanTDRequirements";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";

interface Props {
  evidences: ITaskDetailRequirement[];
  values?: ITaskDetail;
}

export default function TaskDetailUpdateEvidenceDeleteListButton({
  values,
  evidences,
}: Props) {
  const handleDeleteEvidence = () => {
    if (!values) return false;

    const allEvidences = values.eaqTaskDetailEvidences || [];
    const deletedEvidenceIds = evidences.map((item) => item.id);

    const updatedEvidence = allEvidences.map((item) => ({
      ...item,
      isEnabled: !deletedEvidenceIds.includes(item.id),
    }));

    const newTaskDetail: ITaskDetail = {
      ...values,
      eaqTaskDetailRequirements: undefined, // Prevent add new requirement wwhen their id = 0
      eaqTaskDetailEvidences: updatedEvidence,
    };

    const updatedTaskDetail = cleanTDRequirementsAndEvidences(newTaskDetail);
    return service_EAQEvaluationPlan.UpdateTaskDetailAnalysisStatus(updatedTaskDetail);
  };

  return (
    <CustomButtonDeleteList
      count={evidences.length}
      onSubmit={handleDeleteEvidence}
    />
  );
}
