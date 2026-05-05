export interface SingleChoiceOption {
  id: string;
  label?: string;
  score?: number;
}

export interface ISingleChoiceQuestionInfoViewModel {
  question: string;
  guide: string;
  image: File | null;
  options: SingleChoiceOption[];
  clo?: string;
  plo?: string;
} 