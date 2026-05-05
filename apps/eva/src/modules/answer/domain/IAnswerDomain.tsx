import { type_tempStatus } from "aq-fe-framework/types"

export interface IAnswerDomain {
    id?: number
    content?: string,
    isCorrect?: boolean,
    proportion?: number
    explain?: string
    criteria?: string
    index?: number,
    status?: type_tempStatus
}