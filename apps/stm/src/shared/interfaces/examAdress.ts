import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Address } from "@/shared/interfaces/address";

export interface ExamAddress extends BaseEntity {
  address?: Address | null;
  addressId?: string;
}
