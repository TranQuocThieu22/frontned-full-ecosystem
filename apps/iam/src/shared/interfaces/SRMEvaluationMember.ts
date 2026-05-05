import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMLecturer } from "./SRMLecturer";
import { SRMTitle } from "./SRMTitle";

export interface SRMEvaluationMember extends BaseEntity {
    /** Thứ tự */
    order?: number;
    /** Id thành viên */
    userId?: number;
    /** Id hội đồng */
    srmEvaluationCommitteeId?: number;
    /** Id vai trò hội đồng */
    srmTitleId?: number;
    /** Hội đồng */
    srmTitle?: SRMTitle;
    /** Thành viên */
    user?: SRMLecturer;
}
