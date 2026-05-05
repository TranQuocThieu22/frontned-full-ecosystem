import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"
import { ClassStudent } from "./ClassStudent"
import { COEGrade } from "./COEGrade"

export interface COEClass extends BaseEntity {
  order?: number,
  coeGradeId?: number,
  totalStudent?: number,
  coeGrade?: COEGrade
  note?: string
  users?: ClassStudent[]
  egName?: string
}