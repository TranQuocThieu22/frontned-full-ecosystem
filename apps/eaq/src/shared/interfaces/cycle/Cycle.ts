import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface Cycle extends BaseEntity {
    order?: number
    startYear?: number
    eaqStandardSetTrainingProgramId?: number
}
