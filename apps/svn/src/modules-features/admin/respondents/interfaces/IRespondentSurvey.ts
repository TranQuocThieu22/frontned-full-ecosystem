import { EnumSurveyType } from "@/enums/EnumSurveyType";

export interface IQuestion {
  id: number;
  code: string;
  title: string;
  required: true;
  questionOptions: IQuestionOption[];
}

export interface IQuestionOption {
  value: number;
  label: string;
}

export interface ISurveyDetail {
  id: number;
  code: string;
  name: string;
  survayType: EnumSurveyType;
  isStopUsed?: boolean;
  createDate: string;
  updateDate: string;
  questions: IQuestion[];
}