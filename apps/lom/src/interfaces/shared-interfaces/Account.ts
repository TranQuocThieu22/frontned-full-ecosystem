import { BaseEntity } from "@aq-fe/core-ui/shared/interfaces/BaseEntity"

export interface Account extends BaseEntity {
    email?: string,
    phoneNumber?: string,
    address?: string,
    avatarPath?: string,
    fullName?: string,
    gender?: number,
    dateOfBirth?: string,
    class?: {
        name?: string
    }
}