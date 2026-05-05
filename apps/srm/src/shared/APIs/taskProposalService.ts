import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMTaskProposal";

export interface IUpdateProposalPrecheckBody {
  id: number;
  preliminaryStatus: number;
  preliminaryReview: string;
  preliminaryIsSentMail: boolean;
}

interface IGetAllByAcademyYearAndProposalStatusParams {
  AcademyYearId?: number;
  ProposalStatus?: number
  Type?: number;
  pageSize?: number;
  pageNumber?: number;
  cols?: string;
}

interface IGetAllByAcademicYearParams {
  academicYearId?: number;
  type?: number;
}

interface IGetTaskProposalFilterBody {
  academicYearId?: number;
  startDate?: string;
  endDate?: string;
}

export const taskProposalService = {
  ...createBaseApi<SRMTaskProposal>(CONTROLLER, axiosInstance),

  getAllByAcademicYear: (params: IGetAllByAcademicYearParams) => {
    return axiosInstance.get<CustomApiResponse<SRMTaskProposal[]>>(
      `${CONTROLLER}/GetAllByAcademicYear`, { params: params }
    );
  },

  getTaskProposalFilter: (data: IGetTaskProposalFilterBody) => {
    return axiosInstance.post<CustomApiResponse<SRMTaskProposal[]>>(
      `${CONTROLLER}/GetSRMTaskProposalFilter`, data
    );
  },

  updateProposalPrecheck: (data: IUpdateProposalPrecheckBody) => {
    return axiosInstance.post<CustomApiResponse<boolean>>(`${CONTROLLER}/UpdateProposalPrecheck`, data);
  },

  getAllByAcademyYearAndProposalStatus: (params: IGetAllByAcademyYearAndProposalStatusParams) => {
    return axiosInstance.get<CustomApiResponse<SRMTaskProposal[]>>(
      `${CONTROLLER}/GetAllByAcademyYearAndProposalStatus`, { params: params }
    );
  },

  getProposalToCouncil: (params: { AcademicYearId?: number, pageSize?: number, pageNumber?: number }) => {
    return axiosInstance.get<CustomApiResponse<SRMTaskProposal[]>>(
      `${CONTROLLER}/GetProposalToCouncil`, { params: params }
    );
  },
};