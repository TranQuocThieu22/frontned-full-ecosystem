export interface EditorialBoardMemberViewModel {
  id?: number;
  code?: string;
  name?: string;
  unit?: string;
  role?: string;
}

export interface E_LectureEstablishmentEditorialViewModel {
  id?: number;
  code?: string;
  name?: string;
  boardLeader?: string;
  lectureCode?: string;
  lectureName?: string;
  establishmentDate?: string;
  status?: string;
  members?: EditorialBoardMemberViewModel[];
  notes?: string;
  tagret?: string;
}
