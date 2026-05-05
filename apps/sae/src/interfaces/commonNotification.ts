import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Account } from "./account";

export interface CommonNotification extends BaseEntity {
  content?: string;
  recipientType?: number;
  sender?: string;
  sendTime?: Date;
  isMandatory?: boolean;
  isSendMail?: boolean;
  isSendEduGo?: boolean;
  type?: number;
  aqModuleId?: number;
  sentMailCount?: number;
  sentEduGoCount?: number;
  userNotifications?: UserNotification[];
  modifiedWhen?: string;
  modifiedBy?: number;
  modifiedFullName?: string;
}

export interface UserNotification extends BaseEntity {
  userId?: number;
  user?: Account;
  commonNotificationId?: number;
  isRead?: boolean;
  hasReceivedEmail?: boolean;
  hasReceivedEduGo?: boolean;
  modifiedWhen?: string;
  modifiedBy?: number;
}
