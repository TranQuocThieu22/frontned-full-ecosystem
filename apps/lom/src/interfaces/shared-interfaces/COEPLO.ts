import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COEGrade } from "./COEGrade";
import { COEPI } from "./COEPI";

export interface COEPLO extends BaseEntity {
    coepIs?: COEPI[],
    description?: string,
    densityPLO?: number,
    passedDensity?: number,
    coeGradeId?: number,
    proficiency?: number,
    coeGrade?: COEGrade,
}