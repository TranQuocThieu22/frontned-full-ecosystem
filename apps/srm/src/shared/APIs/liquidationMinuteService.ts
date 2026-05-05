import { SRMContract } from "@/shared/interfaces/SRMContract";
import { SRMLiquidationMinute } from "@/shared/interfaces/SRMLiquidationMinute";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/srm/SRMLiquidationMinute"

export const liquidationMinuteService = {
    ...createBaseApi<SRMContract>(CONTROLLER, axiosInstance),
    GetAllByAcademicYear: (params: {
        AcademicYearId: number,
    }) => {
        return axiosInstance.get<CustomApiResponse<SRMLiquidationMinute[]>>(CONTROLLER + '/GetAllByAcademicYear', { params })
    },
}