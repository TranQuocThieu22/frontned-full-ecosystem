import { Course } from "@/shared/interfaces/course";
import { CourseRegistration } from "@/shared/interfaces/courseRegistration";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

// Note: backend endpoints for Course are capitalized (e.g. /Course/Get)
const CONTROLLER = "/Course";

export interface CourseGetListBody {
    courseTimeClusterIds: number[];
    courseSectionId: number;
    programId: number;
    status: number;
    type: number;
    courseIds: number[];
    examIds: number[];
    pageSize: number;
    pageNumber: number;
    lecturerId: number;
    skillCenterId: number;
}

export interface CourseRegistrationCheckItem {
    id?: number;
    code?: string;
    concurrencyStamp?: string;
    isCheck?: boolean;
    name?: string;
    isEnabled?: boolean;
    note?: string;
}

export const courseService = {
    ...createBaseApi<Course>(CONTROLLER, axiosInstance),

    getList: (body: CourseGetListBody) =>
        axiosInstance.post<CustomApiResponse<Course[]>>(CONTROLLER + "/Get", body),

    courseRegistrationCheck: (body: CourseRegistrationCheckItem[]) =>
        axiosInstance.post<CustomApiResponse<unknown>>(CONTROLLER + "/CourseRegistrationCheck", body),

    courseRegistration: (body: CourseRegistration[]) =>
        axiosInstance.post<CustomApiResponse<unknown>>(CONTROLLER + "/CourseRegistration", body),

    courseRegistrationUpdate: (body: CourseRegistration) =>
        axiosInstance.post<CustomApiResponse<unknown>>(CONTROLLER + "/courseRegistration/update", body),
};
