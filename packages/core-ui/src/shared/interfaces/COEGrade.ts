import { ActivityPlan } from './ActivityPlan';
import { BaseEntity } from './BaseEntity';
import { COEProgram } from './COEProgram';

export interface COEGrade extends BaseEntity {
    coeProgram?: COEProgram
    activityPlanEnd?: ActivityPlan
    activityPlanStart?: ActivityPlan
}
