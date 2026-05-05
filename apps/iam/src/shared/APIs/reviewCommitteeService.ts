
import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import { SRMCriteria } from "@/shared/interfaces/SRMCriteria";
import { SRMProposalMember } from "@/shared/interfaces/SRMProposalMember";
import { SRMReviewCommittee } from "@/shared/interfaces/SRMReviewCommittee";
import { SRMReviewProposal } from "@/shared/interfaces/SRMReviewProposal";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMReviewCommittee"

export const reviewCommitteeService = {
    ...createBaseApi<SRMReviewCommittee>(CONTROLLER, axiosInstance),
    getReviewCommitteeByAcademyYear: (params: { AcademyYearId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMReviewCommittee[]>>(`${CONTROLLER}/GetReviewCommitteeByAcademyYear`, {
            params: params
        })
    },
    getReviewProposalByAcademyYear: (params: { AcademyYearId?: number, pageSize?: number, pageNumber?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMReviewProposal[]>>(`${CONTROLLER}/GetReviewProposalByAcademyYear`, {
            params: params
        })
    },
    getSRMProposalMemberByReviewProposal: (params: { SRMReviewProposalId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMReviewProposal>>(`${CONTROLLER}/GetSRMProposalMemberBySReviewProposal`, {
            params: params
        })
    },
    getSRMCriteriaByReviewProposal: (params: { SRMReviewProposalId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMCriteria[]>>(`${CONTROLLER}/GetSRMCriteriaByReviewProposal`, {
            params: params
        })
    },
    getConclusionByReivewCommittee: (params: { SRMReviewCommitteeId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMConclusion[]>>(`${CONTROLLER}/GetConclusionByReivewComitee`, {
            params: params
        })
    },
    updateSRMReviewProposal: (body?: SRMReviewProposal) => {
        return axiosInstance.post<CustomApiResponse<SRMReviewProposal>>(`${CONTROLLER}/UpdateSRMReviewProposal`, body)
    },
    updateSRMProposalMember: (body?: SRMProposalMember[]) => {
        return axiosInstance.post<CustomApiResponse<SRMProposalMember[]>>(`${CONTROLLER}/UpdateSRMProposalMember`, body)
    }
}