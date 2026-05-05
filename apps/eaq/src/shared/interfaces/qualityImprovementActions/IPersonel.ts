import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface IPersonel extends BaseEntity {
    accountCode?: string;
    fullname?: string;
    unit?: string;
}
