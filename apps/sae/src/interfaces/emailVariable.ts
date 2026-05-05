import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface EmailVariable extends BaseEntity {
    order: number;
    aqModuleId: number;
    type: number;
}
