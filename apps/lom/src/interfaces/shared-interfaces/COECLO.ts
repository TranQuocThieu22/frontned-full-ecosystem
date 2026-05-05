import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface COECLO extends BaseEntity {
    order?: number,
    description?: string,
    coecgId?: number,
    coecg?: any, //ICoeCG
    densityCLO?: number,
    coeclopi?: any[], //ICoeCLOPI
    passedDensity?: number

    //for import
    coecgcode?: string
}

export interface COECLOImport extends BaseEntity {
    coeGradeSubjectId?: number
    cgcode?: string
    description?: string
    densityCLO?: number
    passedDensity?: number
}