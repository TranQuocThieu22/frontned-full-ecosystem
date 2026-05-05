import {BaseEntity} from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
export interface Faculty extends BaseEntity {
  hierarchyId?: number;
  aqFacultyId?: number | null;
  modifiedWhen?: string;
  modifiedBy?: number;
  modifiedFullName?: string;
}
