import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COEPI } from "./COEPI";

export interface COECLOPI extends BaseEntity {
    coecloId?: number,
    coepiId?: number,
    rating?: number,
    coepi?: COEPI;
}