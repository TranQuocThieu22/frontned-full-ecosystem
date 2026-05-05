import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMUnit extends BaseEntity {
    order?: number;
    unitType?: number;
    note?: string;
    unitId: string;
    unit: string;
}
