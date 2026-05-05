export interface IReviewCommitteeInfoViewModel {
  id: number;
  code: string;
  name: string;
  date: string;
  location: string;
  status: string;
  members: IReviewCommitteeMemberViewModel[];
  lectures: IReviewCommitteeLectureViewModel[];
  note?: string;
  filePath?: string;
  fileDetail?: {
    fileName: string;
    fileExtension: string;
    fileBase64String: string;
  };
}

export interface IReviewCommitteeViewModel extends IReviewCommitteeInfoViewModel { }

export interface IReviewCommitteeMemberViewModel {
  id?: number;
  code?: string;
  name?: string;
  role?: string;
  unit?: string;
}

export interface IReviewCommitteeLectureViewModel {
  id?: number;
  code?: string;
  name?: string;
}