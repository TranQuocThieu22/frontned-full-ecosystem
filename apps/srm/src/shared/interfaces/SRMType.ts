import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMLevel } from "./SRMLevel";

export interface SRMType extends BaseEntity {
    isDeactivate?: boolean;
    note?: string;
    workingHours?: number;
    point?: number;
    srmLevelId?: number;
    srmLevel?: SRMLevel;

    // For import/export
    srmLevelCode?: string;
}