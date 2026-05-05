import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { ICouncilGroupMemberCreate } from "./ICouncilGroupMemberCreate";

export interface ICouncilGroup extends BaseEntity {
    eaqAssessmentCouncilDecisionId?: number;
    eaqCouncilGroupMembers?: ICouncilGroupMemberCreate[];
}
