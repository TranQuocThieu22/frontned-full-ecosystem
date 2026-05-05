import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Class } from "./Class";

export interface ClassStudent extends BaseEntity {
  order?: number,
  gender?: number,
  fullName?: string,
  dateOfBirth?: Date,
  coeCourseSectionId?: number,
  coeCourseSection?: Class
  email?: string,
  phoneNumber?: string,
  address?: string,
  avatarPath?: string,
}