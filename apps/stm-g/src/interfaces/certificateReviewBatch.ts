import { IBaseEntity } from "aq-fe-framework/interfaces"
import { ICertificate } from "./certificate"
export interface ICertificateReviewBatch extends IBaseEntity {
    certificate?: ICertificate
}