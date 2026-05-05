import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COESemester } from "./COESemester";
import { COESubject } from "./COESubject";
import { COESubjectGroup } from "./COESubjectGroup";
import { COETrainingProgram } from "./COETrainingProgram";

export interface COESubjectByTrainingProgram extends BaseEntity {
    coeGradeId?: number,
    coeSubjectId: number | 0,
    coeSemesterId?: number,
    coeSubjectGroupId?: number,
    // ordinal?: number,
    coeTrainingProgram?: COETrainingProgram,
    coeSubject?: COESubject,
    coeSemester?: COESemester,
    coeSubjectGroup?: COESubjectGroup,
    order: number | 0
}