import { EventComplaint } from "@/interfaces/eventComplaint";
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLLER = "/EventComplaint"


interface Params {
  facultyId?: number
  status?: number
}

export const service_eventComplaint = {
  ...createBaseApi<EventComplaint>(CONTROLLLER, axiosInstance),

  getEventComplaint: (params?: Params) => {
    return axiosInstance.get<CustomApiResponse<EventComplaint[]>>(`${CONTROLLLER}/GetEventComplaint`, { params })
  },

  getStudentEventComplaint: (params?: Params) => {
    return axiosInstance.get<CustomApiResponse<EventComplaint[]>>(`${CONTROLLLER}/StudentEventComplaint`, { params })
  },

  complaintProcess: (body: EventComplaint) => {
    return axiosInstance.post<CustomApiResponse<void>>(`${CONTROLLLER}/ComplaintProcess`, body)
  }
}
