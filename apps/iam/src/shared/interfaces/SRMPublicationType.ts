import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMPublicationType extends BaseEntity {
    isDeactivate?: boolean;
    order?: number;
    note?: string;
    measurementUnit?: number;
    convertedHour?: number;
    convertedScore?: number;
    srmPublicationId?: number;
    srmPublication?: any;
}