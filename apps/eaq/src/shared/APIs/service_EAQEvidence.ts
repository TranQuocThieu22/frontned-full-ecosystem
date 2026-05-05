import { IEvidence } from "@/shared/interfaces/evidence/IEvidence";
import { IEvidenceUsageHistory } from "@/shared/interfaces/evidence/IEvidenceUsageHistory";
import { ITaskDetailEvidence } from "@/shared/interfaces/evidence/ITaskDetailEvidence";

import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

// Ví dụ tạo service
const CONTROLLER = "eaq/EAQEvidence";

export const service_EAQEvidence = {
  // Đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<BaseEntity>(CONTROLLER, axiosInstance),
  getEvidencesByStandardSetId: (params: { standardSetId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IEvidence[]>>(
      CONTROLLER + "/GetEvidencesByStandardSetId",
      { params }
    );
  },
  getForecastEvidenceByCriteriaAssignmentId: (params: {
    criteriaAssignmentId?: number;
  }) => {
    return axiosInstance.get<CustomApiResponse<ITaskDetailEvidence[]>>(
      CONTROLLER + "/getCriteriaAssignmentByCriteriaAssignmentId",
      { params }
    );
  },

  createForecastEvidence: (data: ITaskDetailEvidence) => {
    return axiosInstance.post<CustomApiResponse<ITaskDetailEvidence>>(
      CONTROLLER + "/createForecastEvidence",
      data
    );
  },

  updateForecastEvidence: (data: ITaskDetailEvidence) => {
    return axiosInstance.post<CustomApiResponse<ITaskDetailEvidence>>(
      CONTROLLER + "/updateForecastEvidence",
      data
    );
  },
  GetAllEvidences: () => {
    return axiosInstance.get<CustomApiResponse<IEvidence[]>>(
      CONTROLLER + "/GetAllEvidences"
    );
  },

  GetEvidencesByStandardSetId: (params: { standardSetId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IEvidence[]>>(
      CONTROLLER + "/GetEvidencesByStandardSetId",
      { params }
    );
  },
  GetEvidenceUsageHistories: (params: {
    eaqEvidenceId?: number;
  }) => {
    return axiosInstance.get<CustomApiResponse<IEvidenceUsageHistory[]>>(
      CONTROLLER + "/GetEvidenceUsageHistories",
      { params }
    );
  },

  getEvidenceUsageByEAQLimitationId: (params: { eaqLimitationId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IEvidence[]>>(
      CONTROLLER + "/GetEvidenceUsageByEAQLimitationId",
      { params }
    );
  },

  deleteListEAQEvidenceUsageHistory: (data: { id: number; isEnabled: boolean }[]) => {
    return axiosInstance.post<CustomApiResponse<IEvidence>>(
      CONTROLLER + "/DeleteListEAQEvidenceUsageHistory",
      data
    );
  },
  getEvidenceUsageByEAQRequirementId: (params: {

    eaqRequirementId?: number;

  }) => {

    return axiosInstance.get<CustomApiResponse<IEvidence[]>>(

      CONTROLLER + "/GetEvidenceUsageByEAQRequirementId",

      { params }

    );

  },
};
