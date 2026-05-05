import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface EventGroup extends BaseEntity {
    eventNumber: number;
    isDefault: boolean;
}