import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface COECG extends BaseEntity {
   order?: number,
   description?: string;
   coeGradeSubjectId?: number;
   coeGradeSubject?: any; //ICoeGradeSubject
   coeCGPIs?: any[], //ICoeCGPI
   coeCLOs?: any[], //ICoeCLO
}