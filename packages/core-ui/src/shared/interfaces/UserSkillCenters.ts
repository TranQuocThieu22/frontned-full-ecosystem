import { BaseEntity } from "./BaseEntity";

export interface UserSkillCenters extends BaseEntity {
    userId?: number,
    skillCenterId?: number
}