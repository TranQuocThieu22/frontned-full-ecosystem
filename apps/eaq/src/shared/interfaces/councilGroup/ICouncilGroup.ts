import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface ICouncilGroup extends BaseEntity {
    // concurrencyStamp: string;
    // isEnabled: boolean;
    // modifiedWhen: Date;
    // modifiedBy: string;
    // modifiedFullName: string;
    order: number;
    eaqAssessmentCouncilDecisionId: number;
    eaqCouncilGroupMembers: any[];
}
