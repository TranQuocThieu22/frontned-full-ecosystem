import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
import { SRMLecturer } from './SRMLecturer';
import { SRMTitle } from './SRMTitle';

/** Thành viên hội đồng tư vấn xác định danh mục */
export interface SRMReviewMember extends BaseEntity {
    /** Thứ tự */
    order?: number;
    /** Id hội đồng tư vấn xác định danh mục */
    srmReviewCommitteeId?: number;
    /** Id user */
    userId?: number;
    /** Thông tin user */
    user?: SRMLecturer;
    /** Id vai trò */
    srmTitleId?: number;
    /** Thông tin vai trò */
    srmTitle?: SRMTitle;
}