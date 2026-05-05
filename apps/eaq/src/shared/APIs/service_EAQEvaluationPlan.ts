import { ICouncilGroupMemberCreate } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroupMemberCreate";
import { IEvaluationPlan } from "@/shared/interfaces/evaluationPlan/IEvaluationPlan";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";
import { INotification } from "@/shared/interfaces/notification/INotification";
import { ITask } from "@/shared/interfaces/task/ITask";
import { ITaskCriteriaUpdate } from "@/shared/interfaces/task/ITaskCriteriaUpdate";
import { ITaskDetail } from "@/shared/interfaces/task/ITaskDetail";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


// Ví dụ tạo service
const CONTROLLER = "eaq/EAQEvaluationPlan";

export const service_EAQEvaluationPlan = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<IEvaluationPlan>(CONTROLLER, axiosInstance),
  getEAQEvaluationPlansByEAQStandardSetId: (params: { eaqStandardSetId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IEvaluationPlan[]>>(
      CONTROLLER + `/GetEAQEvaluationPlansByEAQStandardSetId`, {
      params
    })
  },

  getEAQTaskByStandardSetId: (params: { eaqStandardSetId?: number; cols?: string[] }) => {
    return axiosInstance.get<CustomApiResponse<ITask[]>>(CONTROLLER + `/GetEAQTaskByStandardSetId`, {
      params: {
        cols: params.cols?.join(","),
        ...params,
      },
    });
  },

  getEAQTaskDetailByEAQTaskId: (params: { eaqTaskId?: number; cols?: string[] }) => {
    return axiosInstance.get<CustomApiResponse<ITaskDetail[]>>(CONTROLLER + `/GetEAQTaskDetailByEAQTaskId`, {
      params: {
        cols: params.cols?.join(","),
        ...params,
      },
    });
  },

  TaskDetailEvidenceGetAll: (params: { code?: string }) => {
    return axiosInstance.get<CustomApiResponse<ITaskDetailEvidence[]>>(CONTROLLER + "/TaskDetailEvidenceGetAll", { params });
  },

  TaskDetailGetList: (params: { eaqPhaseId?: number }) => {
    return axiosInstance.get<CustomApiResponse<ITaskDetail[]>>(CONTROLLER + "/TaskDetailGetList", { params });
  },

  GetTaskDetailById: (params: { taskDetailId?: number }) => {
    return axiosInstance.get<CustomApiResponse<ITaskDetail>>(CONTROLLER + "/GetTaskDetailById", { params });
  },

  reviewEAQTaskDetail: (data: ITaskDetail) => {
    return axiosInstance.post<CustomApiResponse<ITaskDetail>>(CONTROLLER + "/ReviewEAQTaskDetail", data);
  },

  UpdateTaskDetailAnalysisStatus: (taskDetail: ITaskDetail) => {
    return axiosInstance.post<CustomApiResponse<ITaskDetail>>(CONTROLLER + "/UpdateTaskDetailAnalysisStatus", taskDetail);
  },

  getEAQTaskDetailNotifications: (EAQTaskDetailId?: number) => {
    return axiosInstance.get<CustomApiResponse<INotification[]>>(
      CONTROLLER + '/GetEAQTaskDetailNotifications',
      {
        params: {
          EAQTaskDetailId: EAQTaskDetailId
        }
      }
    );
  },

  sendMailEAQTaskDetailNotification: (taskDetailId?: number, message?: string) => {
    return axiosInstance.post<CustomApiResponse<INotification[]>>(
      CONTROLLER + '/SendMailEAQTaskDetailNotification',
      {
        eaqTaskDetailId: taskDetailId,
        message: message
      })
  },
  GetCoucilGroupMemberByCouncilGroupId: (params: { EAQCouncilGroupId?: number }) => {
    return axiosInstance.get<CustomApiResponse<ICouncilGroupMemberCreate[]>>(CONTROLLER + "/GetCoucilGroupMemberByCouncilGroupId", { params });
  },

  UpdateEAQTaskDetails: (task: ITaskCriteriaUpdate) => {
    return axiosInstance.post<CustomApiResponse<ITaskCriteriaUpdate>>(CONTROLLER + "/UpdateEAQTaskDetails", task);
  },

  ReviewEAQTaskDetailEvidence: (evidences: ITaskDetailEvidence) => {
    return axiosInstance.post<CustomApiResponse<ITaskDetailEvidence[]>>(CONTROLLER + "/ReviewEAQTaskDetailEvidence", evidences);
  },

  TaskDetailEvidenceCollectEvidence: (params: { eaqTaskDetailEvidenceId?: number | null; eaqEvidenceId?: number | null, note?: string | null }) => {
    return axiosInstance.post<CustomApiResponse<ITaskDetailEvidence>>(
      CONTROLLER + `/TaskDetailEvidenceCollectEvidence`, null, { params }
    );
  },

  //** 22/08/2025 update api name, by Hào Nguyễn */
  GetEAQTaskDetailsByEAQPhaseId: (params: { eaqPhaseId?: number }) => {
    return axiosInstance.get<CustomApiResponse<ITaskDetail[]>>(CONTROLLER + "/GetEAQTaskDetailsByEAQPhaseId", { params });
  },

  GetEAQTaskDetailEvidencesByEAQPhaseId: (params: { eaqPhaseId?: number }) => {
    return axiosInstance.get<CustomApiResponse<ITaskDetailEvidence[]>>(CONTROLLER + "/GetEAQTaskDetailEvidencesByEAQPhaseId", { params });
  },

  GetEAQEvaluationPlansByEAQPhaseId: (params: { eaqPhaseId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IEvaluationPlan[]>>(
      CONTROLLER + `/GetEAQEvaluationPlansByEAQPhaseId`, {
      params
    })
  },

  GetEAQTasksByEAQPhaseId: (params: { eaqPhaseId?: number; cols?: string[] }) => {
    return axiosInstance.get<CustomApiResponse<ITask[]>>(CONTROLLER + `/GetEAQTasksByEAQPhaseId`, {
      params: {
        cols: params.cols?.join(","),
        ...params,
      },
    });
  },
};
