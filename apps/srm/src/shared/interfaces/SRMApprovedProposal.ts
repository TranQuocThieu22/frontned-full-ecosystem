import { BaseEntity } from '@aq-fe/core-ui/shared/interfaces/BaseEntity';
import { SRMTaskProposal } from './SRMTaskProposal';

/** Đề xuất của sinh viên */
export interface SRMApprovedProposal extends BaseEntity {
    /** Thứ tự */
    order?: number;
    /** Id quyết định */
    srmProposalApprovalId?: number;
    /** Id của đề xuất */
    srmTaskProposalId?: number;
    /** Thông tin của đề xuất */
    srmTaskProposal?: SRMTaskProposal;
}