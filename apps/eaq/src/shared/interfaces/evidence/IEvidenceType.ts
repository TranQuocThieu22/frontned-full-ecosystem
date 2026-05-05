import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IDepartment } from "@/shared/interfaces/department/IDepartment";

export interface IEvidenceType extends BaseEntity {
  note?: string;
  departmentId?: number;
  department?: IDepartment;
}
