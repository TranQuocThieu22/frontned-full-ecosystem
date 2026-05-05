
import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMEvaluationCommittee"

export const evaluationCommitteeService = {
    ...createBaseApi<SRMEvaluationCommittee>(CONTROLLER, axiosInstance),

    getSRMEvaluationTopicPass: (params: { AcademicYearId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMTopic[]>>(`${CONTROLLER}/GetSRMEvaluationTopicPass`, {
            params: params
        })
    },

    GetSRMEvaluationTopicProposal: (params: { AcademicYearId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMTopic[]>>(`${CONTROLLER}/GetSRMEvaluationTopicProposal`, {
            params: params
        })
    },

    GetAllByAcademicYearAndType: (params: { AcademicYearId?: number, type?: number, pageNumber?: number, pageSize?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMEvaluationCommittee[]>>(`${CONTROLLER}/GetAllByAcademicYearAndType`, {
            params: params
        })
    },

    getSRMEvaluationTopicProposal: (params: { AcademicYearId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMTopic[]>>(`${CONTROLLER}/GetSRMEvaluationTopicProposal`, {
            params: params
        })
    }
}

