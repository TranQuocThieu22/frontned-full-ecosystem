import { AQFileDetail } from "@aq-fe/core-ui/shared/interfaces/AQFileDetail";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { SRMApprovedProposal } from "./SRMApprovedProposal";

/** Quyết định phê duyệt danh mục đề xuất */
export interface SRMProposalApproval extends BaseEntity {
  order?: number,
  decisionCode?: string,
  decisionName?: string,
  decisionDate?: string,
  note?: string,
  signer?: string,
  attachmentPath?: string,
  academicYearId?: number,
  attachmentDetail?: AQFileDetail,
  srmApprovedProposals?: SRMApprovedProposal[]
}
