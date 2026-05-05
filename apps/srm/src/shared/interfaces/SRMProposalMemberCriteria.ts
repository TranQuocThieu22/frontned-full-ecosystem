import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMCriteria } from "./SRMCriteria";

/** Đánh giá đề xuất của thành viên hội đồng tư vấn xác định danh mục thro tiêu chí*/
export interface SRMProposalMemberCriteria extends BaseEntity {
    /** Lưu đánh giá cho loại tiêu chí yes/no */
    isResult?: boolean;
    /** Lưu đánh giá cho loại tiêu chí văn bản */
    comment?: string;
    /** Lưu đánh giá cho loại tiêu chí chấm điểm */
    point?: number;
    /** Id tiêu chí đánh giá */
    srmCriteriaId?: number;
    /** Tiêu chí đánh giá */
    srmCriteria?: SRMCriteria;
}