
export interface ISingleChoiceQuestion {
  id: number;
  text: string;
}

export interface ISingleChoiceGroupQuestionViewModel {
  groupTitle: string;
  guide?: string;
  answerTitle?: string;
  image?: File | null;
  answers: string[];
  answerPoints?: number[];
  questions: ISingleChoiceQuestion[];
}