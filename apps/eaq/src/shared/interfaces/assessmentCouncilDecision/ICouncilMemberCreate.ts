import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IAccount } from "../account/IAccount";

export interface ICouncilMemberCreate extends BaseEntity {
    type?: number;
    eaqAssessmentCouncilDecisionId?: number;
    userId?: number;
    eaqRuleId?: number;
    eaqCouncilGroupId?: number;
    user?: IAccount;
}
