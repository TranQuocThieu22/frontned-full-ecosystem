import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMTitle extends BaseEntity {
    isDeactivate?: boolean;
    note?: string;
    isLeader?: boolean;
    type?: number;
    isDeactivateValue?: number; // For import
    isLeaderValue?: number; // For import
}