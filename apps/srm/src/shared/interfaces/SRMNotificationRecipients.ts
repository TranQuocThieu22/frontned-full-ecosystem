import { Account } from "@aq-fe/core-ui/shared/interfaces/Account"
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export interface SRMNotificationRecipients extends BaseEntity {
    srmProposalNotificationId?: number
    userId?: number
    user?: Account
}