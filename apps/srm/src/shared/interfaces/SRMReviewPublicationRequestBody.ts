import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMReviewPublicationRequestBody extends BaseEntity {
    isSendMail?: boolean,
    review?: string,
    status?: number
}