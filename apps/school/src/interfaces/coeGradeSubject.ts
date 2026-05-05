import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ICoeSubjectFormula } from "./coeSubjectFormula"
import { ICoeCG } from "./coeCG"
import { ICoeGrade } from "./coeGrade"
import { ICoeSubject } from "./coeSubject"
import { ICoeSemester } from "./coeSemester"
import { ICoeSubjectGroup } from "./coeSubjectGroup"
import { ICoeSubjectAssessment } from "./coeSubjectAssessment"

export interface ICoeGradeSubject extends IBaseEntity {
    coeGradeId?: number
    coeSubjectId?: number
    coeSemesterId?: number
    coeSubjectGroupId?: number
    order?: number
    isCore?: boolean | null,
    courseSectionQuantity?: number
    courseSectionQuantityActual?: number
    coecGs?: ICoeCG[]
    coeSubjectFomulas?: ICoeSubjectFormula[]
    coeGrade?: ICoeGrade
    coeSubject?: ICoeSubject
    coeSemester?: ICoeSemester
    coeSubjectGroup?: ICoeSubjectGroup
    coeSubjectAssessments?: ICoeSubjectAssessment[]
}