import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface Topic extends BaseEntity {
    note?: string;
    evaSubjectId?: number;
}