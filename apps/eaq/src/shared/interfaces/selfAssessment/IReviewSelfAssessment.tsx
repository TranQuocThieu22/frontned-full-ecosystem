import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface IReviewSelfAssessment extends BaseEntity {
    selfAssessmentTrackingStatus?: number;
    selfAssessmentReview?: string;
    isSendMailSelfAssessment?: boolean;
}
