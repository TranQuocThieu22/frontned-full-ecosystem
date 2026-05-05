import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity";

export interface ExamSet extends BaseEntity {
    point?: number,
    evaExamId?: number,
    evaSubjectId?: number,
    quantityQuestion?: number,
    difficultyDetailQuanity?: {
        evaDifficultyDetailName?: string,
        evaDifficultyDetailQuantity?: number
    }[]
}