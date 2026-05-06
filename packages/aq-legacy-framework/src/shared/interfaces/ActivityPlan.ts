import { BaseEntity } from "./BaseEntity";

export interface ActivityPlan extends BaseEntity {
    semester?: number,
    startDate?: string,
    totalWeek?: number,
    isCurrent?: boolean,
    academicYearId?: number
}