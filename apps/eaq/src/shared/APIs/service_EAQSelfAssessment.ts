import { IReviewSelfAssessment } from "@/shared/interfaces/selfAssessment/IReviewSelfAssessment";
import { ISelfAssessment } from "@/shared/interfaces/selfAssessment/ISelfAssessment";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";


const CONTROLLER = "/eaq/EAQSelfAssessment";

export const service_EAQSelfAssessment = {
  ...createBaseApi<ISelfAssessment>(CONTROLLER, axiosInstance),
  getSelfAssessmentsByType: (params: { taskDetailId?: number, selfAssessmentType?: number }) => {
    return axiosInstance.get<CustomApiResponse<ISelfAssessment[]>>(
      CONTROLLER + `/GetSelfAssessmentsByType`, { params }
    );
  },
  getSelfAssessmentsByPhaseId: (params: { eaqPhaseId?: number, eaqTaskDetailId?: number, selfAssessmentType?: number }) => {
    return axiosInstance.get<CustomApiResponse<ISelfAssessment[]>>(
      CONTROLLER + `/GetSelfAssessmentsByPhaseId`, { params }
    );
  },
  getSelfAssessmentsByTrainingProgramId: (params: { trainingProgramId?: number, selfAssessmentType?: number }) => {
    return axiosInstance.get<CustomApiResponse<ISelfAssessment[]>>(
      CONTROLLER + `/GetSelfAssessmentsByTrainingProgramId`, { params }
    );
  },

  reviewEAQTaskDetailSelfAssessment: (body: IReviewSelfAssessment) => {
    return axiosInstance.post<CustomApiResponse<any[]>>(CONTROLLER + "/ReviewEAQTaskDetailSelfAssessment", body);
  },

  createOrUpdate: (body: ISelfAssessment) => {
    return axiosInstance.post<CustomApiResponse<ISelfAssessment>>(CONTROLLER + "/CreateOrUpdate", body);
  },
  assignReviewersEAQSelfAssessment: (body: IAssignReviewerEAQSelfAssessment[]) => {
    return axiosInstance.post<CustomApiResponse<ISelfAssessment>>(CONTROLLER + "/AssignReviewersEAQSelfAssessment", body);
  },
};

interface IAssignReviewerEAQSelfAssessment {
  id?: number,
  code?: string,
  name?: string,
  reviewerId?: number
}
