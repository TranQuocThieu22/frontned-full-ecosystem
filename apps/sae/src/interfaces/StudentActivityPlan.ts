import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";import { StudentList } from "./account";

export interface StudentActivityPlan extends BaseEntity {
    userId: number,
    activityPlanId: number,
    user?: StudentList,
    subLecturerId?: number
}
