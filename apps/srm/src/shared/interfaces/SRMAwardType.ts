import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMAwardType extends BaseEntity {
    isDeactivate?: boolean;
    note?: string;
    modifiedBy?: number;
    order?: number;
    srmAwardLevelId?: number;

    srmAwardLevelCode?: string;
}
