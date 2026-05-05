import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { QuestionAnswerDetail } from "./QuestionAnswerDetail";

export interface QuestionAnswer extends BaseEntity {
    density?: number
    index?: number,
    type?: number,
    content?: string,
    descriptionContent?: string
    evaQuestionId?: number
    evaQuestionAnswerDetails?: QuestionAnswerDetail[]
}