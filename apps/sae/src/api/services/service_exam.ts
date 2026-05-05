import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";

import { CourseSection } from "@/interfaces/courseSection";
import { CourseTimeClusters } from "@/interfaces/courseTimeClusters";
import { Exam } from "@/interfaces/exam";
import {createBaseApi, CustomApiResponse} from "@aq-fe/core-ui/shared/libs/createBaseApi";
import {User} from "@aq-fe/core-ui/shared/interfaces/User";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

const CONTROLLLER = "/Exam"

export interface Exam_GetStudent extends BaseEntity {
  user: User
  courseSection?: CourseSection
  courseTimeCluster?: CourseTimeClusters
  receiptType?: number
  receiptCode?: string
  receiptPrice?: string
  receiptLink?: string
  isCheck?: boolean
  note?: string
  exam?: Exam
}
interface Body extends BaseEntity {
  courseSectionId?: number
  courseTimeCluster?: CourseTimeClusters
}

export const service_exam = {
  ...createBaseApi<Exam[]>(CONTROLLLER, axiosInstance),

  getStudent: (body: Body) => {
    return axiosInstance.post<CustomApiResponse<Exam_GetStudent[]>>(`${CONTROLLLER}/GetStudent`, body)
  }
}
