export interface BaseEntity {
    id?: number,
    tempId?: string,
    code?: string,
    name?: string,
    concurrencyStamp?: string,
    isEnabled?: boolean,
    modifiedWhen?: string,
    modifiedFullName?: string
    createdBy?: number
    createWhen?: string
    createdAt?: string
    tempStatus?: TempStatus
}


export type TempStatus = "created" | "updated" | "deleted"