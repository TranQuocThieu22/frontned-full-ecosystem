

import { IAssessmentCouncilDecision } from "@/shared/interfaces/assessmentCouncilDecision/IAssessmentCouncilDecision";
import { ICouncilGroup } from "@/shared/interfaces/assessmentCouncilDecision/ICouncilGroup";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "eaq/EAQAssessmentCouncilDecision";

export const service_EAQAssessmentCouncilDecision = {
  // Ở đây đã tạo sẵn các Axios gồm interface: GetAll, Create, Update, CreateOrUpdate, Delete.
  ...createBaseApi<IAssessmentCouncilDecision>(CONTROLLER, axiosInstance),
  getAllByStandardSetId: (params: { EAQStandardSetId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IAssessmentCouncilDecision[]>>(
      CONTROLLER + '/GetAllByEAQStandardSetId',
      { params }
    );
  },
  getAllEAQCouncilGroupByEAQAssessmentCouncilDecisionId: (params: {
    EAQAssessmentCouncilDecisionId?: number;
  }) => {
    return axiosInstance.get<CustomApiResponse<ICouncilGroup[]>>(
      CONTROLLER + '/GetEAQCouncilGroupByEAQAssessmentCouncilDecisionId',
      { params }
    );
  },

  getAllByEAQStandardSetId: (eaqStandardSetId: number) => {
    return axiosInstance.get<CustomApiResponse<IAssessmentCouncilDecision[]>>(
      `${CONTROLLER}/GetAllByEAQStandardSetId`,
      {
        params: {
          eaqStandardSetId: eaqStandardSetId,
        },
      }
    );
  },

  findByStandardSetId: (params: { standardSetId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IAssessmentCouncilDecision[]>>(
      CONTROLLER + '/FindByGradeId',
      { params }
    );
  },

  GetEAQAssessmentCouncilDecisionsByEAQPhaseId: (params: { eaqPhaseId?: number }) => {
    return axiosInstance.get<CustomApiResponse<IAssessmentCouncilDecision[]>>(
      CONTROLLER + '/GetEAQAssessmentCouncilDecisionsByEAQPhaseId',
      { params }
    );
  },

  //** 22/08/2025 update api name, by Hào Nguyễn */
};
