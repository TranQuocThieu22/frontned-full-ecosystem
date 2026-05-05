import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMRecipient } from "./SRMRecipient";

export interface SRMResearchAnnouncement extends BaseEntity {
  content?: string;
  attachFilePath?: string;
  promulgation_date?: string;
  startDate?: string;
  endDate?: string;
  sent_email?: boolean;
  targetAudience?: string
  isSentMail?: boolean
  recipients?: SRMRecipient[]
}