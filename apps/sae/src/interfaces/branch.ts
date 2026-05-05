import { SkillCenter } from "@/interfaces/account";
import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface Branch extends BaseEntity {
    location?: string,
    note?: string,
    skillCenterId?: number,
    skillCenter?: SkillCenter;

}
