
import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMContractSuspend } from "@/shared/interfaces/SRMContractSuspend";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMContractSuspend"

export const contractSuspendService = {
  ...createBaseApi<SRMContractSuspend>(CONTROLLER, axiosInstance),
  GetAllByAcademicYear: (params: {
    academicYearId: number,
  }) => {
    return axiosInstance.get<CustomApiResponse<SRMContractSuspend[]>>(CONTROLLER + '/GetAllByAcademicYear', { params })
  },

  GetContractAmendment: (params: {
    academicYearId: number,
  }) => {
    return axiosInstance.get<CustomApiResponse<SRMContract[]>>(CONTROLLER + '/GetContractAmendment', { params })
  },


  UpdateContractSuspendProcessing: (body: SRMContractSuspend) => {
    return axiosInstance.post<CustomApiResponse<SRMContractSuspend>>(CONTROLLER + '/UpdateSRMContractSuspendProcessing', body)
  }
}

