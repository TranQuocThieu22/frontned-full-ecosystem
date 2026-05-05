import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface QuestionAnswerDetail extends BaseEntity {
    density?: number
    description?: string
    evaQuestionAnswerId?: number
}