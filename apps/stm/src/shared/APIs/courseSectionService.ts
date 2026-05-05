import { ICourseSectionViewModel } from "@/features/admin/completeCourseSection/interfaces";
import { CourseSection } from "@/shared/interfaces/courseSection";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/CourseSection";

export interface CourseSectionGetScheduleBody {
    PageSize?: number;
    PageNumber?: number;
    lecturerId?: number;
    courseSectionId?: number;
    addressId?: number;
    startDate?: string;
    endDate?: string;
}

export interface CourseSectionGetAllBody {
    courseTimeClusterIds: number[];
    courseSectionId: number;
    programId: number;
    status: number;
    type?: number;
    courseIds: number[];
    examIds?: number[];
    pageSize: number;
    pageNumber: number;
}

export const courseSectionService = {
    ...createBaseApi<CourseSection>(CONTROLLER, axiosInstance),

    ScheduleDetail: ({ param = "" }: { param?: string }) =>
        axiosInstance.get<CustomApiResponse<unknown>>(CONTROLLER + `/ScheduleDetail?${param}`),

    getSchedule: (body: CourseSectionGetScheduleBody) =>
        axiosInstance.post<CustomApiResponse<unknown[]>>(CONTROLLER + "/GetSchedule", body),

    get: <T = ICourseSectionViewModel>(body: CourseSectionGetAllBody) =>
        axiosInstance.post<CustomApiResponse<T[]>>(CONTROLLER + "/Get", body),
};
