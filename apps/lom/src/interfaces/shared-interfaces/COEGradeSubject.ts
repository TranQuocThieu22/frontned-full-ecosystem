import { SemesterInfoViewModel } from "@/features/admin/Institution&Organization/Semester/semester-table"
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"
import { COECG } from "./COECG"
import { COEGrade } from "./COEGrade"
import { COEGradeSubjectMITPIs } from "./COEGradeSubjectMITPIs"
import { COESemester } from "./COESemester"
import { COESubject } from "./COESubject"
import { COESubjectAssessment } from "./COESubjectAssessment"
import { COESubjectFormula } from "./COESubjectFormula"
import { COESubjectGroup } from "./COESubjectGroup"
import { COESubjectGroupMITScale } from "./COESubjectGroupMITScale"

export interface COEGradeSubject extends BaseEntity {
    coeGradeId?: number
    coeSubjectId?: number
    coeSemesterId?: number
    coeSubjectGroupId?: number
    order?: number
    isCore?: boolean | null,
    courseSectionQuantity?: number
    courseSectionQuantityActual?: number
    coeCGs?: COECG[]
    coeSubjectFomulas?: COESubjectFormula[]
    coeGrade?: COEGrade
    coeSubject?: COESubject
    coeSemester?: COESemester
    coeSubjectGroup?: COESubjectGroup
    coeSubjectAssessments?: COESubjectAssessment[]
    CoeSubjectGroupMITScale?: COESubjectGroupMITScale[]
    coeGradeSubjectMITPIs?: COEGradeSubjectMITPIs[]
    activityPlanId?: number | null
    activityPlan?: SemesterInfoViewModel | null
    

    //Cập nhật lại sau
    armiValue?:any,

    teachingUnitId?:any,
    measureUnitId?:any,
    collectUnitId?:any,

    teachingUnit?:any,
    measureUnit?:any,
    collectUnit?:any,
    
    coeGradeSubjectPIs?:any,
    
    //for import
    subjectCode?: string,
    teachingUnitCode?:string,
    measureUnitCode?:string,
    collectUnitCode?:string,
}

export interface COEGradeSubjectImport extends BaseEntity {
    subjectCode?: string,
    teachingUnitCode?:string,
    measureUnitCode?:string,
    collectUnitCode?:string,
}