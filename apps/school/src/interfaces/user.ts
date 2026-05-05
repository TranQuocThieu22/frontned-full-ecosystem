import { IBaseEntity } from "aq-fe-framework/interfaces"

export interface IUser extends IBaseEntity {
    fullName?: string
    dateOfBirth?: Date
    gender?: number
}