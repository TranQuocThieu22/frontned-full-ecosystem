export interface IProposalEvaluationResultViewModel {
  id?: string;
  code?: string;
  name?: string;
  mainResponsible?: string;
  averageScore?: number;
  councilConclusion?: string;
  registrationStatus?: number;
  approvalDecision?: number;
  leadershipComments?: string;
  approvalDate?: Date;
  decisionNumber?: string;
  approver?: string;
  rejectionReason?: string;
  decisionFile?: File;
}

export enum EnumRegistrationStatus {
  PENDING = 0,
  APPROVED_WAITING_COUNCIL = 1,
  PROCESSING = 2,
}

export enum EnumApprovalDecision {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}
