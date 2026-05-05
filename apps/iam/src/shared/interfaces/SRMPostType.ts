import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMPostType extends BaseEntity {
  description?: string;
  status?: string;
  isDeactivate?: boolean;
  note?: string | null;
  workingHours?: number;
  point?: number;
  postCategory?: number;
}
