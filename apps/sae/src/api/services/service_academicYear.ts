import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { AcademicYear } from "@/interfaces/academicYear"
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = 'AcademicYear'

export const service_academicYear = {
    ...createBaseApi<AcademicYear>(`${CONTROLLER}`, axiosInstance),
    AcademicGetAll: () => {
        return axiosInstance.get<CustomApiResponse<AcademicYear[]>>(`${CONTROLLER}/AcademicGetAll`)
    },
}
