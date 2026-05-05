import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface EmailTemplate extends BaseEntity {
    order: number;
    body: string;
    type: number;
    aqModuleId: number;
}
