import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMPublicationType } from "./SRMPublicationType";

export interface SRMJournal extends BaseEntity {
    order?: number,
    note?: string,
    type?: number,
    isbn?: string,
    srmPublicationTypeId?: number,
    srmPublicationType?: SRMPublicationType,
}