import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";import { Faculty } from "./faculty";

export interface Majors extends BaseEntity {
  aqMajorsId?: number;
  facultyId?: number;
  faculty?: Faculty | null;
}
