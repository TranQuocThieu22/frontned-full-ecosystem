import { UserStatusColor, UserStatusEnum, UserStatusLabel } from "../const/enum/EnumUserStatus";
import type { BaseEntity } from "@aq-fe/aq-core-framework/shared/interfaces/BaseEntity";

export { UserStatusColor, UserStatusEnum, UserStatusLabel };

export interface User extends BaseEntity {
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  gender?: number;
  identifier?: string
  phoneNumber?: string
  status?: UserStatusEnum

  // View
  name?: string
  tenantId?: string
}

