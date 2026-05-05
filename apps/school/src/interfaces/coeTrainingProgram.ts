import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ICoeGrade } from "./coeGrade"

export interface ICoeTrainingProgram extends IBaseEntity {
    coeGradeId?: number
    totalPeriods?: number
    totalCredit?: number
    coeGrade?: ICoeGrade
}