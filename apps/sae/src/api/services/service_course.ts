import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Course } from "@/interfaces/course";
import { CourseSection } from "@/interfaces/courseSection";
import { CourseTimeClusters } from "@/interfaces/courseTimeClusters";
import { createBaseApi, CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";

const CONTROLLER = 'Course'

export interface Course_GetStudent extends BaseEntity {
    user: User
    courseSection?: CourseSection
    courseTimeCluster?: CourseTimeClusters
    receiptType?: number
    receiptCode?: string
    receiptPrice?: string
    receiptLink?: string
    isCheck?: boolean
    note?: string
}

interface Body extends BaseEntity {
    courseSectionId?: number
    courseTimeCluster?: CourseTimeClusters
}

interface Params extends BaseEntity {
    searchText?: string
}

export const service_course = {
    ...createBaseApi<Course>(`${CONTROLLER}`, axiosInstance),

    get: (params: Params) => {
        return axiosInstance.get<CustomApiResponse<Course[]>>(`${CONTROLLER}/Get`, { params })
    },

    getStudent: (body: Body) => {
        return axiosInstance.post<CustomApiResponse<Course_GetStudent[]>>(`${CONTROLLER}/GetStudent`, body)
    }
}
