import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COEGrade } from "./COEGrade";

export interface COETrainingProgram extends BaseEntity {
    coeGradeId?: number
    totalPeriods?: number
    totalCredit?: number
    coeGrade?: COEGrade
}