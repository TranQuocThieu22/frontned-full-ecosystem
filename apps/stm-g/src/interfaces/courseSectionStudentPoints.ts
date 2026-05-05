import { IBaseEntity } from "aq-fe-framework/interfaces"
export interface ICourseSectionStudentPoints extends IBaseEntity {
    point?: number,
    scoreConfigId?: number
}