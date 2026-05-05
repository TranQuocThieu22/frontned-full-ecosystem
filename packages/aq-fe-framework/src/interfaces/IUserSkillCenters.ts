import { IBaseEntity } from "./IBaseEntity";

export interface IUserSkillCenters extends IBaseEntity {
    userId?: number,
    skillCenterId?: number
}