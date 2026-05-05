import { IBaseEntity } from "aq-fe-framework/interfaces"

export interface IAccount extends IBaseEntity {
    email?: string,
    phoneNumber?: string,
    address?: string,
    avatarPath?: string,
    fullName?: string,
    gender?: number,
    dateOfBirth?: Date,
    coeClass?: {
        name?: string
    }
}