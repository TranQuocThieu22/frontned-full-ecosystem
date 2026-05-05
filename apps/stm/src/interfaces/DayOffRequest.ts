import { IBaseEntity } from "aq-fe-framework/interfaces"
import { IAQFileDetail } from "aq-fe-framework/utils"
import { IUser } from "./user"

export interface IDayOffRequest extends IBaseEntity {
    userId?: number
    user?: IUser
    fromDate?: Date
    toDate?: Date
    totalSection?: number,
    filePath?: string
    fileDetail?: IAQFileDetail
    reason?: string
    note?: string
    status?: number
    comment?: string
    isSentMail?: boolean
}