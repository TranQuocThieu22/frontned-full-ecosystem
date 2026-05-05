import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Branch } from "./branch";
import { Program } from "./program";

export interface SkillCenter extends BaseEntity {
    note?: string;
    branch?: Branch[];
    program?: Program[];
}
