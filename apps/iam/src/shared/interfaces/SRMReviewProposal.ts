import { AQFileDetail } from '@aq-fe/core-ui/shared/interfaces/AQFileDetail';
import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
import { SRMConclusion } from './SRMConclusion';
import { SRMProposalMember } from './SRMProposalMember';
import { SRMReviewCommittee } from './SRMReviewCommittee';
import { SRMTaskProposal } from './SRMTaskProposal';

/** Đề xuất được gán cho hội đồng tư vấn xác định danh mục */
export interface SRMReviewProposal extends BaseEntity {
    /** Thứ tự */
    order?: number;
    /** Id hội đồng tư vấn xác định danh mục */
    srmReviewCommitteeId?: number;
    /** Id của đề xuất */
    srmTaskProposalId?: number;
    /** Thông tin của đề xuất */
    srmTaskProposal?: SRMTaskProposal;

    meetingDate?: string;

    recommendation?: string
    attachmentPath?: string
    srmConclusionId?: number
    attachmentDetail?: AQFileDetail
    srmReviewCommittee?: SRMReviewCommittee
    srmConclusion?: SRMConclusion
    srmProposalMembers?: SRMProposalMember[]
}