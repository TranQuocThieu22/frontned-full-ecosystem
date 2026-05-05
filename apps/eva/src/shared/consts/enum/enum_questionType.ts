export enum enum_questionType {
    SingleChoice = 1,
    MultipleChoice = 3,
    TextEditor = 4,
    TextEditorRubrics = 5,
    PlankText = 6,
    Link = 7,
    Writing = 8
}




export const enumLabel_questionType: Record<enum_questionType, string> = {
    [enum_questionType.SingleChoice]: "Trắc nghiệm (1 đáp án)",
    [enum_questionType.MultipleChoice]: "Trắc nghiệm (nhiều đáp án)",
    [enum_questionType.TextEditor]: "Tự luận",
    [enum_questionType.TextEditorRubrics]: "Tự luận (theo tiêu chí)",
    [enum_questionType.PlankText]: "Điền khuyết",
    [enum_questionType.Link]: "Nối từ",
    [enum_questionType.Writing]: "Điền từ",
};

