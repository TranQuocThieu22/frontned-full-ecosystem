import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface Subject extends BaseEntity {
    note?: string;
    evaDifficultyId?: number;
}
