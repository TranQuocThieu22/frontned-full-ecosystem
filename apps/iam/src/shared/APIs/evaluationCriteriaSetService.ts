import { SRMEvaluationCriteriaSet } from "@/shared/interfaces/SRMEvaluationCriteriaSet";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMEvaluationCriteriaSet";

export const evaluationCriteriaSetService = {
  ...createBaseApi<SRMEvaluationCriteriaSet>(CONTROLLER, axiosInstance),
  getAllByCouncilType: (params: { CouncilType: number, pageSize?: number, pageNumber?: number, cols?: string }) => {
    return axiosInstance.get<CustomApiResponse<SRMEvaluationCriteriaSet[]>>(`${CONTROLLER}/getAllByCouncilType`, { params: params })
  }
};
