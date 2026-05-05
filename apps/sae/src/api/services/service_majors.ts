import { Majors } from "@/interfaces/majors";
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLLER = "/Majors"

interface Params {
  searchText?: string
  pageSize?: number
  pageNumber?: number
}

export const service_majors = {
  ...createBaseApi<Majors>(CONTROLLLER, axiosInstance),

  findby: (params: Params) => {
    return axiosInstance.get<CustomApiResponse<Majors[]>>(`${CONTROLLLER}/Findby`, { params })
  }
}
