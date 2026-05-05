
export interface IRankingQuestion {
  id: number;
  text: string;
}

export interface IRankingQuestionViewModel {
  groupTitle: string;
  guide?: string;
  image?: File | null;
  options: string[];
  questions: IRankingQuestion[];
  maxStars?: number;
}