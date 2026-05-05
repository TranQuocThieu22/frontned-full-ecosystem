import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface SRMCompletedProduct extends BaseEntity {
    /** Tên tác giả */
    author?: string
    publicationYear?: number
    workTitle?: string
    journalName?: string
    issn?: string
    productType?: number
    attachmentPath?: string
    attachmentDetail?: AQFileDetail
    srmContractId?: number
}