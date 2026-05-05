import { SRMAcceptanceContract } from "@/shared/interfaces/SRMAcceptanceContract";
import { SRMAcceptanceCouncil } from '@/shared/interfaces/SRMAcceptanceCouncil';
import { SRMConclusion } from "@/shared/interfaces/SRMConclusion";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = '/srm/SRMAcceptanceCouncil';

export const acceptanceCouncilService = {
    ...createBaseApi<SRMAcceptanceCouncil>(CONTROLLER, axiosInstance),

    GetAllByAcademicYearAndType: (params: { academicYearId: number, type?: number, pageNumber?: number, pageSize?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMAcceptanceCouncil[]>>(`${CONTROLLER}/GetAllByAcademicYearAndType`, {
            params: params
        })
    },

    GetSRMContractAcceptance: (params: { academicYearId: number, type?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMAcceptanceCouncil[]>>(`${CONTROLLER}/GetSRMContractAcceptance`, {
            params: params
        })
    },

    getAcceptanceContract: (params: { AcademicYearId?: number, Type?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMAcceptanceContract[]>>(CONTROLLER + '/GetAcceptanceContract', {

            params: params
        })
    },

    getConclusionByAcceptanceCouncilId: (params: { AcceptanceCouncilId?: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMConclusion[]>>(`${CONTROLLER}/GetConclusionByAcceptanceCouncilId`, {
            params: params
        })
    },

    updateSRMAcceptanceContract: (body?: SRMAcceptanceContract) => {
        return axiosInstance.post<CustomApiResponse<SRMAcceptanceContract>>(`${CONTROLLER}/UpdateSRMAcceptanceContract`, body)
    },

    getContractAccepted: (params: { AcademicYearId: number }) => {
        return axiosInstance.get<CustomApiResponse<SRMAcceptanceCouncil[]>>(`${CONTROLLER}/GetSRMContractAccepted`, {
            params: params
        })
    },
};
