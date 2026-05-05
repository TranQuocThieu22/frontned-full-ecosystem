import { Account } from "@aq-fe/core-ui/shared/interfaces/Account";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface ICouncilGroupMemberCreate extends BaseEntity {
    userId?: number;
    eaqRuleId?: number;
    eaqCouncilGroupId?: number;
    user?: Account;
    timestampCreateOnUI?: number; // chỉ sử dụng ở FE
}
