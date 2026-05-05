import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMTitle extends BaseEntity {
    isDeactivate?: boolean;
    note?: string;
    isLeader?: boolean;
    type?: number;
    isDeactivateValue?: boolean; // For import
    isLeaderValue?: boolean; // For import
}