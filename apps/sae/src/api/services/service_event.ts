import { Event } from "@/interfaces/event";
import { EventFile } from "@/interfaces/eventFile";
import { EventRegister } from "@/interfaces/eventRegister";
import { Standard } from "@/interfaces/standard";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

const CONTROLLLER = "/Event";

export interface EventCreate {
  code?: string;
  eventGroupId?: number; // Nhóm hoạt động
  facultyId?: number; // Khoa
  futurePlanId?: number; // Kế hoạch tương lai
  isTemplate?: boolean;
  maxPoint?: number;
  minPoint?: number;
  quantity?: number; // Số lượng sinh viên dự kiến
  host?: number; // Đơn vị tổ chức
  session?: number; // Buổi
  name?: string; // Nội dung hoạt động
  address?: number; // Địa điểm tổ chức
  completedBy?: number; // Đơn vị công nhận
  reviewedBy?: number; // Đơn vị ghi nhận
  standardId?: number; // Điều
  endDate?: Date; // Ngày kết thúc
  startDate?: Date; // Ngày bắt đầu
}

interface BodyOnPlan extends BaseEntity {
  standardId?: number;
  host?: number;
  facultyId?: number;
  activityPlanId?: number;
  startDate?: string;
  endDate?: string;
  // isOrganization: boolean;
  pageNumber?: number;
  pageSize?: number;
}

interface Params {
  standardId?: number;
  searchText?: string;
  pageSize?: number;
  pageNumber?: number;
}

interface BodyGetFile {
  filePath: string;
}

interface ParamsEventCompleted {
  eventId: number;
}

export interface BodyImportParticipate {
  studentCode: string;
  point: number;
}

interface ParamsImportParticipate {
  eventId: number;
  isDelete?: boolean;
}

interface BodyEventAddFile {
  fileData: any[];
}

interface ParamsEventAddFile {
  eventId: number;
}

export interface BodyEventRegister {
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  modifiedWhen?: string;
  modifiedBy?: number;
  eventId?: number;
  registerType?: number;
  facultyIds?: number[];
  majorIds?: number[];
  classIds?: number[];
  studentIds?: number[];
}

export interface BodyDeleteEventRegister {
  eventId?: number;
  facultyIds?: number[];
  majorsIds?: number[];
  classIds?: number[];
  studentIds?: number[];
}
export interface UpdateExternalFuturePlan {
  eventId?: number;
  approvalStatus?: number;
  isSentMail?: boolean;
  message?: string;
}
export interface ParamsGetStudentRegis {
  standardid: number
}

export const service_event = {
  ...createBaseApi<Event>(CONTROLLLER, axiosInstance),

  createList: (body: Event[]) => {
    return axiosInstance.post<CustomApiResponse<Event[]>>(`${CONTROLLLER}/CreateList`, body);
  },

  createFutureEvent: (body: Event) => {
    return axiosInstance.post<CustomApiResponse<Event>>(`${CONTROLLLER}/CreateFutureEvent`, body);
  },
  ExternalCreateFutureEvent: (body: Event) => {
    return axiosInstance.post<CustomApiResponse<Event>>(`${CONTROLLLER}/ExternalCreateFutureEvent`, body);
  },

  CreateEvent: (body: Event) => {
    return axiosInstance.post<CustomApiResponse<Event>>(`${CONTROLLLER}/CreateEvent`, body);
  },

  createEventRequired: (body: Event) => {
    return axiosInstance.post<CustomApiResponse<Event>>(`${CONTROLLLER}/CreateEventRequired`, body);
  },

  getEventOnPlan: (body: BodyOnPlan) => {
    return axiosInstance.post<CustomApiResponse<Event[]>>(`${CONTROLLLER}/EventOnPlan`, body);
  },
  getEventOnPlanForLectureOfClass: (body: BodyOnPlan) => {
    return axiosInstance.post<CustomApiResponse<Event[]>>(`${CONTROLLLER}/EventOnPlanForLectureOfClass`, body);
  },
  getEventOnPlanForSubLecture: (body: BodyOnPlan) => {
    return axiosInstance.post<CustomApiResponse<Event[]>>(`${CONTROLLLER}/EventOnPlanForSubLecture`, body);
  },

  getEventOnPlanForActivityAttendance: (body: BodyOnPlan) => {
    return axiosInstance.post<CustomApiResponse<Event[]>>(`${CONTROLLLER}/EventOnPlanForActivityAttendance`, body);
  },

  getEventRequiredOnPlan: (body: BodyOnPlan) => {
    return axiosInstance.post<CustomApiResponse<Event[]>>(`${CONTROLLLER}/EventRequiredOnPlan`, body);
  },
  getEventOnPlanForPointRecord: (body: BodyOnPlan) => {
    return axiosInstance.post<CustomApiResponse<Event[]>>(`${CONTROLLLER}/EventOnPlanForPointRecord`, body);
  },
  getEventOnPlanForCompleted: (body: BodyOnPlan) => {
    return axiosInstance.post<CustomApiResponse<Event[]>>(`${CONTROLLLER}/EventOnPlanForCompleted`, body);
  },

  getEventRequired: (params: Params) => {
    return axiosInstance.get<CustomApiResponse<Event[]>>(`${CONTROLLLER}/EventRequired`, { params: params });
  },

  getFile: (body: BodyGetFile) => {
    return axiosInstance.get<CustomApiResponse<EventFile>>(`${CONTROLLLER}/GetFile`, { params: body });
  },

  getStudentRegis: (params?: ParamsGetStudentRegis) => {
    return axiosInstance.get<CustomApiResponse<Standard[]>>(`${CONTROLLLER}/StudentRegis`, { params: params })
  },

  eventCompleted: (params: ParamsEventCompleted) => {
    return axiosInstance.post<CustomApiResponse<Event>>(`${CONTROLLLER}/EventCompleted`, null, { params: params });
  },

  eventVerify: (params: ParamsEventCompleted) => {
    return axiosInstance.post<CustomApiResponse<Event>>(`${CONTROLLLER}/EventVerify`, null, { params: params });
  },

  importParticipate: (params: ParamsImportParticipate, body: BodyImportParticipate[]) => {
    return axiosInstance.post<CustomApiResponse<Event>>(`${CONTROLLLER}/ImportParticipate`, body, { params: params });
  },

  eventAddFile: (params: ParamsEventAddFile, body: BodyEventAddFile) => {
    return axiosInstance.post<CustomApiResponse<Event>>(`${CONTROLLLER}/EventAddFile`, body, { params: params });
  },
  GetNotApprovedEventOnPlan: (body: BodyOnPlan) => {
    return axiosInstance.post<CustomApiResponse<Event[]>>(`${CONTROLLLER}/GetNotApprovedEventOnPlan`, body);
  },
  getEventRegisterByEventId: (params: { eventId: number }) => {
    return axiosInstance.post<CustomApiResponse<EventRegister>>(`${CONTROLLLER}/GetEventRegisterByEventId`, null, { params: params });
  },
  createEventRegister: (body: BodyEventRegister) => {
    return axiosInstance.post<CustomApiResponse<EventRegister>>(`${CONTROLLLER}/CreateEventRegister`, body);
  },
  deleteListEventRegisters: (body: BodyDeleteEventRegister) => {
    return axiosInstance.post<CustomApiResponse<EventRegister>>(`${CONTROLLLER}/DeleteListEventRegisters`, body);
  },
  UpdateExternalFuturePlan: (body: UpdateExternalFuturePlan) => {
    return axiosInstance.post<CustomApiResponse<EventRegister>>(`${CONTROLLLER}/UpdateExternalFuturePlan`, body);
  },
};
