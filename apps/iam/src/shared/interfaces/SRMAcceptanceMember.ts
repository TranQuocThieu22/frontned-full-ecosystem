import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMLecturer } from "./SRMLecturer";
import { SRMTitle } from "./SRMTitle";

export interface SRMAcceptanceMember extends BaseEntity {
    /** Thứ tự */
    order?: number;
    /** Id hội đồng */
    srmAcceptanceCouncilId?: number;
    /** Vai trò */
    srmTitle?: SRMTitle;
    /** Thành viên */
    user?: SRMLecturer;
    /** Id thành viên */
    userId?: number;
    /** Id vai trò hội đồng */
    srmTitleId?: number;
}
