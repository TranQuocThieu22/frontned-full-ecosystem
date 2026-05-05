import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { IRule } from "../rule/IRule";
import { IUser } from "../user/IUser";

export interface ICouncilMembers extends BaseEntity {
    type: number | null,
    eaqAssessmentCouncilDecisionId: number | null,
    userId: number | null,
    eaqRuleId: number | null,
    eaqCouncilGroupId: number | null,
    eaqRule: IRule | null,
    user: IUser | null
}
