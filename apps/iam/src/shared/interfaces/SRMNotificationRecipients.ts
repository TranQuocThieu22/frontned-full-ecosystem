import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"
import { SRMLecturer } from "./SRMLecturer"

export interface SRMNotificationRecipients extends BaseEntity {
    srmProposalNotificationId?: number
    userId?: number
    user?: SRMLecturer
}