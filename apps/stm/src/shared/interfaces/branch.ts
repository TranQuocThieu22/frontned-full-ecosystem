import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SkillCenter } from "./skillCenter";

export interface Branch extends BaseEntity {
    note?: string;
    location?: string;
    skillCenterId?: number;
    skillCenter?: SkillCenter;
}
