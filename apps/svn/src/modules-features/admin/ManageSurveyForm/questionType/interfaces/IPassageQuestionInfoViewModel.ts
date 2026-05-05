export interface IPassageQuestionInfoViewModel {
  question: string;
  guide: string;
  image: File | null;
  passage: string;
}

export interface TextareaQuestionSetting {
  isAnswerRequired: boolean;
  isHasImage: boolean;
  isHasGuide: boolean;
} 