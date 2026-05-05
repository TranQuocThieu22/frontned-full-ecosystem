import { IExam } from "@/features/admin/ModuleExam/CRUDExam/Interfaces/ExamViewModel";
import { CourseSection } from "@/shared/interfaces/courseSection";
import { Exam } from "@/shared/interfaces/exam";
import { ExamAddress } from "@/shared/interfaces/examAdress";
import { ExamRegistration } from "@/shared/interfaces/examRegistration";
import axiosInstance from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { createBaseApi, CustomApiResponse, PagingParams } from "@aq-fe/core-ui/shared/libs/createBaseApi";

const CONTROLLER = "/Exam";

export interface ExamGetStudentBody extends BaseEntity {
  courseSectionId?: number;
  programId?: number;
  status?: number;
  examIds?: number[];
  pageNumber?: number;
  pageSize?: number;
}

export interface ExamRegistrationCheckItem extends BaseEntity {
  note?: string;
  isCheck?: boolean;
}

export interface ExamAddOrUpdateExamAddressItem extends BaseEntity {
  examId?: number;
  addressId?: string;
  address?: unknown;
}

export const examService = {
  ...createBaseApi<Exam>(CONTROLLER, axiosInstance),

  getStudent: (body: ExamGetStudentBody) =>
    axiosInstance.post<CustomApiResponse<CourseSection[]>>(
      CONTROLLER + "/GetStudent",
      body,
    ),

  getExamAddress: ({
    examId,
    paging,
  }: {
    examId?: string;
    paging?: PagingParams;
  }) =>
    axiosInstance.get<CustomApiResponse<ExamAddress[]>>(
      CONTROLLER + "/GetExamAddress?examId=" + examId,
      { params: paging },
    ),

  examRegistrationCheck: (body: ExamRegistrationCheckItem[]) =>
    axiosInstance.post<CustomApiResponse<unknown>>(CONTROLLER + "/ExamRegistrationCheck", body),

  examRegistration: (body: ExamRegistration[]) =>
    axiosInstance.post<CustomApiResponse<unknown>>(CONTROLLER + "/ExamRegistration", body),

  addOrUpdateExamAddress: (body: ExamAddOrUpdateExamAddressItem[]) =>
    axiosInstance.post<CustomApiResponse<unknown>>(CONTROLLER + "/AddOrUpdateExamAddress", body),

  getExamList: () =>
    axiosInstance.get<CustomApiResponse<IExam[]>>(CONTROLLER + "/GetExam"),
};

