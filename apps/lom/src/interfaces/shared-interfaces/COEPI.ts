import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { COEPLO } from "./COEPLO";

export interface COEPI extends BaseEntity {
    order?: number
    description?: string
    densityPI?: number
    coeploId?: number
    coeplo?: COEPLO
    /** props bổ sung cho data import */
    coeplocode?: string
}

/** interface cho import */
export interface COEPIImport extends BaseEntity {
    description?: string
    densityPI?: number
    ploCode?: string
    coeGradeId?: number
}