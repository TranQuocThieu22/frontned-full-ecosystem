export interface ILectureProposalRegistrationInfoViewModel {
  id: number;
  name: string;
  code: string;
  scienceFieldCodes: string[];
  scienceFields: IScienceFieldViewModel[];
  objective: string;
  targetAudience: string;
  responsiblePerson: ILectureProposalRegistrationUserViewModel;
  members?: ILectureProposalRegistrationMemberViewModel[];
  startDate: string;
  endDate: string;
  budget: number;
  requirements: string;
  status: string;
  summary: string;
  filePath?: string;
  fileDetail?: {
    fileName: string;
    fileExtension: string;
    fileBase64String: string;
  };
}

export interface ILectureProposalRegistrationUserViewModel {
  id?: number;
  name?: string;
  code?: string;
  unit?: string;
}

export interface IScienceFieldViewModel {
  id: number;
  name: string;
  code: string;
}

export interface ILectureProposalRegistrationMemberViewModel extends ILectureProposalRegistrationUserViewModel {
  role: string;
}
