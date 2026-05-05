import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface COEMITScale extends BaseEntity {
  knowledge?: string;
  skill?: string;
  autonomy?: string;
  description?: string | null;
}
