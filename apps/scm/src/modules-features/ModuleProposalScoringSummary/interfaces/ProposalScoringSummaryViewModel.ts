export interface IProposalScoringSummaryInfoViewModel {
    id: number;
    code: string;
    name: string;
    date: string;
    location: string;
    status: string;
    members: IProposalScoringSummaryMemberViewModel[];
    lectures: IProposalScoringSummaryLectureViewModel[];
    note?: string;
    filePath?: string;
    fileDetail?: {
      fileName: string;
      fileExtension: string;
      fileBase64String: string;
    };
  }
  
  
  export interface IProposalScoringSummaryMemberViewModel {
    id: number;
    code: string;
    name: string;
    role?: string;
    unit?: string;
  }
  
  export interface IProposalScoringSummaryLectureViewModel {
    id: number;
    code: string;
    name: string;
    score?: string;
    comment?: string;
  }