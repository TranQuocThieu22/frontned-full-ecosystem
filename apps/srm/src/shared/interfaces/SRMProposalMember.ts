import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMConclusion } from "./SRMConclusion";
import { SRMLecturer } from "./SRMLecturer";
import { SRMProposalMemberCriteria } from "./SRMProposalMemberCriteria";
import { SRMTitle } from "./SRMTitle";

/** Thành viên của hội đồng tư vấn xác định danh mục, đánh giá đề xuất theo các tiêu chí được gán cho hội đồng */
export interface SRMProposalMember extends BaseEntity {
    /** Thứ tự */
    order?: number;
    /** Id user */
    userId?: number;
    /** Thông tin user */
    user?: SRMLecturer;
    /** Vai trò trong hội đồng */
    srmTitle?: SRMTitle;
    /** Id vai trò trong hội đồng */
    srmTitleId?: number;
    /** Id kết luận của thành viên */
    srmConclusionId?: number;
    /** Kết luận của thành viên */
    srmConclusion?: SRMConclusion;
    /** Các tiêu chí mà thành viên đó đánh giá đề xuất */
    srmMemberCriterias?: SRMProposalMemberCriteria[]
}