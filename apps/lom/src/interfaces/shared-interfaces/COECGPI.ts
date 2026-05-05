import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface COECGPI extends BaseEntity {
    coepiId?: number,
    coecgId?: number,
    rating?: number,
    coepi?: any; //ICoePI
}