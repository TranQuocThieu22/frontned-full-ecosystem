export interface IMultiChoiceQuestionInfoViewModel {
    question: string;
    instruction: string;
    image: File | null;
    options: {
        id: string;
        label: string;
        score?: number;
    }[];
    clo: string;
    plo: string;
    defaultValue?: string[];

}
interface Option {
    id: string;
    label: string;
    score?:number;
}
export interface MultiChoiceQuestionSetting {
    isHasImage: boolean;
    isHasInstruction: boolean;
    isHasClo: boolean;
    isHasPlo: boolean;
    isHasScore: boolean;
    isHasOption: boolean;
    isHasDefaultValue: boolean;

}