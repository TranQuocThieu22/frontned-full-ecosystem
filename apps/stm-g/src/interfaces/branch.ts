import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ISkillCenter } from "./skillCenter"

export interface IBranch extends IBaseEntity {
    note?: string
    location?: string
    skillCenterId?: number,
    skillCenter?: ISkillCenter
}