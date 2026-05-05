import { ICognition } from "@/shared/APIs/cognitionService";
import { IRubrics } from "@/shared/APIs/rubricService";
import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";
import { CLO } from "./CLO";
import { EvaDifficultyDetail } from "./EvaDifficultyDetail";
import { QuestionAnswer } from "./QuestionAnswer";
import { Topic } from "./Topic";

export interface Question extends BaseEntity {
    content?: string
    evaQuestionTypeId?: number
    evaCloId?: number
    evaTopicId?: number
    evaTopic?: Topic
    evaclo?: CLO[]
    evaDifficultyDetail: EvaDifficultyDetail
    evaDifficultyDetailId?: number
    evaCognitionId?: number
    evaCognition?: ICognition
    evaQuestionAnswers?: QuestionAnswer[]
    evaSubjectId?: number
    evaRubricsId?: number
    evaRubrics?: IRubrics
    questionQuantity?: number
}