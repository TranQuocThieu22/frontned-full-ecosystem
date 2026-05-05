import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ICriteria } from "../criteria/Criteria";
import { IStandard } from "../standard/Standard";

export interface IImprovementConstaints extends BaseEntity {
    standard?: IStandard;
    criteria?: ICriteria;
    weaknessCode?: string; // Mã khu vực
    weaknessName?: string;
    hostingOrganization?: string;
    /** Nguoi phu trach */
    affiliatedPersonel?: string;
}
