import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { CertificateReviewBatch } from "./certificateReviewBatch";
import { Program } from "./program";

export interface Exam extends BaseEntity {
    examDate?: string;
    officialExamDate?: Date;
    certificateReviewBatch?: CertificateReviewBatch;
    certificateReviewBatchId?: number;
    startRegistrationDate?: string;
    programId?: number;
    program?: Program;
}
