import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMPublication extends BaseEntity {
    order?: number;
    note?: string;
}