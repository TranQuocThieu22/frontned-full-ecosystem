import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";import { Majors } from "./majors";

export interface Class extends BaseEntity {
  aqClassId?: number;
  majorsId?: number;
  majors?: Majors;
}
