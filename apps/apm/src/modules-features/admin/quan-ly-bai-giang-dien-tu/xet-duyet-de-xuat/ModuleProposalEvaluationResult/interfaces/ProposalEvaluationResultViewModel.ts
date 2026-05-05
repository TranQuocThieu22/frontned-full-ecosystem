export interface IProposalEvaluationResultViewModel {
  id?: string;
  code?: string;
  name?: string;
  mainResponsible?: string;
  scientificField?: string;
  expectedStartTime?: string;
  expectedEndTime?: string;
  estimatedBudget?: number;
  registrationStatus?: number;
  councilCode?: string;
  councilName?: string;
  councilPresident?: string;
  councilSecretary?: string;
  councilMembers?: string[];
  expectedMeetingDate?: string;
  averageScore?: number;
  councilConclusion?: string;
}

export enum EnumRegistrationStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}
