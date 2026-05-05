import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomApiResponse } from "@aq-fe/core-ui/shared/libs/createBaseApi";
import { CourseSection } from "@/shared/interfaces/courseSection";
import { CourseTimeClusters } from "@/shared/interfaces/courseTimeClusters";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { User } from "@/shared/interfaces/user";

export interface CourseGetStudent extends BaseEntity {
  user: User;
  courseSection?: CourseSection;
  courseTimeCluster?: CourseTimeClusters;
  receiptType?: number;
  receiptCode?: string;
  receiptPrice?: string;
  receiptLink?: string;
  isCheck?: boolean;
  note?: string;
}

export interface CourseGetStudentBody extends BaseEntity {
  courseSectionId?: number;
  courseTimeCluster?: CourseTimeClusters;
  pageNumber?: number;
  pageSize?: number;
}

export const courseStudentService = {
  // CourseStudent không phải entity CRUD chuẩn, nên không dùng createBaseApi.
  getStudent: (body: CourseGetStudentBody) =>
    axiosInstance.post<CustomApiResponse<CourseGetStudent[]>>(
      "/Course/GetStudent",
      body,
    ),
};


