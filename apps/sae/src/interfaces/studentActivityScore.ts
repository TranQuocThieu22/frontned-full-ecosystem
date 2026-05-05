import { ActivityPlan } from "@/interfaces/activityPlan";
import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";


export interface StudentActivityScore extends BaseEntity {
    eduStudentId: string;
    user?: Account;
    userId: number;
    activityPlan?: ActivityPlan;
    activityPlanId: number;
    averageScore: number;
    point: number;
    semesterGPA4: number;
    semesterGPA10: number;
    semesterCredit: number;
    cumulativeGPA4: number;
    cumulativeGPA10: number;
    cumulativeCredit: number;

}
