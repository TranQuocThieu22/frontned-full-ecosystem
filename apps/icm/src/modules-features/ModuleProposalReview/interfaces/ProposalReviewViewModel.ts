export interface ProposalReviewViewModel {
  id: number;
  name: string;
  code: string;
  scienceFieldCodes: string[];
  scienceFields: ScienceFieldViewModel[];
  objective: string;
  targetAudience: string;
  responsiblePerson: ResponsiblePersonViewModel;
  members?: MemberViewModel[];
  startDate: string;
  endDate: string;
  budget: number;
  requirements: string;
  status: string;
  note?: string;
  summary: string;
  filePath?: string;
  fileDetail?: {
    fileName: string;
    fileExtension: string;
    fileBase64String: string;
  };
}

export interface ScienceFieldViewModel {
  id: number;
  name: string;
  code: string;
}

export interface ResponsiblePersonViewModel {
  id: number;
  code: string;
  name: string;
}

export interface UserViewModel {
  id: number;
  code: string;
  name: string;
  unit: string;
}

export interface MemberViewModel {
  id: number;
  code: string;
  name: string;
  role: string;
  unit: string;
}

export interface ProposalReviewTableViewModel {
  data: ProposalReviewViewModel[];
}
