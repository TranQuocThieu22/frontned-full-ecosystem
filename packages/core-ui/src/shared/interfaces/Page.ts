import { AQFileDetail } from "./AQFileDetail";
import { BaseEntity } from "./BaseEntity";

export interface Page extends BaseEntity {
    documentFilePath?: string
    description?: string
    link?: string
    pageDocumentFileDetail?: AQFileDetail
}