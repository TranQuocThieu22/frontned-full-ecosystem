import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SkillCenter } from "./skillCenter";

export interface UserSkillCenter extends BaseEntity {
  userId?: number;
  skillCenterId?: number;
  skillCenter?: SkillCenter;
}
