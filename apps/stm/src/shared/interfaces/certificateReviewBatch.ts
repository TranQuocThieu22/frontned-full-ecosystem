import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { Certificate } from "./certificate";
import { Exam } from "./exam";

export interface CertificateReviewBatch extends BaseEntity {
    certificate?: Certificate;
    certificateId?: number;
    conditionPass?: boolean;
    examIds?: number[];
    exams?: Exam[];
}
