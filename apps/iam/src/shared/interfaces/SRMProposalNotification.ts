import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMArea } from "./SRMArea";
import { SRMNotificationRecipients } from "./SRMNotificationRecipients";
import { SRMNotificationTopic } from "./SRMNotificationTopic";

export interface SRMProposalNotification extends BaseEntity {
    issuedDate?: string,
    startDate?: string
    endDate?: string
    applicableResearchers?: string
    description?: string
    academicYearId?: number
    hasSentMail?: boolean
    area: SRMArea[]
    attachmentPath?: string
    attachmentDetail?: AQFileDetail
    srmNotificationRecipients?: SRMNotificationRecipients[]
    targetAudience?: string
    type?: number,
    srmNotificationTopics?: SRMNotificationTopic[]
}