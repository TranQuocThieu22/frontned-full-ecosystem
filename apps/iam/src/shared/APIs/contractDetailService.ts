
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMContractDetail"

export const contractDetailService = {
    ...createBaseApi<SRMContractDetail>(CONTROLLER, axiosInstance),
    GetAllByAcademicYear: (params: {
        academicYearId: number,
        cols?: string[]
    }) => {
        return axiosInstance.get<CustomApiResponse<SRMContractDetail[]>>(CONTROLLER + '/GetAllByAcademicYear', {
            params: {
                academicYearId: params.academicYearId,
                cols: params.cols?.join(',')
            }
        })
    },
    UpdateContractDetailProcessing: (body: SRMContractDetail) => {
        return axiosInstance.post<CustomApiResponse<SRMContractDetail>>(CONTROLLER + "/UpdateContractDetailProcessing", body)
    },
    GetContractAmendment: (params: {
        academicYearId: number,
    }) => {
        return axiosInstance.get<CustomApiResponse<SRMContract[]>>(CONTROLLER + '/GetContractAmendment', { params })
    },
}


