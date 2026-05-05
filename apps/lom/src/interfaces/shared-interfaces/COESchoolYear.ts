import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface COESchoolYear extends BaseEntity {
  startstring?: string;
  endstring?: string;
  startstringHC?: string;
  endstringHC?: string;
  note?: string;
  isCurrent?: boolean;
}
