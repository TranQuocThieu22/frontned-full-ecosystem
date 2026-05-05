import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ImageDetail } from "./imageDetail";
import { SkillCenter } from "./skillCenter";

export interface Certificate extends BaseEntity {
    type?: number;
    link?: string;
    note?: string;
    imagePath?: string;
    skillCenterId?: number;
    imageDetail?: ImageDetail;
    skillCenter?: SkillCenter;
}
