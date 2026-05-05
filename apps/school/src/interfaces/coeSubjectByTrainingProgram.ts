import { IBaseEntity } from "aq-fe-framework/interfaces";
import { ICoeTrainingProgram } from "./coeTrainingProgram";
import { ICoeSubjectGroup } from "./coeSubjectGroup";
import { ICoeSemester } from "./coeSemester";
import { ICoeSubject } from "./coeSubject";

export interface ICoeSubjectByTrainingProgram extends IBaseEntity {
    coeGradeId?: number,
    coeSubjectId: number | 0,
    coeSemesterId?: number,
    coeSubjectGroupId?: number,
    // ordinal?: number,
    coeTrainingProgram?: ICoeTrainingProgram,
    coeSubject?: ICoeSubject,
    coeSemester?: ICoeSemester,
    coeSubjectGroup?: ICoeSubjectGroup,
    order: number | 0
}