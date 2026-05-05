import { Department } from "@/interfaces/department"
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLLER = "/Department"

export const service_department = {
  ...createBaseApi<Department>(CONTROLLLER, axiosInstance),

  getDepartmentOnly: () => {
    return axiosInstance.get<CustomApiResponse<Department[]>>(`${CONTROLLLER}/DepartmentOnly`)
  },

  getWorkingUnit: () => {
    return axiosInstance.get<CustomApiResponse<Department[]>>(`${CONTROLLLER}/GetWorkingUnit`)
  }

}
