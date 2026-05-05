import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface Page extends BaseEntity {
  order: number;
  groupOrder: number;
  modifiedWhen: string;
  modifiedBy: number;
  modifiedFullName: string;
}
