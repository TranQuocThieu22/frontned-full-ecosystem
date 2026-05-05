import {ITaskDetail} from "@/shared/interfaces/task/ITaskDetail";

export const cleanTDRequirementsAndEvidences = (
  taskDetail: ITaskDetail
): ITaskDetail => {
  const requirements = taskDetail.eaqTaskDetailRequirements?.map(({ eaqTaskDetail, eaqRequirement, ...rest }) => rest) ?? []; 
  const evidences = taskDetail.eaqTaskDetailEvidences?.map(({ eaqTaskDetail, eaqEvidence, ...rest }) => rest) ?? [];

  return {
    ...taskDetail,
    eaqTaskDetailRequirements: requirements,
    eaqTaskDetailEvidences: evidences
  };
};
