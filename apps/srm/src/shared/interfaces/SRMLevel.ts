import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMLevel extends BaseEntity {
    isDeactivate?: boolean;
    note?: string;
}